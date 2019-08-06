const path = require('path')

module.exports = {
  marke_targets: {
    win32: [
      "squirrel"
    ],
    darwin: [
      "zip"
    ],
    linux: [
      "deb",
      "rpm"
    ]
  },
  electronPackagerConfig: {
    packageManager: "yarn",
    icon: path.resolve(__dirname, 'assets/icon.ico')
  },
  electronWinstallerConfig: {
    name: "yt_downloader_app"
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: "demtario",
    name: "yt-downloader-app"
  },
  windowsStoreConfig: {
    packageName: "yt-downloader-app",
    name: "ytdownloaderapp"
  }
}