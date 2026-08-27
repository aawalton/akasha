import { describe, expect, it } from "bun:test"
import {
  claimSeatSupervision,
  decideSeatSupervision,
  SeatSupervisionCollisionError,
} from "../lib/seat-supervisor-claim.ts"
import { formatSeatProcKey, readSeatProcKey } from "../lib/seat-proc-key.ts"

const AGENT = "aaaaaaaa-0000-0000-0000-00000000beef"

const SELF = formatSeatProcKey(readSeatProcKey(process.pid) ?? { pid: process.pid, startTicks: 0 })

const RECYCLED = `${process.pid}-1`

const FOREIGN = "1-7"

const UNREADABLE = "not-a-process-key"

describe("who may supervise a seat", () => {
  it("takes a seat no process holds", () => {
    expect(
      decideSeatSupervision({
        holderProcess: null,
        holderPresence: "unknown",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "unheld" })
  })

  it("re-enters a seat this same process already holds, so an exec keeps its seat", () => {
    expect(
      decideSeatSupervision({
        holderProcess: SELF,
        holderPresence: "present",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "held-by-self" })
  })

  it("takes over a seat whose holder /proc no longer stands for", () => {
    expect(
      decideSeatSupervision({
        holderProcess: FOREIGN,
        holderPresence: "absent",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "took-over", goneProcess: FOREIGN })
  })

  it("refuses a seat another standing process holds", () => {
    expect(
      decideSeatSupervision({
        holderProcess: FOREIGN,
        holderPresence: "present",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "refuse", holderProcess: FOREIGN, holderPresence: "present" })
  })

  it("refuses a seat whose holder it cannot read, because not knowing is not permission", () => {
    expect(
      decideSeatSupervision({
        holderProcess: UNREADABLE,
        holderPresence: "unknown",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "refuse", holderProcess: UNREADABLE, holderPresence: "unknown" })
  })

  it("does not read a key naming this pid under another start time as this process", () => {
    expect(RECYCLED).not.toBe(SELF)
    expect(
      decideSeatSupervision({
        holderProcess: RECYCLED,
        holderPresence: "absent",
        selfProcess: SELF,
      })
    ).toEqual({ kind: "took-over", goneProcess: RECYCLED })
  })
})

describe("what a refusal tells whoever reads it", () => {
  it("names the pid to kill, and says the key is a process rather than a pid", () => {
    const err = new SeatSupervisionCollisionError(AGENT, "4242-99", "present")
    expect(err.holderPid).toBe(4242)
    expect(err.message).toContain("4242")
    expect(err.message).toContain(AGENT)
  })

  it("names no pid to kill where the stated key is not a process key", () => {
    const err = new SeatSupervisionCollisionError(AGENT, UNREADABLE, "unknown")
    expect(err.holderPid).toBeNull()
  })
})

describe("claiming supervision against what is on disk", () => {
  it("allows an agent no seat page names", () => {
    expect(claimSeatSupervision(crypto.randomUUID())).toBeUndefined()
  })

  it("allows a claim with no agent to name", () => {
    expect(claimSeatSupervision(null)).toBeUndefined()
  })
})
