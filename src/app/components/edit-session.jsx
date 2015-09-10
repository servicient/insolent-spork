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
  CardText,
  CardTitle,
  FlatButton,
  TextField,
  IconButton,
  FontIcon,
  DatePicker,
  TimePicker
} = mui;
let Colors = mui.Styles.Colors;

let EditSession = React.createClass({

  render() {
    let session = this.props.session;

    return (
      <Card initiallyExpanded={true} 
        key={this.props.isNew ? 0 : this.props.session.id}>
        <CardHeader
          title={this.props.isNew ? "New Session" : "Edit Session"}
          titleColor="white"
          showExpandableButton={false}
          avatar={<Avatar>A</Avatar>}>
        </CardHeader>
        <CardText>
          <DatePicker 
            floatingLabelText="Select Date" 
            ref="date"
            defaultDate={new Date(session.time)}
            autoOk={true} />
          <FontIcon className="material-icons">event</FontIcon>
          <br />
          <TimePicker
            format="ampm"
            ref="time"
            defaultTime={new Date(session.time)}
            floatingLabelText="Select Time" />
          <FontIcon className="material-icons">schedule</FontIcon>
          <br />
          <TextField
            floatingLabelText="Amount ($)"
            ref="amount"
            defaultValue={session.amount} />
          <br />
          <TextField
            floatingLabelText="Duration (minutes)"
            ref="duration"
            defaultValue={session.duration} />
          <br />
          <TextField
            floatingLabelText="Notes"
            ref="notes"
            defaultValue={session.notes}
            multiLine={true} />
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Save" primary={true} onTouchTap={this._save} />
          <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancel} />
        </CardActions>
      </Card>
    );
  },

  _save() {
    let newSession = {
      clientId: +this.props.client.id,
      time: this._concatTime(),
      duration: this.refs.duration.getValue(),
      amount: this.refs.amount.getValue(),
      notes: this.refs.notes.getValue()
    };
    this.props.onSave(newSession);
  },

  _cancel() {
    this.props.onCancel();
  },

  _concatTime() {
    //TODO
    return this.refs.time.getTime();
  }
});

module.exports = EditSession;
