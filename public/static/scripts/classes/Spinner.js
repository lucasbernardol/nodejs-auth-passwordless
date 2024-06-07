const container = document.querySelector('[data-id="spinner"]');

export class Spinner {
  #StateCSSClassName = 'open';

  constructor({ container }) {
    this.container = container;
  }

  show() {
    this.container.classList.add(this.#StateCSSClassName);

    return this;
  }

  close() {
    this.container.classList.remove(this.#StateCSSClassName);
  }
}

export default new Spinner({ container });
