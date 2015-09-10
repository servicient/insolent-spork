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

    let tabsStyle ={
      backgroundColor: '#151515'
    };

    if (this.state.client) /* init render (no client yet) */ {
      return (
        <div>
          <AppBar title={this.state.client.name} 
            iconElementLeft={<FontIcon className="material-icons" onTouchTap={this._nav("clients")} style={{fontSize: "30px"}} >navigate_before</FontIcon>}
            style={{backgroundColor: '#151515'}} />
          <Tabs tabItemContainerStyle={tabsStyle} >
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
