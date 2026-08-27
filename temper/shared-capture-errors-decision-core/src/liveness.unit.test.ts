import { describe, expect, it } from "bun:test"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
  extractOwningAddon,
  extractOwningAddonCandidates,
  type LivenessInput,
} from "./liveness"

const HOUR_MS = 60 * 60 * 1000

const FRONTIER_MS = Date.parse("2026-06-22T21:37:43Z")
const STALE_AFTER_MS = DEFAULT_STALE_AFTER_HOURS * HOUR_MS

function hoursBehindFrontier(h: number): number {
  return FRONTIER_MS - h * HOUR_MS
}

describe("extractOwningAddon", () => {
  it("extracts the proximate addon from a TemperpChat traceback", () => {
    const traceback =
      "stack traceback:\n" +
      "/EsoUI/Ingame/ChatSystem/ChatHandlers.lua:369: in function 'ZO_ChatRouter:GetRegisteredMessageFormatters'\n" +
      "user:/AddOns/TemperpChat/TemperpChat.lua:10716: in function 'InitializeChatHandlers'\n" +
      "user:/AddOns/TemperpChat/TemperpChat.lua:7155: in function '____exports.onPlayerActivated'"
    expect(extractOwningAddon(traceback)).toBe("TemperpChat")
  })

  it("extracts an external addon (DolgubonsLazyWritCreator) from its traceback", () => {
    const traceback =
      "stack traceback:\nuser:/AddOns/DolgubonsLazyWritCreator/DolgubonsLazyWritCreator.lua:42: in function 'foo'"
    expect(extractOwningAddon(traceback)).toBe("DolgubonsLazyWritCreator")
  })

  it("takes the FIRST (proximate) addon frame when the chain spans addons", () => {
    const traceback =
      "stack traceback:\n" +
      "/EsoUI/Ingame/Foo.lua:1: in function 'Base'\n" +
      "user:/AddOns/TemperVotansMiniMap/TemperVotansMiniMap.lua:300: in function 'Near'\n" +
      "user:/AddOns/LibGPS/LibGPS.lua:9: in function 'Far'"
    expect(extractOwningAddon(traceback)).toBe("TemperVotansMiniMap")
  })

  it("returns undefined for a base-game-only traceback (no addon frame)", () => {
    const traceback =
      "stack traceback:\n/EsoUI/Ingame/Map/MapPin.lua:2986: operator * is not supported"
    expect(extractOwningAddon(traceback)).toBeUndefined()
  })

  it("returns undefined for null / undefined / empty tracebacks", () => {
    expect(extractOwningAddon(null)).toBeUndefined()
    expect(extractOwningAddon(undefined)).toBeUndefined()
    expect(extractOwningAddon("")).toBeUndefined()
  })
})

describe("extractOwningAddonCandidates", () => {
  it("reaches the bundled MEMBER before the bundle FOLDER", () => {
    const traceback =
      "stack traceback:\nuser:/AddOns/Temper/TemperVotansMiniMap.lua:4260: in function 'x'"
    expect(extractOwningAddonCandidates(traceback)).toEqual(["TemperVotansMiniMap", "Temper"])
  })

  it("collapses to one candidate when member == folder (standalone addon)", () => {
    const traceback =
      "stack traceback:\nuser:/AddOns/TemperpChat/TemperpChat.lua:10716: in function 'y'"
    expect(extractOwningAddonCandidates(traceback)).toEqual(["TemperpChat"])
  })

  it("returns [] for a base-game-only / empty traceback", () => {
    expect(extractOwningAddonCandidates("/EsoUI/Ingame/Map/MapPin.lua:2986: boom")).toEqual([])
    expect(extractOwningAddonCandidates(null)).toEqual([])
    expect(extractOwningAddonCandidates("")).toEqual([])
  })
})

const EXTERNAL_PHANTOMS: ReadonlyArray<readonly [string, number]> = [
  ["DolgubonsLazyWritCreator (disabled by Alan)", 45],
  ["TamrielTradeCentre (TTC)", 46],
  ["LibHarvensAddonSettings", 51],
  ["LibLazyCrafting", 25],
  ["IIfA", 40],
  ["CarosSkillPointSaver", 36],
]

