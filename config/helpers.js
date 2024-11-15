const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const componentsDir = ["src", "components"];

// returns path relative to root
function root(...args) {
    const fileArray = Array.prototype.slice.call(args, 0);
    return path.join(...[rootDir].concat(fileArray));
}

// return list of all 'needle' files in 'startPath' directory; needle is a regex
function fromDir(startPath, needle, ignore = []) {
    let files = [];

    fs.readdirSync(startPath).forEach((file) => {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        const basename = path.basename(filename);
        if (stat.isDirectory() && !ignore.includes(file)) {
            files = files.concat(fromDir(filename, needle, ignore));
        } else if (basename.match(needle)) {
            files.push(filename);
        }
    });

    return files;
}

// returns path relative to file
function parentDir(file) {
    const fileArray = file.split(path.sep);
    return fileArray[fileArray.length - 2];
}

// returns a list of all exported component files
function getBundleComponentsFiles() {
    // common/ and children/ are excluded from discovery,
    // those components are not directly exported
    return fromDir(root(...componentsDir), /.*index\.jsx.*/, [
        "common",
        "children",
    ]);
}

// returns a list of files/modules
// that will be included in the bundle built by webpack
function getBundle() {
    return getBundleComponentsFiles().reduce(
        (out, file) => out.concat([file]),
        ["./src/componentloader"],
    );
}

function stringCmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

// return a list of components with at least on dev.* file inside
// dev files are used with npm run start;
// return an object with multiple information for each component
function getDevComponents() {
    const devFiles = fromDir(root(...componentsDir), /^dev(\..*)?\.jsx?$/, []);
    const components = {};
    devFiles.forEach((devFile) => {
        const componentPath = path.dirname(devFile);
        if (!components[componentPath]) {
            // find a unique name for the component prepending parents
            let name = path.basename(componentPath);
            let restPath = path.dirname(componentPath);
            const findComponentByName = (comp) => comp.name === name;
            while (Object.values(components).find(findComponentByName)) {
                name = `${path.basename(restPath)}/${name}`;
                restPath = path.dirname(restPath);
            }

            components[componentPath] = {
                path: componentPath,
                devFiles: [],
                name,
            };
        }
        components[componentPath].devFiles.push(devFile);
    });
    return Object.values(components).sort((compA, compB) => {
        const cmp = stringCmp(
            path.basename(compA.name),
            path.basename(compB.name),
        );
        if (cmp !== 0) {
            return cmp;
        }
        return stringCmp(compA.name, compB.name);
    });
}

const webpackMergeRules = {
    module: {
        rules: {
            test: "match",
            use: {
                loader: "match",
                options: "replace",
            },
        },
    },
};

module.exports = {
    root,
    fromDir,
    getBundle,
    getDevComponents,
    parentDir,
    webpackMergeRules,
};
