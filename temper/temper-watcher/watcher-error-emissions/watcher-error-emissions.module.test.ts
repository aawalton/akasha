import { expect, test } from "bun:test"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import {
  decideErrorEmissions,
  type EntryVerdict,
  isStaleResidue,
  signatureFor,
} from "./watcher-error-emissions.module.code.ts"

function entry(message: string, count: number, traceback?: string | null): ErrorEntry {
  return {
    message,
    count,
    traceback,
    firstSeenAt: 1_700_000_000,
    lastSeenAt: 1_700_000_060,
    account: "@alan",
    character: "Vex",
    world: "NA",
    esoVersion: "10.1.0",
    apiVersion: 101_045,
    eventCode: 7,
  }
}

const LIVE: EntryVerdict = { stale: false, triage: "actionable" as never }
const STALE: EntryVerdict = { stale: true, triage: "stale-ram" as never }
const LIVE_RECURRENCE: EntryVerdict = { stale: false, triage: "live-recurrence" }

test("an error is known by the crash signature of its message and its traceback", () => {
  expect(signatureFor(entry("boom", 1, "a.lua:1"))).toBe(signatureFor(entry("boom", 9, "a.lua:1")))
  expect(signatureFor(entry("boom", 1, "a.lua:1"))).not.toBe(
    signatureFor(entry("bang", 1, "a.lua:1"))
  )
})

test("an error never seen before is carried up", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1)], () => LIVE)
  expect(d.envelopes).toHaveLength(1)
  expect(d.envelopes[0]?.message).toBe("boom")
  expect(d.suppressed).toBe(0)
})

test("an error whose count has not risen is left alone", () => {
  const e = entry("boom", 3)
  const d = decideErrorEmissions(new Map([[signatureFor(e), 3]]), [e], () => LIVE)
  expect(d.envelopes).toHaveLength(0)
  expect(d.suppressed).toBe(0)
})

test("an error seen before is carried up once its count has risen", () => {
  const e = entry("boom", 4)
  const d = decideErrorEmissions(new Map([[signatureFor(e), 3]]), [e], () => LIVE)
  expect(d.envelopes).toHaveLength(1)
  expect(d.envelopes[0]?.count).toBe(4)
})

test("an error the game had already unloaded is held back and counted", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1)], () => STALE)
  expect(d.envelopes).toHaveLength(0)
  expect(d.suppressed).toBe(1)
})

test("a count is recorded for every error read, carried up or not", () => {
  const e = entry("boom", 3)
  const d = decideErrorEmissions(new Map([[signatureFor(e), 3]]), [e], () => LIVE)
  expect(d.nextSeen.get(signatureFor(e))).toBe(3)
})

test("the highest count read for one signature is the count recorded", () => {
  const d = decideErrorEmissions(
    new Map(),
    [entry("boom", 2), entry("boom", 9), entry("boom", 5)],
    () => LIVE
  )
  expect(d.nextSeen.get(signatureFor(entry("boom", 0)))).toBe(9)
})

test("what was seen before is kept where this run read none of it", () => {
  const d = decideErrorEmissions(new Map([["old", 4]]), [], () => LIVE)
  expect(d.nextSeen.get("old")).toBe(4)
  expect(d.envelopes).toHaveLength(0)
})

test("what was seen before is not changed by deciding", () => {
  const prior = new Map([["old", 4]])
  decideErrorEmissions(prior, [entry("boom", 1)], () => LIVE)
  expect(prior.size).toBe(1)
})

test("a time the game gave in seconds is carried up in milliseconds", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1)], () => LIVE)
  expect(d.envelopes[0]?.firstSeenAt).toBe(new Date(1_700_000_000_000).toISOString())
  expect(d.envelopes[0]?.lastSeenAt).toBe(new Date(1_700_000_060_000).toISOString())
})

