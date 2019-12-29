import React from "react";
import { useTransition, animated, config } from "react-spring";
import ReactDOM from "react-dom";
function Dialog({ children, show }) {
  const transition = useTransition(show, null, {
    from: {
      transform: `translate(-50%, -150%)`
    },
    enter: {
      transform: `translate(-50%, -50%)`
    },
    leave: {
      transform: `translate(-50%, 25%)`
    },
    config: config.slow
  });
  return ReactDOM.createPortal(
    transition.map(
      ({ item, key, props }) =>
        item && (
          <animated.div
            key={key}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999999,
              ...props
            }}
          >
            <div className="dialog">{children} Hello</div>
          </animated.div>
        )
    ),
    document.getElementById("modal-root")
  );
}

export default Dialog;
