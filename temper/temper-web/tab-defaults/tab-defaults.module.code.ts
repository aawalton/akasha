const PREFIX_DEFAULTS: ReadonlyArray<readonly [string, string]> = [
  ["/methodology", "companion-engine"],
  ["/inventory", "rules"],
  ["/settings", "account"],
  ["/shopping", "list"],
  ["/completion", "summary"],
]

export function tabDefaultFor(pathname: string): string | null {
  for (const [prefix, value] of PREFIX_DEFAULTS) {
    if (pathname.startsWith(prefix)) return value
  }
  return null
}
