export const FETE_LAG_MS = 3_300

const FETE_STATS: ReadonlySet<string> = new Set([
  "health-maximum",
  "magicka-maximum",
  "stamina-maximum",
])

type Fete = { readonly stacks: number; readonly changedMsAgo?: number | undefined }

export function isUnsettled(stat: string, fete: Fete | undefined): boolean {
  const ago = fete?.changedMsAgo
  return ago !== undefined && ago < FETE_LAG_MS && FETE_STATS.has(stat)
}
