const {ipcRenderer} = require('electron')

class Core {
    constructor () {
        this.ids = {}
    }

    on (event, listener) {
        ipcRenderer.on(event, ({}, {data, id = null}) => {
            const respond = id != null ? (data) => this.emit(event + ':' + id, data) : null

            listener(data, respond)
        })
    }

    emit (event, data) {
        ipcRenderer.send(event, {data})
    }

    request (event, data) {
        return new Promise((resolve, reject) => {
            let id = this.ids[event]
            if (id == null)
                id = 0
            
            ipcRenderer.once(event + ':' + id, ({}, {data}) => resolve(data))
            ipcRenderer.send(event, {id, data})
            
            this.ids[event] = id + 1
        })
    }
}

const core = new Core()
