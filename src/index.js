import YTDL from 'ytdl-core'
import ytlist from 'youtube-playlist'
import filenamify from 'filenamify'
import path from 'path'
import fs from 'fs'

import app from './app.js'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Start app
app.start()

app.on('download', async ({ link, format }, respond) => {
  const linkArray = []

  try {
    if(YTDL.validateURL(link))
      linkArray.push(link)
    else {
      const playlist = await ytlist(link, 'url')
      linkArray.push(...playlist.data.playlist)
    }
  } catch(e) {
    console.error(e)
    app.emit('download-error', {msg: 'Incorrect link!'})
  }
  
  for (const link of linkArray) {
    
    const ID = YTDL.getURLVideoID(link)
    const info = await YTDL.getInfo(ID)

    const desktopFolder = path.join(require('os').homedir(), 'Desktop')
    const resultPath = `${desktopFolder}/${filenamify(info.title)}.${format}`

    app.emit('download-started', info)

    await new Promise((resolve) => {
      YTDL(link, { filter: format == 'mp3' ? 'audio' : 'video' })
      .on('progress', (chunk, downloaded, total) => {
        console.log(`Received ${downloaded} bytes of total ${total}`);

        app.emit('update-status', downloaded/total*100)
      })
      .on('end', () => {
          resolve(true)
        })
        .pipe(fs.createWriteStream(resultPath));
    })
    
  }
  respond({complete: 'Download complete!'})
})