const container = document.querySelector('[data-id="loading"]');

export class Loader {
  constructor({ container }) {
    this.container = container;
  }

  isLoading() {
    return !this.container.classList.contains('close');
  }

  stop() {
    if (this.isLoading()) {
      this.container.classList.add('close');
    }
  }

  loading() {
    this.container.classList.remove('close');
  }
}

export default new Loader({ container });
