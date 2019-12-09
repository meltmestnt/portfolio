import React from "react";
import Navbar from "./containers/Navbar";
import MainSection from "./containers/MainSection";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import "./styles/main.scss";

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar></Navbar>
          <MainSection></MainSection>
        </div>
      </Provider>
    );
  }
}

export default App;
