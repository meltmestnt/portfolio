import React from "react";
import { connect } from "react-redux";
import { changeTemperature } from "./../redux/actions";
import Modal from "./../containers/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
let timeout = null;
function Togglers(props) {
  const [modal, toggleModal] = React.useState(false);
  const [modalMessage, changeMessage] = React.useState("");
  return (
    <div
      className="togglers-wrapper"
      onClick={e => {
        if (!e.target.classList.contains("toggler")) return;
        props.changeTemperature(e.target.textContent);
        e.currentTarget.childNodes.forEach(node =>
          node.classList.remove("active")
        );
        e.target.classList.add("active");
        changeMessage(
          `Now showing ${
            e.target.textContent === "C" ? "celsius" : "fahrenheit"
          }!`
        );
        setTimeout(() => {
          toggleModal(true);
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => toggleModal(false), 2000);
        }, 100);
      }}
    >
      <Modal modal={modal}>
        {modalMessage}
        <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
      </Modal>
      <span className="toggler active">C</span>
      <span className="toggler">F</span>
    </div>
  );
}

const mapDispatchToProps = {
  changeTemperature
};

export default connect(
  null,
  mapDispatchToProps
)(Togglers);
