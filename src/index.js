import YTDL from 'ytdl-core'
import path from 'path'
import fs from 'fs'

import app from './app.js'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Start app
app.start()

app.on('fetch-data', async (link, respond) => {
  if(!YTDL.validateURL(link)) {
    respond({error: 'Incorrect link!'})
    return
  }

  const ID = YTDL.getURLVideoID(link)
  const info = await YTDL.getInfo(ID)

  respond(info)
})

app.on('download', async ({ link, format }, respond) => {
  if(!YTDL.validateURL(link)) {
    app.emit('download-error', {msg: 'Incorrect link!'})
    return
  }

  const ID = YTDL.getURLVideoID(link)
  const info = await YTDL.getInfo(ID)

  const desktopFolder = path.join(require('os').homedir(), 'Desktop')
  const resultPath = `${desktopFolder}/${info.title}.${format}`

  app.emit('download-started', info)
  
  YTDL(link, { filter: format == 'mp3' ? 'audio' : 'video' })
  .on('progress', (chunk, downloaded, total) => {
    console.log(`Received ${downloaded} bytes of total ${total}`);
    
    app.emit('update-status', downloaded/total*100)
  })
  .on('end', () => {
      respond({complete: 'Download complete!', resultPath})
    })
    .pipe(fs.createWriteStream(resultPath));
})