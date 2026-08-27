export function classifyCommittedServed(status: number): "splice" | "error-frame" {
  return status >= 200 && status < 300 ? "splice" : "error-frame"
}

export function mapStatusToSseError(status: number): { errorType: string; message: string } {
  const overloaded = status === 529 || status === 503
  return {
    errorType: overloaded ? "overloaded_error" : "api_error",
    message: `Upstream returned status ${status} after the response committed to a streaming keepalive hold`,
  }
}
