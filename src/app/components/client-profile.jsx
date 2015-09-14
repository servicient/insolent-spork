let React = require("react");
let mui = require("material-ui");
let Common = require("./common");
let SessionList = require("./session-list");
let PaymentList = require("./payment-list");
let store = require("../store");


let {
  AppBar,
  Tabs,
  Tab,
  FontIcon,
  IconButton,
  Avatar
} = mui;

let Colors = mui.Styles.Colors;

let ClientProfile = React.createClass({

  mixins: [Common],

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

    let tabsStyle = {
      backgroundColor: '#151515'
    };

    if (this.state.client) /* init render (no client yet) */ {
      return (
        <div>
          <div style={{position:'absolute', top:10, right: 10, color: 'white', textAlign:'center'}}>
            Balance:
            <div>
              <span style={{color:'green', fontSize: '25', fontWeight: '500'}}>$500</span>
            </div>
          </div>
          <Tabs tabItemContainerStyle={tabsStyle} onChange={this._tabChange}>
            <Tab label="Scheduled" value="scheduled">
              <SessionList type="scheduled" client={this.state.client} />
            </Tab>
            <Tab label="Completed" value="completed">
              <SessionList ref="completedSessions"
                type="completed"
                readOnly={true}
                client={this.state.client} />
            </Tab>
            <Tab label="Payments" value="payments">
              <PaymentList client={this.state.client} />
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return null;
    }
  },

  _tabChange(value, e, tab) {
    // if the user just confirmed a session, then refresh completed view
    if (value === 'completed')
      this.refs.completedSessions._refresh();
  }
});

module.exports = ClientProfile;
