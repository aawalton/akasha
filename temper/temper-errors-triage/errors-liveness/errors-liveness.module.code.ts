import { z } from "zod"

export const DEFAULT_STALE_AFTER_HOURS = 24

const ADDON_FRAME_RE = /user:\/AddOns\/([^/]+)\/([^/\n:]*)/

const AddonFrameMatchSchema = z
  .tuple([z.string(), z.string(), z.string()])
  .rest(z.string())
  .nullable()

function matchAddonFrame(
  traceback: string | null | undefined
): { readonly folder: string; readonly file: string } | undefined {
  if (traceback === null || traceback === undefined || traceback.length === 0) return undefined
  const parsed = AddonFrameMatchSchema.safeParse(traceback.match(ADDON_FRAME_RE))
  if (!parsed.success || parsed.data === null) return undefined
  return { folder: parsed.data[1], file: parsed.data[2] }
}

export function extractOwningAddon(traceback: string | null | undefined): string | undefined {
  const frame = matchAddonFrame(traceback)
  return frame?.folder
}

export function extractOwningAddonCandidates(
  traceback: string | null | undefined
): readonly string[] {
  const frame = matchAddonFrame(traceback)
  if (frame === undefined) return []
  const member = frame.file.replace(/\.lua$/, "")
  const out: string[] = []
  if (member.length > 0 && member !== frame.folder) out.push(member)
  if (frame.folder.length > 0) out.push(frame.folder)
  return out
}

export type Liveness = "live" | "stale"

export type LivenessReason = "live" | "fixed" | "recency"

export type Ownership =
  | { readonly kind: "in-repo"; readonly repoRelDir: string; readonly latestFixMs: number | null }
  | { readonly kind: "external" }

export interface LivenessInput {
  readonly lastSeenAtMs: number
  readonly frontierMs: number
  readonly staleAfterMs: number
  readonly ownership: Ownership
}

export interface LivenessVerdict {
  readonly verdict: Liveness
  readonly reason: LivenessReason
}

export function classifyLiveness(input: LivenessInput): LivenessVerdict {
  const { lastSeenAtMs, frontierMs, staleAfterMs, ownership } = input

  const deployStale =
    ownership.kind === "in-repo" &&
    ownership.latestFixMs !== null &&
    lastSeenAtMs <= ownership.latestFixMs
  if (deployStale) return { verdict: "stale", reason: "fixed" }

  const recencyStale = frontierMs - lastSeenAtMs > staleAfterMs
  if (recencyStale) return { verdict: "stale", reason: "recency" }

  return { verdict: "live", reason: "live" }
}
