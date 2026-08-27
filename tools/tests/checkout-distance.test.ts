import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  type BranchFileSet,
  type CheckoutDistance,
  DISTANCE_BANDS,
  decideBranchFileSet,
  decideCheckoutDistance,
  decideRefFreshness,
  distanceBand,
  renderBranchFileSet,
  renderCheckoutDistance,
  renderDistanceDistribution,
  summarizeDistances,
} from "../lib/checkout-distance.ts"

const RENDERED_JSON = z.record(z.string(), z.unknown())

const REF_LOG = "origin/main@{1785249458}\n"
const REF_LOG_ISO = "2026-07-28T14:37:38.000Z"

const READ = {
  kind: "refs-read",
  checkout: "/var/home/walton/worktrees/16924",
  baseRef: "origin/main",
  baseSha: "d131f0398d0000000000000000000000000000aa",
  headSha: "52a0321b6a0000000000000000000000000000bb",
  leftRightCount: "12692\t0\n",
  refUpdateLog: REF_LOG,
} as const

describe("decideRefFreshness", () => {
  it("reads the instant out of git's reflog selector and names its basis", () => {
    const f = decideRefFreshness("origin/main", REF_LOG)
    expect(f).toEqual({ kind: "observed", asOf: REF_LOG_ISO, basis: "ref-update-log" })
  })

  it("reports UNESTABLISHED when the ref has no update log, naming the ref", () => {
    const f = decideRefFreshness("origin/main", "")
    expect(f.kind).toBe("unestablished")
    if (f.kind !== "unestablished") throw new Error("unreachable")
    expect(f.reason).toContain("origin/main")
  })

  it("treats whitespace-only output as no log rather than as a reading", () => {
    expect(decideRefFreshness("origin/main", "\n  \n").kind).toBe("unestablished")
  })

  it("reports UNESTABLISHED rather than guessing when the log line is unreadable", () => {
    expect(decideRefFreshness("origin/main", "origin/main@{yesterday}\n").kind).toBe(
      "unestablished"
    )
  })

  it("never substitutes the moment of reading for an instant it did not observe", () => {
    const now = Date.now()
    for (const raw of ["", "garbage", "origin/main@{}"]) {
      const f = decideRefFreshness("origin/main", raw)
      expect(f.kind).toBe("unestablished")
      expect(JSON.stringify(f)).not.toContain(new Date(now).toISOString().slice(0, 13))
    }
  })
})

describe("decideCheckoutDistance", () => {
  it("measures a tree that is behind, carrying the ref's freshness", () => {
    const d = decideCheckoutDistance(READ)
    expect(d.kind).toBe("measured")
    if (d.kind !== "measured") throw new Error("unreachable")
    expect(d.behind).toBe(12692)
    expect(d.ahead).toBe(0)
    expect(d.freshness).toEqual({ kind: "observed", asOf: REF_LOG_ISO, basis: "ref-update-log" })
  })

  it("reads git's left column as BEHIND and its right as AHEAD", () => {
    const d = decideCheckoutDistance({ ...READ, leftRightCount: "3\t7\n" })
    if (d.kind !== "measured") throw new Error("unreachable")
    expect(d.behind).toBe(3)
    expect(d.ahead).toBe(7)
  })

  it("reports a genuine zero as a MEASURED zero, not as an absence", () => {
    const d = decideCheckoutDistance({ ...READ, leftRightCount: "0\t0\n" })
    expect(d.kind).toBe("measured")
    if (d.kind !== "measured") throw new Error("unreachable")
    expect(d.behind).toBe(0)
  })

  it("leaves a distance it could not take UNREPRESENTABLE rather than zero", () => {
    const d = decideCheckoutDistance({
      kind: "refs-unread",
      checkout: "/var/tmp/ops-worktree-ephemeral-x",
      baseRef: "origin/main",
      reason: "origin/main does not resolve in this checkout",
    })
    expect(d.kind).toBe("unmeasurable")
    expect(Object.hasOwn(d, "behind")).toBe(false)
    expect(Object.hasOwn(d, "ahead")).toBe(false)
  })

  it("refuses to invent a count when git's output cannot be read", () => {
    for (const raw of ["", "12692", "a\tb\n"]) {
      const d = decideCheckoutDistance({ ...READ, leftRightCount: raw })
      expect(d.kind).toBe("unmeasurable")
    }
  })
})

