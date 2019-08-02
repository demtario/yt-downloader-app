const { remote } = require('electron')

// Open Dev-tools
remote.globalShortcut.register('CommandOrControl+Shift+I', () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})

// Restart
remote.globalShortcut.register('CommandOrControl+R', () => {
  remote.app.relaunch();
  remote.app.exit(0);
})

window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll()
})
