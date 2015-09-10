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
        <CardText>
          <DatePicker 
            floatingLabelText="Select Date" 
            floatingLabelIcon=""
            ref="date"
            defaultDate={new Date(session.time)}
            autoOk={true} />
          <TimePicker
            format="ampm"
            ref="time"
            defaultTime={new Date(session.time)}
            floatingLabelText="Select Time" />
          <div>
            <TextField
              floatingLabelText="Amount ($)"
              ref="amount"
              type="tel"
              defaultValue={session.amount} />
          </div>
          <div>
            <TextField
              floatingLabelText="Duration (minutes)"
              ref="duration"
              type="tel"
              defaultValue={session.duration} />
          </div>
          <div>
            <TextField
              floatingLabelText="Notes"
              ref="notes"
              type="text"
              defaultValue={session.notes}
              multiLine={true} />
          </div>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Save" primary={true} onTouchTap={this._save} />
          <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancel} />
        </CardActions>
      </Card>
    );
  },

  _save() {
    let obj = {
      id: this.props.session.id,
      clientId: +this.props.client.id,
      time: this._concatTime(),
      duration: this.refs.duration.getValue(),
      amount: this.refs.amount.getValue(),
      notes: this.refs.notes.getValue()
    };
    this.props.onSave(obj);
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
