import React from "react";
import LoaderImg from "../Assets/spinner.gif";

class Loader extends React.Component {
  render() {
    return (
      <div className="loading">
        <img id="spinner" alt="" src={LoaderImg} />
      </div>
    );
  }
}

export default Loader;
