let _ = require('lodash');
let store = module.exports = {
  client: {
    where: (obj, cb) => {
      let data = window.ft.mockData.clients;

      setTimeout(() => { cb(null, data); }, 500);
    },

    first: (obj, cb) => {
      store.client.where(obj, (err, clients) => {
        cb(null, clients[0]);    
      });
    },

    create: (obj, cb) => {
      obj.id = +new Date; //TODO
      window.ft.mockData.clients.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    }
  },

  session: {
    where: (obj, cb) => {
      let data = window.ft.mockData.sessions;
      data = _.filter(data, obj);

      setTimeout(() => { cb(null, data); }, 500);
    },

    first: (obj, cb) => {
      store.session.where(obj, (err, sessions) => {
        cb(null, sessions[0]);    
      });
    },

    create: (obj, cb) => {
      obj.id = +new Date; //TODO
      obj.state = 'scheduled'; //TODO
      window.ft.mockData.sessions.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    }
  },

  payment: {
    where: (obj, cb) => {
      let data = window.ft.mockData.payments;
      data = _.filter(data, obj);

      setTimeout(() => { cb(null, data); }, 500);
    },

    first: (obj, cb) => {
      store.payment.where(obj, (err, payments) => {
        cb(null, payments[0]);    
      });
    },

    create: (obj, cb) => {
      obj.id = +new Date; //TODO
      obj.time = new Date;
      window.ft.mockData.payments.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    }
  }
};
