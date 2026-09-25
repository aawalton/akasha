import type { TemperWatcherEnrolment } from "akasha/temper/player/progress/temper-watcher-enrolment/temper-watcher-enrolment.page-type.types.ts"

const SOURCE_BUILD_STAMP = "dev"

export type ReportedBuild = Pick<TemperWatcherEnrolment, "watcherVersion" | "reportedAt">

export function readReportedBuild(report: ReportedBuild): {
  reportedVersion: string | null
  reportedAt: string | null
} {
  return {
    reportedVersion: report.watcherVersion ?? null,
    reportedAt: report.reportedAt ?? null,
  }
}

type WatcherBuildInput = {
  targetVersion: string | null
  reportedVersion: string | null
  reportedAt: string | null
}

type WatcherBuildVerdict =
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
