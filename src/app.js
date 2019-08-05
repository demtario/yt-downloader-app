const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

class App {
    constructor() {
        this.ids = {}
        this.window = null
        this.ready = new Promise((resolve) => app.on('ready', () => resolve()))
    }

    async start() {
        await this.ready

        this.window = new BrowserWindow({
            width: 500,
            height: 700,
            frame: false,
            icon: 'public/img/icon.png',
            show: false
        })

        this.window.loadFile('public/index.html')

        this.window.webContents.on('did-finish-load', () => {
            setTimeout(() => {
                this.window.show()
                this.window.webContents.openDevTools
            }, 40);
        })

        this.window.on('closed', () => this.window = null)

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin')
                app.quit()
        })

        app.on('activate', () => {
            if (mainWindow === null) {
                this.start();
            }
        });
    }

    on(event, listener) {
        ipcMain.on(event, ({
            sender
        }, {
            data,
            id = null
        }) => {
            const respond = id != null ? (data) => this.emit(event + ':' + id, data, sender) : null

            listener(data, respond)
        })
    }

    emit(event, data, target = this.window.webContents) {
        if (this.window == null)
            throw (new Error('App not initialized!'))

        target.send(event, {
            data
        })
    }

    request(event, data, target = this.window.webContents) {
        if (this.window == null)
            throw (new Error('App not initialized!'))

        return new Promise((resolve, reject) => {
            let id = this.ids[event]
            if (id == null)
                id = 0

            ipcMain.once(event + ':' + id, ({}, {
                data
            }) => resolve(data))
            target.send(event, {
                id,
                data
            })

            this.ids[event] = id + 1
        })
    }
}

module.exports = new App()