const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  DEV_SERVER_PORT: 1235,
  DEV_SERVER_HOST: process.env.DEV_SERVER_HOST || 'localhost',
  API_PORT: 1236,
  SERVE_BUNDLE_PORT: 1237,
  SERVE_BUNDLE_HOST: process.env.SERVE_BUNDLE_HOST || 'localhost',
  get API_URL() {
    return `http://localhost:${this.API_PORT}`;
  },
  get MOCK_API_JSON() {
    return path.join(__dirname, '..', 'tests', 'mock', 'api.json');
  },
  get UI_REPO() {
    return path.join('..', 'ui');
  },
  get UI_STATIC() {
    return path.join(this.UI_REPO, '.dist');
  },
  VM_URL: 'http://localhost:8000',
  OUTPUT_DIR: process.env.OUTPUT_DIR || path.join(rootDir, 'dist'),
};
