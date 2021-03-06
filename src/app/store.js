let _ = require('lodash');
let store = module.exports = {
  client: {
    where(obj, cb) {
      let data = window.ft.mockData.clients;
      data = _.filter(data, obj);

      setTimeout(() => { cb(null, data); }, 500);
    },

    first(obj, cb) {
      this.where(obj, (err, clients) => {
        cb(null, clients[0]);
      });
    },

    create(obj, cb) {
      obj.id = +new Date; //TODO
      window.ft.mockData.clients.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    }
  },

  session: {
    init: () => (
      {
        id: null,
        clientId: null,
        time: new Date,
        state: null,
        amount: null,
        duration: null,
        notes: null
      }
    ),

    where(obj, cb) {
      let data = window.ft.mockData.sessions;
      data = _.filter(data, obj);

      setTimeout(() => { cb(null, data); }, 500);
    },

    first(obj, cb) {
      this.where(obj, (err, sessions) => {
        cb(null, sessions[0]);
      });
    },

    save(obj, cb) {
      let session = store.session;
      if (obj.id) {
        session.update(obj, cb);
      } else {
        session.create(obj, cb);
      }
    },

    create(obj, cb) {
      obj.id = +new Date; //TODO
      obj.state = 'scheduled'; //TODO
      window.ft.mockData.sessions.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    },

    update(obj, cb) {
      this.first({id: obj.id}, (err, session) => {
        _.merge(session, obj);
        if (cb)
          setTimeout(() => { cb(null, obj); }, 500);
      });
    }
  },

  payment: {
    init: () => (
      {
        id: null,
        clientId: null,
        time: null,
        amount: 500,
        numSessions: null
      }
    ),

    where(obj, cb) {
      let data = window.ft.mockData.payments;
      data = _.filter(data, obj);

      setTimeout(() => { cb(null, data); }, 500);
    },

    first(obj, cb) {
      this.where(obj, (err, payments) => {
        cb(null, payments[0]);
      });
    },

    create(obj, cb) {
      obj.id = +new Date; //TODO
      obj.time = new Date;
      window.ft.mockData.payments.unshift(obj);
      if (cb)
        setTimeout(() => { cb(null, obj); }, 500);
    }
  }
};
