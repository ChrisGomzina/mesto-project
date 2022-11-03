export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Рендер карточек
  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  //Добавление карточек в разметку
  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
