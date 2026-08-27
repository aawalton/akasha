import { describe, expect, test } from "bun:test"
import { exploreKey, INITIAL_AUTO_QUEST_MEMORY, reconcileAutoQuest } from "../decide"
import { mem, opt, snap } from "./snapshot-builders"

describe("reconcileAutoQuest — zero-option pages and lifecycle", () => {
  test("zero options before any menu was seen: wait (greeting not yet populated)", () => {
    const r = reconcileAutoQuest(snap({ options: [] }), mem())
    expect(r.action).toEqual({ kind: "none" })
  })

  test("zero options after a menu was seen: end the interaction (goodbye-only terminal page)", () => {
    const r = reconcileAutoQuest(snap({ options: [] }), mem({ sawMenu: true }))
    expect(r.action).toEqual({ kind: "end-interaction", reason: "zero-option-after-menu" })
  })

  test("a non-empty menu marks sawMenu in the returned memory", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "service")] }), mem())
    expect(r.memory.sawMenu).toBe(true)
  })

  test("idle (no interaction, no offer, no pending completion) resets memory", () => {
    const dirty = mem({
      visitedExploreKeys: new Set([exploreKey("menu", 1)]),
      questActed: true,
      sawMenu: true,
      lastSelected: { fingerprint: "menu", index: 1 },
    })
    const r = reconcileAutoQuest(snap({ inChatter: false, options: [] }), dirty)
    expect(r.action).toEqual({ kind: "none" })
    expect(r.memory).toEqual(INITIAL_AUTO_QUEST_MEMORY)
  })

  test("a pending offer keeps the reconciler active even outside chatter (14->3 transition)", () => {
    const r = reconcileAutoQuest(snap({ inChatter: false, offerPending: true }), mem())
    expect(r.action).toEqual({ kind: "accept-offer" })
  })

  test("a pending completion keeps the reconciler active even outside chatter", () => {
    const r = reconcileAutoQuest(
      snap({ inChatter: false, options: [] }),
      mem({ pendingCompletion: true })
    )
    expect(r.action).toEqual({ kind: "complete-quest" })
  })
})

describe("reconcileAutoQuest — multi-tick conversation sequences", () => {
  test("writ board: select bestowal, wait while frozen, accept offer, select next bestowal", () => {
    let memory = mem()

    const t1 = reconcileAutoQuest(
      snap({ options: [opt(1, "accept-quest")], menuFingerprint: "writs-3" }),
      memory
    )
    expect(t1.action).toEqual({ kind: "select", index: 1, reason: "accept-quest" })
    memory = t1.memory

    const t2 = reconcileAutoQuest(
      snap({ options: [opt(1, "accept-quest")], menuFingerprint: "writs-3" }),
      memory
    )
    expect(t2.action).toEqual({ kind: "none" })
    memory = t2.memory

    const t3 = reconcileAutoQuest(
      snap({ offerPending: true, options: [], menuFingerprint: "" }),
      memory
    )
    expect(t3.action).toEqual({ kind: "accept-offer" })
    memory = t3.memory

    const t4 = reconcileAutoQuest(
      snap({ options: [opt(1, "accept-quest")], menuFingerprint: "writs-2" }),
      memory
    )
    expect(t4.action).toEqual({ kind: "select", index: 1, reason: "accept-quest" })
  })

  test("turn-in then residual service menu: completion drains, exit-over-service closes the store", () => {
    let memory = mem({ sawMenu: true })

    const t1 = reconcileAutoQuest(snap({ options: [] }), { ...memory, pendingCompletion: true })
    expect(t1.action).toEqual({ kind: "complete-quest" })
    memory = t1.memory

    const t2 = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "goodbye")], menuFingerprint: "root" }),
      memory
    )
    expect(t2.action).toEqual({ kind: "select", index: 2, reason: "goodbye" })
  })
})
