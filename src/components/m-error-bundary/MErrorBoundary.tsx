import React, {ErrorInfo} from "react"

interface IMErrorBoundaryProps {}
interface IMErrorBoundaryState {
  hasError: boolean
}

class MErrorBoundary extends React.Component<IMErrorBoundaryProps, IMErrorBoundaryState> {
  constructor(props:  IMErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('Error::::', error);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>OOPS!. WE ARE LOOKING INTO IT.</h1>;
    }
    return this.props.children;
  }
}

export default MErrorBoundary