describe("distanceBand", () => {
  it("places each count in exactly one order-of-magnitude band, at the boundaries", () => {
    expect(distanceBand(0)).toBe("0")
    expect(distanceBand(1)).toBe("1-9")
    expect(distanceBand(9)).toBe("1-9")
    expect(distanceBand(10)).toBe("10-99")
    expect(distanceBand(99)).toBe("10-99")
    expect(distanceBand(100)).toBe("100-999")
    expect(distanceBand(999)).toBe("100-999")
    expect(distanceBand(1000)).toBe("1000+")
    expect(distanceBand(12692)).toBe("1000+")
  })

  it("names no band with a judgment word, so no band is one to avoid", () => {
    for (const band of DISTANCE_BANDS) {
      expect(band).toMatch(/^[0-9+-]+$/)
    }
  })
})

const measured = (behind: number, fresh: boolean) =>
  decideCheckoutDistance({
    ...READ,
    leftRightCount: `${behind}\t0\n`,
    refUpdateLog: fresh ? REF_LOG : "",
  })

describe("summarizeDistances", () => {
  const population: readonly CheckoutDistance[] = [
    measured(0, true),
    measured(4, true),
    measured(4, true),
    measured(300, true),
    measured(12692, false),
    decideCheckoutDistance({
      kind: "refs-unread",
      checkout: "/gone",
      baseRef: "origin/main",
      reason: "not a git checkout",
    }),
  ]

  it("partitions the population, so the parts sum to the whole", () => {
    const s = summarizeDistances(population)
    expect(s.trees).toBe(6)
    expect(s.measured + s.unmeasurable).toBe(s.trees)
    expect(Object.values(s.bands).reduce((a, b) => a + b, 0)).toBe(s.measured)
  })

  it("keeps a tree it could not measure OUT of the zero band", () => {
    const s = summarizeDistances(population)
    expect(s.unmeasurable).toBe(1)
    expect(s.bands["0"]).toBe(1)
  })

  it("tallies the freshness readings rather than assuming one for the set", () => {
    const s = summarizeDistances(population)
    expect(s.refFreshnessObserved).toBe(4)
    expect(s.refFreshnessUnestablished).toBe(1)
    expect(s.refFreshnessObserved + s.refFreshnessUnestablished).toBe(s.measured)
  })

  it("reports an empty population as empty, never as a healthy zero", () => {
    const s = summarizeDistances([])
    expect(s.trees).toBe(0)
    expect(s.measured).toBe(0)
    expect(s.bands["0"]).toBe(0)
  })
})

describe("renderCheckoutDistance", () => {
  it("emits the measured facts as TSV, one per line", () => {
    const out = renderCheckoutDistance(decideCheckoutDistance(READ), false)
    expect(out).toContain("behind\t12692")
    expect(out).toContain("ahead\t0")
    expect(out).toContain("baseRef\torigin/main")
    expect(out).toContain(`refObserved\t${REF_LOG_ISO}`)
    expect(out).toContain("refBasis\tref-update-log")
  })

  it("renders an unmeasured distance as its own token, never as 0", () => {
    const out = renderCheckoutDistance(
      decideCheckoutDistance({
        kind: "refs-unread",
        checkout: "/var/tmp/x",
        baseRef: "origin/main",
        reason: "origin/main does not resolve in this checkout",
      }),
      false
    )
    expect(out).toContain("behind\t(unmeasurable: origin/main does not resolve in this checkout)")
    expect(out).not.toContain("behind\t0")
    expect(out).not.toContain("ahead\t0")
  })

  it("emits nothing downstream of the distance it could not establish", () => {
    const out = renderCheckoutDistance(
      decideCheckoutDistance({
        kind: "refs-unread",
        checkout: "/var/tmp/x",
        baseRef: "origin/main",
        reason: "not a git checkout",
      }),
      false
    )
    expect(out.split("\n")).toHaveLength(3)
    expect(out).not.toContain("refObserved")
    expect(out).not.toContain("head\t")
  })

  it("renders an unestablished freshness in the same slot, as its own token", () => {
    const out = renderCheckoutDistance(decideCheckoutDistance({ ...READ, refUpdateLog: "" }), false)
    expect(out).toContain("behind\t12692")
    expect(out).toContain("refObserved\t(unestablished:")
    expect(out).not.toContain("refBasis")
  })

  it("says nothing a reader would work to make go away", () => {
    const out = renderCheckoutDistance(decideCheckoutDistance({ ...READ, refUpdateLog: "" }), false)
    for (const nag of ["WARN", "WARNING", "ERROR", "VERDICT", "FAIL", "stale", "should", "!"]) {
      expect(out).not.toContain(nag)
    }
  })

  it("emits the decided value verbatim as JSON, so the two cannot disagree", () => {
    const d = decideCheckoutDistance(READ)
    expect(RENDERED_JSON.parse(JSON.parse(renderCheckoutDistance(d, true)))).toEqual(
      RENDERED_JSON.parse(JSON.parse(JSON.stringify(d)))
    )
  })

  it("keeps the discriminator in the JSON, so a consumer must branch before reading a count", () => {
    const d = decideCheckoutDistance({
      kind: "refs-unread",
      checkout: "/var/tmp/x",
      baseRef: "origin/main",
      reason: "not a git checkout",
    })
    const parsed = RENDERED_JSON.parse(JSON.parse(renderCheckoutDistance(d, true)))
    expect(parsed["kind"]).toBe("unmeasurable")
    expect(parsed["behind"]).toBeUndefined()
  })
})

