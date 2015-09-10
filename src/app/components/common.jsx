// def: shared functions mixin
let { Link, Navigation } = require("react-router");

let Common = {
  mixins: [Navigation],

  _nav(pathName, args) {
    return () => {
      this.transitionTo(pathName, args);
    };
  }

};

module.exports = Common;
