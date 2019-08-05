const link = document.getElementById("download-link")

link.addEventListener('input', async () => {
  const response = await core.request('fetch-data', link.value)
  console.log(response);
  if(!response.error) {
    document.getElementById('preview').classList.remove('preview--hidden')

    document.getElementById('preview-img').src = `http://img.youtube.com/vi/${response.video_id}/maxresdefault.jpg`
    document.getElementById('preview-title').innerHTML = response.title
    document.getElementById('preview-author').innerHTML = response.author.name

    document.getElementById('preview-error').innerHTML = ""
  } else {
    document.getElementById('preview').classList.add('preview--hidden')
    document.getElementById('preview-error').innerHTML = "Nieprawidłowy link!"
  }
})

document.getElementById("download-button").addEventListener('click', async () => {
  const format = document.getElementById('format').value
  await core.request('download', { link : link.value, format })
})

core.on('update-status', (progress) => {
  console.log(progress);
  
  document.querySelector('.progress-bar__bar').style.width = `${progress}%`
})