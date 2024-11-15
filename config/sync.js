/* eslint-disable no-console */
// this script syncs the public folder with the assets from UI

const path = require('path');
const { exec } = require('child_process');
const { ncp } = require('ncp');
const settings = require('./settings');

/* eslint-disable max-len */
console.log(
  `Running 'gulp sass' in 'ui' repo.\nMake sure ui is in folder '${settings.UI_REPO}'\n`
);
exec(
  'npx gulp --series sass dist-export',
  { cwd: settings.UI_REPO },
  (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    if (stderr) {
      throw error;
    }

    ncp(settings.UI_STATIC, path.join('public', 'static'), (err) => {
      if (err) {
        return console.error(err);
      }

      return console.log("Successfully updated 'public/static' folder.\n");
    });
  }
);
