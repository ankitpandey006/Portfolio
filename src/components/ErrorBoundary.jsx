import { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Section failed to load:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props
      return (
        fallback ?? (
          <div className="py-20 text-center opacity-60">
            <p className="text-lg">Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:opacity-90 transition"
            >
              Retry
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
