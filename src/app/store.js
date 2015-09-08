let store = {};
store.client = {};


store.client.all = (cb) => {
  let data = window.CLIENTS;

  setTimeout(() => { cb(null, data); }, 500);
};

store.client.create = (obj, cb) => {
  obj.id = +new Date; //TODO
  window.CLIENTS.unshift(obj);
  if (cb)
    setTimeout(() => { cb(null, obj); }, 500);
};

store.client.update = (obj, cb) => {
  // window.CLIENTS.unshift(obj);
  // if (cb)
  //   setTimeout(() => { cb(null, obj); }, 500);
};

module.exports = store;
