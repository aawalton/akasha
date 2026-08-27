export interface ColonDotAllowEntry {
  readonly method: string
  readonly receiver?: string
  readonly bundleSuffix?: string
  readonly reason: string
}

export const DERIVATION_GLOBS: readonly string[] = [
  "packages/temper/addons",
  "packages/temper/game",
  "packages/temper/player",
  "packages/temper/shared/addon-libraries",
]

export const CORE_COLON_SOURCE_PREFIXES: readonly string[] = ["temper/addons/types/eso/"]

export const RESERVATION_FILE_BASENAME_RE = /^eso-.*\.d\.ts$/

export function isReservationSource(repoRelPath: string): boolean {
  if (CORE_COLON_SOURCE_PREFIXES.some((prefix) => repoRelPath.startsWith(prefix))) return true
  const basename = repoRelPath.slice(repoRelPath.lastIndexOf("/") + 1)
  return RESERVATION_FILE_BASENAME_RE.test(basename)
}

export const COLON_DOT_ALLOW: readonly ColonDotAllowEntry[] = []

export const FORCE_COLON_METHODS: readonly string[] = ["CreateControlFromVirtual"]
