export type AppCspConfig = {
  readonly connectSrc?: readonly string[]
  readonly imgSrc?: readonly string[]
  readonly mediaSrc?: readonly string[]
  readonly workerSrc?: readonly string[]
}

const STATIC_HEADERS: Readonly<Record<string, string>> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
}

function directive(name: string, sources: readonly string[]): string {
  return `${name} ${sources.join(" ")}`
}

function optionalDirective(
  name: string,
  extras: readonly string[] | undefined
): string | undefined {
  if (extras === undefined || extras.length === 0) return undefined
  return directive(name, ["'self'", ...extras])
}

function buildCsp(config: AppCspConfig, nonce: string): string {
  const directives: (string | undefined)[] = [
    directive("default-src", ["'self'"]),
    directive("script-src", ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"]),
    directive("style-src", ["'self'", "'unsafe-inline'"]),
    directive("img-src", ["'self'", "data:", ...(config.imgSrc ?? [])]),
    directive("font-src", ["'self'"]),
    directive("connect-src", ["'self'", ...(config.connectSrc ?? [])]),
    optionalDirective("media-src", config.mediaSrc),
    optionalDirective("worker-src", config.workerSrc),
    directive("object-src", ["'none'"]),
    directive("base-uri", ["'none'"]),
    directive("frame-ancestors", ["'none'"]),
    directive("form-action", ["'self'"]),
  ]
  return directives.filter((d): d is string => d !== undefined).join("; ")
}

export function buildSecurityHeaders(config: AppCspConfig, nonce: string): Record<string, string> {
  return {
    "Content-Security-Policy": buildCsp(config, nonce),
    ...STATIC_HEADERS,
  }
}
