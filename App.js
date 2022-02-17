import React from "react";
import Vista from "./src/mainView";


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Vista />
    );
  }
}