describe("renderDistanceDistribution", () => {
  it("prints every band including the empty ones, so a zero has a denominator", () => {
    const out = renderDistanceDistribution(summarizeDistances([measured(4, true)]), false)
    expect(out).toContain("trees\t1")
    for (const band of DISTANCE_BANDS) expect(out).toContain(`band ${band}\t`)
  })

  it("reports the unmeasurable count on its own line", () => {
    const out = renderDistanceDistribution(
      summarizeDistances([
        decideCheckoutDistance({
          kind: "refs-unread",
          checkout: "/gone",
          baseRef: "origin/main",
          reason: "not a git checkout",
        }),
      ]),
      false
    )
    expect(out).toContain("unmeasurable\t1")
    expect(out).toContain("band 0\t0")
  })
})

describe("decideBranchFileSet", () => {
  const DIFF = {
    kind: "diff-read",
    checkout: "/var/home/walton/worktrees/16924",
    baseRef: "origin/main",
    mergeBase: "52a0321b6a0000000000000000000000000000bb",
    nameOnlyZ: "packages/a/x.ts\0packages/b/y.ts\0",
    refUpdateLog: REF_LOG,
  } as const

  it("returns the branch's own file set, one entry per path", () => {
    const f = decideBranchFileSet(DIFF)
    expect(f.kind).toBe("measured")
    if (f.kind !== "measured") throw new Error("unreachable")
    expect(f.files).toEqual(["packages/a/x.ts", "packages/b/y.ts"])
    expect(f.mergeBase).toBe(DIFF.mergeBase)
  })

  it("reports a branch that changed nothing as an empty set, not as unmeasurable", () => {
    const f = decideBranchFileSet({ ...DIFF, nameOnlyZ: "" })
    expect(f.kind).toBe("measured")
    if (f.kind !== "measured") throw new Error("unreachable")
    expect(f.files).toEqual([])
  })

  it("carries the same ref freshness the distance does, because the merge base is resolved against it", () => {
    const f = decideBranchFileSet({ ...DIFF, refUpdateLog: "" })
    if (f.kind !== "measured") throw new Error("unreachable")
    expect(f.freshness.kind).toBe("unestablished")
  })

  it("leaves a file set it could not take UNREPRESENTABLE rather than empty", () => {
    const f: BranchFileSet = decideBranchFileSet({
      kind: "diff-unread",
      checkout: "/var/tmp/x",
      baseRef: "origin/main",
      reason: "origin/main and HEAD have no merge base",
    })
    expect(f.kind).toBe("unmeasurable")
    expect(Object.hasOwn(f, "files")).toBe(false)
  })
})

describe("renderBranchFileSet", () => {
  const measuredSet = decideBranchFileSet({
    kind: "diff-read",
    checkout: "/w",
    baseRef: "origin/main",
    mergeBase: "52a0321b6a",
    nameOnlyZ: "a.ts\0b.ts\0",
    refUpdateLog: REF_LOG,
  })

  it("prints one path per line under the header naming what it measured against", () => {
    const out = renderBranchFileSet(measuredSet, false)
    expect(out).toContain("mergeBase\t52a0321b6a")
    expect(out).toContain("file\ta.ts")
    expect(out).toContain("file\tb.ts")
  })

  it("distinguishes a branch that changed nothing from one it could not read", () => {
    const empty = renderBranchFileSet(
      decideBranchFileSet({
        kind: "diff-read",
        checkout: "/w",
        baseRef: "origin/main",
        mergeBase: "52a0321b6a",
        nameOnlyZ: "",
        refUpdateLog: REF_LOG,
      }),
      false
    )
    const unread = renderBranchFileSet(
      decideBranchFileSet({
        kind: "diff-unread",
        checkout: "/w",
        baseRef: "origin/main",
        reason: "not a git checkout",
      }),
      false
    )
    expect(empty).toContain("files\t0")
    expect(unread).toContain("files\t(unmeasurable: not a git checkout)")
    expect(unread).not.toContain("files\t0")
  })
})
