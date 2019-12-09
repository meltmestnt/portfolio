import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { grabData } from "./../redux/actions";
import { Transition, animated } from "react-spring/renderprops";
import { config } from "react-spring";
import Spinner from "./Spinner";
import Modal from "./../containers/Modal";

let timeout = null;
function RefreshComponent(props) {
  let [clicked, changeIcon] = React.useState(false);
  let [modal, toggleModal] = React.useState(false);
  React.useEffect(() => {
    if (props.isFetching) {
      changeIcon(true);
    } else {
      changeIcon(false);
    }
  }, [props]);
  return (
    <>
      <Modal modal={modal}>
        Successfully updated!
        <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
      </Modal>

      <div
        className="input-wrapper  input-button-absolute"
        onClick={() => {
          if (props.country && props.city) {
            props
              .grabData(
                `http://api.openweathermap.org/data/2.5/forecast?q=${props.city},${props.country}&APPID=578100bd6668f4ff66da810dade78836`
              )
              .then(() => {
                setTimeout(() => {
                  toggleModal(true);
                  if (timeout) {
                    clearTimeout(timeout);
                  }
                  timeout = setTimeout(() => toggleModal(false), 2000);
                }, 500);
              });
          }
        }}
      >
        <Transition
          items={clicked}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={config.wobbly}
        >
          {item =>
            item
              ? props => (
                  <div style={props} className="spinner-wrapper">
                    <Spinner smallSpinner></Spinner>
                  </div>
                )
              : props => (
                  <button style={props} className="input-button">
                    <FontAwesomeIcon
                      className="input-icon"
                      icon={faRedo}
                    ></FontAwesomeIcon>
                  </button>
                )
          }
        </Transition>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    country: state.country || "",
    city: state.city || "",
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = {
  grabData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshComponent);
