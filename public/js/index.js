const link = document.getElementById("download-link")

document.getElementById("download-button").addEventListener('click', async () => {
  const format = document.getElementById('format').value

  document.querySelector('.error').innerHTML = ''

  await core.request('download', { link : link.value, format })

  document.querySelector('.progress-bar__bar').style.width = `0%`
  document.querySelector('.card').classList = 'card card--done'

  document.querySelector('.card__overlay').innerHTML = `
    <i class="fas fa-check"></i>
    <h2>Download completed!</h2>
  `

  document.getElementById('card-progress').innerHTML = `
    <button onclick="views.goTo(0)" class="btn btn--white" >Start Over</button>
  `

  link.value = ''
})

core.on('download-started', (info) => {
  document.querySelector('.card').classList = 'card'
  document.getElementById('card-img').src = `https://img.youtube.com/vi/${info.video_id}/maxresdefault.jpg`
  document.querySelector('.card__overlay').innerHTML = `
    <i class="fas fa-hourglass-half"></i>
    <h2>Downloading in progress</h2>
  `
  views.goTo(1)
})

core.on('download-error', (error) => {
  document.querySelector('.error').innerHTML = error.msg
})

core.on('update-status', (progress) => {
  document.querySelector('.progress-bar__bar').style.width = `${progress}%`
  document.getElementById('card-progress').innerHTML = `${Math.round(progress)}%`
})