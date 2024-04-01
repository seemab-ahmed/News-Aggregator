import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback: ReactNode;
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log error to service or perform other error handling tasks
        // console.error('Error caught by ErrorBoundary:', error);
        // console.error('Component stack:', info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
