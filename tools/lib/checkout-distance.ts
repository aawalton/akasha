import { z } from "zod"

export const DEFAULT_BASE_REF = "origin/main"

export type RefFreshness =
  | { readonly kind: "observed"; readonly asOf: string; readonly basis: "ref-update-log" }
  | { readonly kind: "unestablished"; readonly reason: string }

export type DistanceObservation =
  | {
      readonly kind: "refs-read"
      readonly checkout: string
      readonly baseRef: string
      readonly baseSha: string
      readonly headSha: string
      readonly leftRightCount: string
      readonly refUpdateLog: string
    }
  | {
      readonly kind: "refs-unread"
      readonly checkout: string
      readonly baseRef: string
      readonly reason: string
    }

export type CheckoutDistance =
  | {
      readonly kind: "measured"
      readonly checkout: string
      readonly baseRef: string
      readonly baseSha: string
      readonly headSha: string
      readonly behind: number
      readonly ahead: number
      readonly freshness: RefFreshness
    }
  | {
      readonly kind: "unmeasurable"
      readonly checkout: string
      readonly baseRef: string
      readonly reason: string
    }

const REFLOG_SELECTOR = /@\{(\d+)\}/
const REFLOG_MATCH = z.tuple([z.string(), z.string()])
const MAX_EPOCH_MS = 8.64e15

export function decideRefFreshness(baseRef: string, refUpdateLog: string): RefFreshness {
  const raw = refUpdateLog.trim()
  if (raw === "") {
    return {
      kind: "unestablished",
      reason: `${baseRef} has no update log in this checkout, so nothing here records when it was last observed`,
    }
  }
  const reflogMatch = REFLOG_MATCH.safeParse(REFLOG_SELECTOR.exec(raw))
  if (!reflogMatch.success) {
    return { kind: "unestablished", reason: `${baseRef}'s update log carried no readable instant` }
  }
  const seconds = reflogMatch.data[1]
  const ms = Number(seconds) * 1000
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_EPOCH_MS) {
    return { kind: "unestablished", reason: `${baseRef}'s update log named an unreadable instant` }
  }
  return { kind: "observed", asOf: new Date(ms).toISOString(), basis: "ref-update-log" }
}

function parseCount(raw: string | undefined): number | null {
  if (raw === undefined || !/^\d+$/.test(raw)) return null
  return Number(raw)
}

export function decideCheckoutDistance(observation: DistanceObservation): CheckoutDistance {
  if (observation.kind === "refs-unread") {
    const { checkout, baseRef, reason } = observation
    return { kind: "unmeasurable", checkout, baseRef, reason }
  }
  const [left, right] = observation.leftRightCount.trim().split(/\s+/)
  const behind = parseCount(left)
  const ahead = parseCount(right)
  if (behind === null || ahead === null) {
    return {
      kind: "unmeasurable",
      checkout: observation.checkout,
      baseRef: observation.baseRef,
      reason: `git returned no readable commit count for ${observation.baseRef}...HEAD`,
    }
  }
  return {
    kind: "measured",
    checkout: observation.checkout,
    baseRef: observation.baseRef,
    baseSha: observation.baseSha,
    headSha: observation.headSha,
    behind,
    ahead,
    freshness: decideRefFreshness(observation.baseRef, observation.refUpdateLog),
  }
}

export const DISTANCE_BANDS = ["0", "1-9", "10-99", "100-999", "1000+"] as const
export type DistanceBand = (typeof DISTANCE_BANDS)[number]

export function distanceBand(behind: number): DistanceBand {
  if (behind < 1) return "0"
  if (behind < 10) return "1-9"
  if (behind < 100) return "10-99"
  if (behind < 1000) return "100-999"
  return "1000+"
}

export type DistanceDistribution = {
  readonly trees: number
  readonly measured: number
  readonly unmeasurable: number
  readonly bands: Readonly<Record<DistanceBand, number>>
  readonly refFreshnessObserved: number
  readonly refFreshnessUnestablished: number
}

