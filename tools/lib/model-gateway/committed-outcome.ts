export function classifyCommittedServed(status: number): "splice" | "error-frame" {
  return status >= 200 && status < 300 ? "splice" : "error-frame"
}

// THE NAME A CLIENT READS DECIDES WHAT THAT CLIENT DOES NEXT. Once the response has committed to a
// keepalive hold the status line is gone, so this name is all the client has left to judge by. Only
// 503 and 529 were named here, which sent a 429 down as `api_error` — a rate limit a client backs
// off from, wearing the name of a fault a client gives up on. These are Anthropic's own error types.
const SSE_ERROR_TYPE_BY_STATUS: Record<number, string> = {
  400: "invalid_request_error",
  401: "authentication_error",
  403: "permission_error",
  404: "not_found_error",
  413: "request_too_large",
  429: "rate_limit_error",
  503: "overloaded_error",
  529: "overloaded_error",
}

export function mapStatusToSseError(status: number): { errorType: string; message: string } {
  return {
    errorType: SSE_ERROR_TYPE_BY_STATUS[status] ?? "api_error",
    message: `Upstream returned status ${status} after the response committed to a streaming keepalive hold`,
  }
}
