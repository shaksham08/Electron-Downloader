import "../assets/css/App.css";
import React, { Component } from "react";
import electron from "electron";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyle } from "@material-ui/core";
import ProgressBar from "./ProgressBar";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.donwloader = this.donwloader.bind(this);
  }

  donwloader() {
    require("electron")
      .remote.require("electron-download-manager")
      .download(
        {
          url:
            "https://releases.ubuntu.com/20.04.1/ubuntu-20.04.1-desktop-amd64.iso",
          path: "//installed_apps//",
          onProgress: (progress, item) => {
            console.log("downloaded", progress.downloaded);
            console.log("progress", progress.progress);

            this.setState({
              value: progress.progress,
            });
          },
        },
        function (error, info) {
          if (error) {
            console.log(error);
            return;
          }

          console.log("DONE: " + info.url);
        }
      );
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={this.donwloader}> Click to download </button>
        <ProgressBar value={this.state.value} />
      </div>
    );
  }
}

export default App;
