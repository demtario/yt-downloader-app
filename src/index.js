import YTDL from 'ytdl-core'
import fs from 'fs'

import app from './app.js'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
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

app.on('download', async (link, respond) => {
  if(!YTDL.validateURL(link)) {
    respond({error: 'Incorrect link!'})
    return
  }

  const path = `${info.title}.mp4`

  const ID = YTDL.getURLVideoID(link)
  const info = await YTDL.getInfo(ID)

  YTDL(link)
    .on('progress', (chunk, downloaded, total) => {
      console.log(`Received ${downloaded} bytes of total ${total}`);
    })
    .on('end', () => {
      respond({complete: 'Download complete!', path})
    })
    .pipe(fs.createWriteStream(path));
})