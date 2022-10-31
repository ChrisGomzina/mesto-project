export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
   items.forEach((item) => {
     this._renderer(item);
   });
  }

  // renderItems() {
  //   this._items.forEach((item) => {
  //     this._renderer(item);
  //   });
  //  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
