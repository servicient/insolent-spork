let React = require("react");
let mui = require("material-ui");
let Link = require("react-router").Link;
// let SessionsTable = require('./sessions-table');
let SessionList = require("./session-list");
let PaymentList = require("./payment-list");
let store = require("../store");

let {
  Tabs,
  Tab,
  Avatar
} = mui;

let Colors = mui.Styles.Colors;

let ClientProfile = React.createClass({

  getInitialState() {
    return {
      client: null  
    };
  },

  componentDidMount() {
    store.client.first({id: +this.props.params.id}, (err, client) => {
      if (this.isMounted()) {
        this.setState({client: client});
      }
    });
  },

  render() {

    if (this.state.client) /* init render (no client yet) */ {
      return (
        <div className="profile-intro" style={{color: "white"}}>
          <h3>
            <Avatar src={this.state.client.avatar} />
            {this.state.client.name}
          </h3>

          <Tabs>
            <Tab label="Sessions">
              <SessionList client={this.state.client} />
            </Tab>
            <Tab label="Payments">
              <PaymentList client={this.state.client} />
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = ClientProfile;
