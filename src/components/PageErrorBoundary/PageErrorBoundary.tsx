import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import styles from './PageErrorBoundary.module.css';

interface PageErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
}

interface PageErrorBoundaryState {
  hasError: boolean;
}

export class PageErrorBoundary extends Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer} role="alert" aria-live="assertive">
          <p className={styles.errorMessage}>
            {this.props.fallbackMessage || 'Content is temporarily unavailable. Please try again later.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