export function summarizeDistances(distances: readonly CheckoutDistance[]): DistanceDistribution {
  const bands: Record<DistanceBand, number> = {
    "0": 0,
    "1-9": 0,
    "10-99": 0,
    "100-999": 0,
    "1000+": 0,
  }
  let measured = 0
  let unmeasurable = 0
  let observed = 0
  let unestablished = 0
  for (const d of distances) {
    if (d.kind === "unmeasurable") {
      unmeasurable += 1
      continue
    }
    measured += 1
    bands[distanceBand(d.behind)] += 1
    if (d.freshness.kind === "observed") observed += 1
    else unestablished += 1
  }
  return {
    trees: distances.length,
    measured,
    unmeasurable,
    bands,
    refFreshnessObserved: observed,
    refFreshnessUnestablished: unestablished,
  }
}

function freshnessLines(freshness: RefFreshness): readonly string[] {
  return freshness.kind === "observed"
    ? [`refObserved\t${freshness.asOf}`, `refBasis\t${freshness.basis}`]
    : [`refObserved\t(unestablished: ${freshness.reason})`]
}

export function renderCheckoutDistance(distance: CheckoutDistance, json: boolean): string {
  if (json) return JSON.stringify(distance)
  if (distance.kind === "unmeasurable") {
    return [
      `checkout\t${distance.checkout}`,
      `baseRef\t${distance.baseRef}`,
      `behind\t(unmeasurable: ${distance.reason})`,
    ].join("\n")
  }
  return [
    `checkout\t${distance.checkout}`,
    `baseRef\t${distance.baseRef}`,
    `baseSha\t${distance.baseSha}`,
    `head\t${distance.headSha}`,
    `behind\t${distance.behind}`,
    `ahead\t${distance.ahead}`,
    ...freshnessLines(distance.freshness),
  ].join("\n")
}

export function renderDistanceDistribution(
  distribution: DistanceDistribution,
  json: boolean
): string {
  if (json) return JSON.stringify(distribution)
  return [
    `trees\t${distribution.trees}`,
    `measured\t${distribution.measured}`,
    `unmeasurable\t${distribution.unmeasurable}`,
    ...DISTANCE_BANDS.map((band) => `band ${band}\t${distribution.bands[band]}`),
    `refFreshnessObserved\t${distribution.refFreshnessObserved}`,
    `refFreshnessUnestablished\t${distribution.refFreshnessUnestablished}`,
  ].join("\n")
}

export type BranchFileSetObservation =
  | {
      readonly kind: "diff-read"
      readonly checkout: string
      readonly baseRef: string
      readonly mergeBase: string
      readonly nameOnlyZ: string
      readonly refUpdateLog: string
    }
  | {
      readonly kind: "diff-unread"
      readonly checkout: string
      readonly baseRef: string
      readonly reason: string
    }

export type BranchFileSet =
  | {
      readonly kind: "measured"
      readonly checkout: string
      readonly baseRef: string
      readonly mergeBase: string
      readonly files: readonly string[]
      readonly freshness: RefFreshness
    }
  | {
      readonly kind: "unmeasurable"
      readonly checkout: string
      readonly baseRef: string
      readonly reason: string
    }

export function decideBranchFileSet(observation: BranchFileSetObservation): BranchFileSet {
  if (observation.kind === "diff-unread") {
    const { checkout, baseRef, reason } = observation
    return { kind: "unmeasurable", checkout, baseRef, reason }
  }
  return {
    kind: "measured",
    checkout: observation.checkout,
    baseRef: observation.baseRef,
    mergeBase: observation.mergeBase,
    files: observation.nameOnlyZ.split("\0").filter((path) => path !== ""),
    freshness: decideRefFreshness(observation.baseRef, observation.refUpdateLog),
  }
}

export function renderBranchFileSet(fileSet: BranchFileSet, json: boolean): string {
  if (json) return JSON.stringify(fileSet)
  if (fileSet.kind === "unmeasurable") {
    return [
      `checkout\t${fileSet.checkout}`,
      `baseRef\t${fileSet.baseRef}`,
      `files\t(unmeasurable: ${fileSet.reason})`,
    ].join("\n")
  }
  return [
    `checkout\t${fileSet.checkout}`,
    `baseRef\t${fileSet.baseRef}`,
    `mergeBase\t${fileSet.mergeBase}`,
    `files\t${fileSet.files.length}`,
    ...freshnessLines(fileSet.freshness),
    ...fileSet.files.map((path) => `file\t${path}`),
  ].join("\n")
}
