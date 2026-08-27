export function buildAnthropicSseErrorFrame(errorType: string, message: string): Uint8Array {
  const payload = JSON.stringify({ type: "error", error: { type: errorType, message } })
  return new TextEncoder().encode(`event: error\ndata: ${payload}\n\n`)
}
