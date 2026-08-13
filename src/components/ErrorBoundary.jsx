import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? <main className="error-state"><p className="eyebrow">SYSTEM NOTICE</p><h1>THE SIGNAL<br />WAS LOST.</h1><p>Refresh the page to reconnect with the experience.</p><button onClick={() => window.location.reload()} className="button button-red">RELOAD</button></main> : this.props.children }
}
