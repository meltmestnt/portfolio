import ErrorView from "./../components/ErrorView";
import React, { Component } from "react";

export class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(err, errInfo) {
    console.log(err);
  }
  render() {
    const render = this.state.hasError ? (
      <ErrorView></ErrorView>
    ) : (
      this.props.children
    );
    return render;
  }
}

export default ErrorBoundary;
