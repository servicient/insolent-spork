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
  RaisedButton,
  TextField,
  FontIcon,
  Slider
} = mui;
let Colors = mui.Styles.Colors;

let PaymentList = React.createClass({

  getInitialState () {
    return {
      payments: []  
    };
  },

  componentDidMount() {
    this._refresh(); 
  },

  _refresh() {
    let clientId = +this.props.client.id;
    store.payment.where({clientId: clientId}, (err, payments) => {
      if (this.isMounted()) {
        this.setState({payments: payments});
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
        <div className="text-center well-sm">
          <RaisedButton label="Add Payment" primary={true} onTouchTap={this._newPayment} labelStyle={buttonLabelStyle} >
            <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
          </RaisedButton>
        </div>
        
        {this.state.payments.map(payment => {
          if (payment.id) {
            return (
              <Card initiallyExpanded={false} key={payment.id}>
                <CardTitle
                  title={moment(payment.time).format(window.ft.conf.time.formats.dow)}
                  subtitle={"$" + payment.amount}
                  style={{fontWeight: 200}}
                  titleColor="white"
                  subtitleColor="white"
                  showExpandableButton={false}>
                </CardTitle>
              </Card>
            )
          } else {
            return (
              <Card initiallyExpanded={true} key={0}>
                <CardHeader
                  title="NEW PAYMENT"
                  titleColor="white"
                  showExpandableButton={false}
                  avatar={<Avatar>A</Avatar>}>
                </CardHeader>
                <CardText>
                  <Slider
                    description="Slide to select amount"
                    max={1000}
                    min={10}
                    required={true}
                    step={10} 
                    style={{width: '80%'}}
                    onChange={this._changeSlider} />
                  <TextField
                    floatingLabelText="Amount ($)"
                    ref="paymentAmount" />
                  <br />
                  <TextField
                    floatingLabelText="Num. of Sessions"
                    ref="paymentNumSessions" />
                  <br />
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Save" primary={true} onTouchTap={this._createPayment} />
                  <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancelCreate} />
                </CardActions>
              </Card>
            )  
          }
        })}

      </div>
    );
  },

  _changeSlider: function (e, val) {
    this.refs.paymentAmount.setValue(val);
  },

  _newPayment() {
    let paymentObj = {};
    this.setState((previousState, currentProps) => {
      let newList = [paymentObj].concat(previousState.payments);
      return {payments: newList};
    });
  },

  _createPayment() {
    let newPayment = {
      clientId: +this.props.client.id,
      amount: this.refs.paymentAmount.getValue(),
      numSessions: this.refs.paymentNumSessions.getValue()
    };
    store.payment.create(newPayment, () => { this._refresh(); });
  },

  _cancelCreate() {
    this._refresh();
  }

});

module.exports = PaymentList;
