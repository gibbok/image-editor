import React, { Component, ReactNode, ErrorInfo } from 'react';

type ErrorBoundaryProps = Readonly<{
  children?: ReactNode;
}>;

type ErrorBoundaryState = Readonly<{
  hasError: boolean;
}>;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO implment a function for logging errors in a centralize way
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
