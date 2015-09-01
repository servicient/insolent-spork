let React = require('react');
let mui = require('material-ui');
let {
  TextField,
} = mui;

let ClientInputs = React.createClass({


  render() {
    let inputStyle = {
      width: '100%',
    };
    return (
      <div style={{minHeight: "300px"}} >
        <TextField
          hintText="Client's Name"
          style={inputStyle}
          type="text"
          floatingLabelText="Client's Name" />
        <br />
        <TextField
          hintText="Email"
          style={inputStyle}
          type="email"
          floatingLabelText="Client's Email" />
        <br />
        <TextField
          hintText="Phone"
          style={inputStyle}
          type="phone"
          floatingLabelText="Client's Phone" />
      </div>
    );
  },
});

module.exports = ClientInputs;
