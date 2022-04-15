import React from "react";
import ReactDOM from "react-dom";

import "./CustomModal.styles.scss";

const modalRoot = () => document.getElementById("modal-root");

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "custom-modal";
  }

  componentDidMount() {
    modalRoot().appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot().removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default CustomModal;
