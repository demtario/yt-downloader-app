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
  await core.request('download', link.value)
})