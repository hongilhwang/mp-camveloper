import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-neutral-500 text-sm mb-2">페이지를 불러오는 중 오류가 발생했습니다</p>
          <code className="text-xs text-red-400 bg-red-50 px-3 py-1 rounded">
            {this.state.error.message}
          </code>
        </div>
      )
    }
    return this.props.children
  }
}
