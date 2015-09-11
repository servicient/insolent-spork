let React = require('react');
let mui = require('material-ui');
let _ = require('lodash');
let store = require('../store');
let moment = require('moment');
let {
  Avatar,
  Card,
  CardActions,
  CardExpandable,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
  FlatButton,
  RaisedButton,
  TextField,
  IconButton,
  FontIcon,
  DatePicker,
  TimePicker
} = mui;
let Colors = mui.Styles.Colors;
let EditSession = require('./edit-session');

let SessionList = React.createClass({

  getInitialState () {
    return {
      sessions: []
    };
  },

  componentDidMount() {
    this._refresh();
  },

  _refresh() {
    let clientId = +this.props.client.id,
      filter = {clientId: clientId, state: this.props.type};
    store.session.where(filter, (err, sessions) => {
      if (this.isMounted()) {
        this.setState({sessions: sessions, editingId: null});
      }
    });
  },

  render() {

    let buttonLabelStyle = {
      padding: '0 16px 0 8px',
      fontSize: '25px',
      fontWeight: '300',
    };

    return (

      <div>
        {this.props.readOnly ?
          null :
          <div className="text-center well-sm">
            <RaisedButton label="Add Session" primary={true} onTouchTap={this._newSession} labelStyle={buttonLabelStyle} >
              <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
            </RaisedButton>
          </div>
        }

        {this.state.sessions.map(session => {
          let editable = (this.state.editingId === session.id) || !session.id;
          if (editable) {
            return (
              <EditSession isNew={!session.id}
                session={session.id ? session : store.session.init()}
                client={this.props.client}
                onSave={this._save}
                onCancel={this._cancelSave} />
            );
          } else {
            return (
              <Card initiallyExpanded={false} key={session.id}>
                <CardTitle
                  style={{fontWeight: 200}}
                  titleColor="white"
                  subtitleColor="white"
                  title={moment(session.time).format(window.ft.conf.time.formats.dow)}
                  subtitle={session.duration + ' min @ $' + session.amount}
                  showExpandableButton={true}>
                </CardTitle>
                {this.props.readOnly ?
                  null :
                  <CardActions expandable={true}>
                    <FlatButton label="Reschedule" primary={true}
                      onTouchTap={this._edit.bind(this, session.id)} />
                    <FlatButton label="Confirm" primary={true}
                      onTouchTap={this._confirmSession.bind(this, session.id)} />
                    <FlatButton label="Cancel" secondary={true}
                      onTouchTap={this._cancelSession} />
                  </CardActions>
                }
                <CardText expandable={true} style={{color: "white"}}>
                  {session.notes}
                </CardText>
              </Card>
            );
          }
        })}

      </div>
    );
  },

  _newSession() {
    let sessionObj = store.session.init();
    this.setState((previousState, currentProps) => {
      let newList = [sessionObj].concat(previousState.sessions);
      return {sessions: newList};
    });
  },

  _edit(sessionId) {
    this.setState({editingId: sessionId});
  },

  _save(obj) {
    store.session.save(obj, () => { this._refresh(); });
  },

  _cancelSave() {
    this._refresh();
  },

  _cancelSession() {
    alert('TODO')
  },

  _confirmSession(sessionId) {
    if (confirm('Are you sure?'))
      store.session.save({id: sessionId, state: 'completed'},
        () => { this._refresh(); });
  }
});

module.exports = SessionList;
