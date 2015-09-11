module.exports = {
  clients: [
    {
      id: 1,
      name: 'Andrew Marcus',
      email: 'am@test.com',
      phone: '111-111-1111',
      avatar: 'http://lorempixel.com/100/100/people/1'
    },
    {
      id: 2,
      name: 'Jesse Silkoff',
      email: 'js@test.com',
      phone: '222-222-2222',
      avatar: 'http://lorempixel.com/100/100/people/2'
    },
    {
      id: 3,
      name: 'John Hayes',
      email: 'jh@test.com',
      phone: '333-333-3333',
      avatar: 'http://lorempixel.com/100/100/people/3'
    }
  ],

  payments: [
    {
      id: 100,
      clientId: 1,
      amount: '200.00',
      numSessions: 4,
      time: '2015-09-01 18:00:00'
    }
  ],

  sessions: [
    {
      id: 10,
      clientId: 1,
      time: '2015-09-10 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60,
      notes: 'worked on flexibility and light weight exercises'
    },
    {
      id: 11,
      clientId: 1,
      time: '2015-09-01 18:00:00',
      state: 'completed',
      amount: '50.00',
      duration: 60,
      notes: 'worked on flexibility and light weight exercises'
    },
    {
      id: 12,
      clientId: 1,
      time: '2015-09-11 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60
    },
    {
      id: 13,
      clientId: 2,
      time: '2015-09-12 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60
    }
  ]
};
