import React from "react";
import ReactDOM from "react-dom";
import { useTransition, animated, config } from "react-spring";
function Modal(prop) {
  const transitions = useTransition(prop.modal, null, {
    from: { opacity: 0 },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
    config: config.molasses
  });
  return ReactDOM.createPortal(
    transitions.map(({ item, props, key }) => {
      return item ? (
        <animated.div
          key={key}
          style={{
            ...props,
            position: "absolute",
            bottom: "3%",
            right: "3%",
            zIndex: 99999
          }}
        >
          <div className="modal-wrapper">{prop.children}</div>
        </animated.div>
      ) : null;
    }),
    document.getElementById("modal-root")
  );
}

export default Modal;
