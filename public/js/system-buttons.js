// Ukrywanie zbędnych kontrolek
if(require('os').platform() == 'win32') {
  document.getElementById('mac-controls').style.display = 'none'
} else {
  document.getElementById('window-controls').style.display = 'none'
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
      initWin();
      initMac();
  }
};

function initWin() {
  let window = remote.getCurrentWindow();
  const minButton = document.getElementById('min-button'),
      maxButton = document.getElementById('max-button'),
      restoreButton = document.getElementById('restore-button'),
      closeButton = document.getElementById('close-button');

  minButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.minimize();
  });

  maxButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.maximize();
      toggleMaxRestoreButtons();
  });

  restoreButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.unmaximize();
      toggleMaxRestoreButtons();
  });

  // Toggle maximise/restore buttons when maximisation/unmaximisation
  // occurs by means other than button clicks e.g. double-clicking
  // the title bar:
  toggleMaxRestoreButtons();
  window.on('maximize', toggleMaxRestoreButtons);
  window.on('unmaximize', toggleMaxRestoreButtons);

  closeButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.close();
  });

  function toggleMaxRestoreButtons() {
      window = remote.getCurrentWindow();
      if (window.isMaximized()) {
          maxButton.style.display = "none";
          restoreButton.style.display = "flex";
      } else {
          restoreButton.style.display = "none";
          maxButton.style.display = "flex";
      }
  }
}

function initMac() {
  let window = remote.getCurrentWindow();
  const closeButton = document.querySelector('.mac-button.mac-button--close'),
      maxButton = document.querySelector('.mac-button.mac-button--fullsize'),
      minButton = document.querySelector('.mac-button.mac-button--minimalize');

  minButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();

      if(!window.isFullScreen()) 
          window.minimize();
  });

  maxButton.addEventListener("click", event => {
      window = remote.getCurrentWindow()

      if(window.isFullScreen()) {
          window.setFullScreen(false)
          minButton.classList.remove('disabled')
      }
      else {
          minButton.classList.add('disabled')
          window.setFullScreen(true)
      }
  });

  closeButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.close();
  });
}
