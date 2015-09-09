let _ = require('lodash');
let store = {};
store.client = {};
store.session = {};


store.client.where = (obj, cb) => {
  let data = window.CLIENTS;

  setTimeout(() => { cb(null, data); }, 500);
};

store.client.first = (obj, cb) => {
  store.client.where(obj, (err, clients) => {
    cb(null, clients[0]);    
  });
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

store.session.where = (obj, cb) => {
  let data = window.SESSIONS;
  data = _.filter(data, obj);

  setTimeout(() => { cb(null, data); }, 500);
};

store.session.first = (obj, cb) => {
  store.session.where(obj, (err, sessions) => {
    cb(null, sessions[0]);    
  });
};

store.session.create = (obj, cb) => {
  obj.id = +new Date; //TODO
  obj.state = 'scheduled'; //TODO
  window.SESSIONS.unshift(obj);
  if (cb)
    setTimeout(() => { cb(null, obj); }, 500);
};

module.exports = store;