test("a missing traceback is carried up as an empty string", () => {
  for (const absent of [null, undefined]) {
    const d = decideErrorEmissions(new Map(), [entry("boom", 1, absent)], () => LIVE)
    expect(d.envelopes[0]?.traceback).toBe("")
  }
})

test("a traceback the game gave is carried up whole", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1, "a.lua:12")], () => LIVE)
  expect(d.envelopes[0]?.traceback).toBe("a.lua:12")
})

test("what is carried up is stamped as a temper error from the account that saw it", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1)], () => LIVE)
  expect(d.envelopes[0]?.kind).toBe("temper-error")
  expect(d.envelopes[0]?.account).toBe("@alan")
  expect(d.envelopes[0]?.character).toBe("Vex")
})

test("the verdict's triage is stamped onto what is carried up", () => {
  const d = decideErrorEmissions(new Map(), [entry("boom", 1)], () => LIVE_RECURRENCE)
  expect(d.envelopes[0]?.triage).toBe("live-recurrence")
})

test("what is carried up carries the signature it is known by", () => {
  const e = entry("boom", 1, "user:/AddOns/Temper/Temper.lua:4: in function 'f'")
  const d = decideErrorEmissions(new Map(), [e], () => LIVE)
  expect(d.envelopes[0]?.signature).toBe(signatureFor(e))
})

test("two tracebacks of one crash site are known by one signature", () => {
  const message = "/EsoUI/Ingame/Inventory/Inventory.lua:1596: attempt to index a nil value"
  const frame = "user:/AddOns/Temper/TemperMasterWritInventoryMarker.lua:475: in function 'f'"
  const batch = (): ErrorEntry[] => [
    entry(message, 1, `stack traceback:\n\t${frame}\n\tZO_MenuBar:305: in 'Release'`),
    entry(message, 1, `stack traceback:\n\t${frame}\n\tZO_MainMenu:3: in 'MouseUp'`),
  ]
  const first = decideErrorEmissions(new Map(), batch(), () => LIVE)
  expect(first.nextSeen.size).toBe(1)
  expect(first.envelopes[0]?.signature).toBe(first.envelopes[1]?.signature)
  expect(decideErrorEmissions(first.nextSeen, batch(), () => LIVE).envelopes).toHaveLength(0)
})

test("an error held back has its count recorded all the same", () => {
  const e = entry("boom", 6)
  const d = decideErrorEmissions(new Map(), [e], () => STALE)
  expect(d.nextSeen.get(signatureFor(e))).toBe(6)
})

test("a burst carries the live errors up and holds the unloaded ones back", () => {
  const d = decideErrorEmissions(
    new Map(),
    [entry("live error", 1), entry("stale residue", 1)],
    (e) => (e.message === "stale residue" ? STALE : LIVE)
  )
  expect(d.envelopes.map((env) => env.message)).toEqual(["live error"])
  expect(d.suppressed).toBe(1)
})

test("distinct crash sites are each carried up", () => {
  const d = decideErrorEmissions(
    new Map(),
    [entry("first error", 1), entry("second error", 1)],
    () => LIVE
  )
  expect(d.envelopes.map((env) => env.message).sort()).toEqual(["first error", "second error"])
})

test("an error carried up once is not carried up again on the next read", () => {
  const e = entry("boom", 1, null)
  const first = decideErrorEmissions(new Map(), [e], () => LIVE)
  expect(first.envelopes).toHaveLength(1)
  expect(first.nextSeen.get(signatureFor(e))).toBe(1)
  expect(decideErrorEmissions(first.nextSeen, [e], () => LIVE).envelopes).toHaveLength(0)
})

test("an addon the game unloaded is read as residue", () => {
  expect(isStaleResidue({ verdict: "stale" } as never, { triage: "actionable" } as never)).toBe(
    true
  )
  expect(isStaleResidue({ verdict: "live" } as never, { triage: "stale-ram" } as never)).toBe(true)
  expect(isStaleResidue({ verdict: "live" } as never, { triage: "actionable" } as never)).toBe(
    false
  )
})
