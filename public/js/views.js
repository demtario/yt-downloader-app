class Views {
  constructor() {
    this.views = document.querySelectorAll('.view')
    this.active = 0

    this.goTo(this.active)
  }

  goTo(index) {
    this.active = index

    this.views.forEach((view, i) => {
      if(i < this.active)
        view.classList = 'view view--before'
      else if(i == this.active)
        view.classList = 'view view--active'
      else
        view.classList = 'view'

    })
  }
}

const views = new Views()