describe("classifyLiveness", () => {
  const cases: ReadonlyArray<{
    name: string
    input: LivenessInput
    verdict: "live" | "stale"
    reason: "live" | "fixed" | "recency"
  }> = [
    {
      name: "Temper-core — in-repo, fix landed after lastSeen",
      input: {
        lastSeenAtMs: hoursBehindFrontier(30),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: {
          kind: "in-repo",
          repoRelDir: "packages/temper",
          latestFixMs: hoursBehindFrontier(28),
        },
      },
      verdict: "stale",
      reason: "fixed",
    },
    {
      name: "TemperpChat — in-repo, fix landed after lastSeen",
      input: {
        lastSeenAtMs: hoursBehindFrontier(49),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: {
          kind: "in-repo",
          repoRelDir: "packages/temper/addons/temperp-chat",
          latestFixMs: hoursBehindFrontier(2),
        },
      },
      verdict: "stale",
      reason: "fixed",
    },
    {
      name: "TemperVotansMiniMap (Votans) — in-repo, disabled/quiet, no fix after",
      input: {
        lastSeenAtMs: hoursBehindFrontier(49),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: {
          kind: "in-repo",
          repoRelDir: "packages/temper/game/navigation/addon/src/votans-minimap",
          latestFixMs: hoursBehindFrontier(120),
        },
      },
      verdict: "stale",
      reason: "recency",
    },
    {
      name: "TemperCombat — in-repo, quiet, never committed dir (null fix)",
      input: {
        lastSeenAtMs: hoursBehindFrontier(50),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: {
          kind: "in-repo",
          repoRelDir: "packages/temper/addons/combat",
          latestFixMs: null,
        },
      },
      verdict: "stale",
      reason: "recency",
    },
    ...EXTERNAL_PHANTOMS.map(([name, behind]) => ({
      name: `${name} — external, ${behind}h behind frontier`,
      input: {
        lastSeenAtMs: hoursBehindFrontier(behind),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: { kind: "external" } as const,
      },
      verdict: "stale" as const,
      reason: "recency" as const,
    })),
    {
      name: "TemperUnboxer (#13008, pre-fix) — in-repo, at frontier, fix predates error",
      input: {
        lastSeenAtMs: FRONTIER_MS,
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: {
          kind: "in-repo",
          repoRelDir: "packages/temper/addons/unboxer",
          latestFixMs: hoursBehindFrontier(200),
        },
      },
      verdict: "live",
      reason: "live",
    },
    {
      name: "in-repo, recent, never-committed dir (null fix) — live",
      input: {
        lastSeenAtMs: hoursBehindFrontier(1),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: { kind: "in-repo", repoRelDir: "packages/temper/addons/new", latestFixMs: null },
      },
      verdict: "live",
      reason: "live",
    },
    {
      name: "external addon — external, fired 4h behind frontier (recurring) — live",
      input: {
        lastSeenAtMs: hoursBehindFrontier(4),
        frontierMs: FRONTIER_MS,
        staleAfterMs: STALE_AFTER_MS,
        ownership: { kind: "external" },
      },
      verdict: "live",
      reason: "live",
    },
  ]

  for (const c of cases) {
    it(`${c.verdict} (${c.reason}): ${c.name}`, () => {
      const out = classifyLiveness(c.input)
      expect(out.verdict).toBe(c.verdict)
      expect(out.reason).toBe(c.reason)
    })
  }

  it("reports the deploy reason ('fixed') when BOTH deploy and recency fire", () => {
    const out = classifyLiveness({
      lastSeenAtMs: hoursBehindFrontier(50),
      frontierMs: FRONTIER_MS,
      staleAfterMs: STALE_AFTER_MS,
      ownership: {
        kind: "in-repo",
        repoRelDir: "packages/temper",
        latestFixMs: hoursBehindFrontier(48),
      },
    })
    expect(out).toEqual({ verdict: "stale", reason: "fixed" })
  })

  it("is exactly at the recency boundary → live (strictly-greater-than threshold)", () => {
    const out = classifyLiveness({
      lastSeenAtMs: FRONTIER_MS - STALE_AFTER_MS,
      frontierMs: FRONTIER_MS,
      staleAfterMs: STALE_AFTER_MS,
      ownership: { kind: "external" },
    })
    expect(out.verdict).toBe("live")
  })

  it("just past the recency boundary → stale", () => {
    const out = classifyLiveness({
      lastSeenAtMs: FRONTIER_MS - STALE_AFTER_MS - 1,
      frontierMs: FRONTIER_MS,
      staleAfterMs: STALE_AFTER_MS,
      ownership: { kind: "external" },
    })
    expect(out).toEqual({ verdict: "stale", reason: "recency" })
  })
})
