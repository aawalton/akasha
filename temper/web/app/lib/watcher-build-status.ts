import { z } from "zod"

const SOURCE_BUILD_STAMP = "dev"

const ReportedBuildSchema = z
  .object({
    watcherVersion: z.string().optional(),
    reportedAt: z.string().optional(),
  })
  .passthrough()

function usableInstant(iso: string | undefined): string | null {
  if (iso === undefined) return null
  return Number.isFinite(new Date(iso).getTime()) ? iso : null
}

export function readReportedBuild(lastRunOutcome: unknown): {
  reportedVersion: string | null
  reportedAt: string | null
} {
  const parsed = ReportedBuildSchema.safeParse(lastRunOutcome)
  if (!parsed.success) return { reportedVersion: null, reportedAt: null }

  return {
    reportedVersion: parsed.data.watcherVersion ?? null,
    reportedAt: usableInstant(parsed.data.reportedAt),
  }
}

export type WatcherBuildInput = {
  targetVersion: string | null
  reportedVersion: string | null
  reportedAt: string | null
}

export type WatcherBuildVerdict =
  | "current"
  | "stale"
  | "never-reported"
  | "source-build"
  | "target-unknown"

export type WatcherBuildSummary = WatcherBuildInput & {
  verdict: WatcherBuildVerdict
}

function comparable(stamp: string | null): string | null {
  if (stamp === null) return null
  const trimmed = stamp.trim()
  return trimmed === "" ? null : trimmed
}

export function deriveWatcherBuildVerdict(input: WatcherBuildInput): WatcherBuildVerdict {
  const reported = comparable(input.reportedVersion)
  const target = comparable(input.targetVersion)

  if (reported === null) return "never-reported"
  if (reported === SOURCE_BUILD_STAMP) return "source-build"
  if (target === null) return "target-unknown"

  return reported === target ? "current" : "stale"
}

export function summarizeWatcherBuild(input: WatcherBuildInput): WatcherBuildSummary {
  return { ...input, verdict: deriveWatcherBuildVerdict(input) }
}
