
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css"
import "flatpickr/dist/l10n/pl.js"
import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        date: new Date()
      };
  }

  render() {
    const { date } = this.state;

    return (
      <Flatpickr
        value={date}
        onChange={this.onChange(date)}
      />
    );
  }
}

export default Flatpickr