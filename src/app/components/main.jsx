let React = require('react');
let ClientTable = require('./client-table');

let Main = React.createClass({
  getInitialState() {
    return {
      clients: [
        {
          id: 1,
          name: 'Andrew Marcus',
          email: 'am@test.com',
          phone: '111-111-1111'
        },
        {
          id: 2,
          name: 'Jesse Silkoff',
          email: 'js@test.com',
          phone: '222-222-2222'
        },
        {
          id: 3,
          name: 'John Hayes',
          email: 'jh@test.com',
          phone: '333-333-3333'
        }
      ]
    };
  },
  render() {
    return <ClientTable 
      clients={this.state.clients} 
      onAddClient={this._addClient}
      onAddSession={this._addSession} />
  },
  _addClient: function(clientObj) {
    this.setState(function(previousState, currentProps) {
      previousState.clients.push(clientObj);
    });
  },
  _addSession: function(sessionObj) {
    console.log('TODO')
  }
});

module.exports = Main;
