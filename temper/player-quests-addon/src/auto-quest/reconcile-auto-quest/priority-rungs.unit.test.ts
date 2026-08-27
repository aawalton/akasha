import { describe, expect, test } from "bun:test"
import { reconcileAutoQuest } from "../decide"
import { mem, opt, snap } from "./snapshot-builders"

describe("reconcileAutoQuest — offer and completion rungs", () => {
  test("a pending offer is accepted", () => {
    const r = reconcileAutoQuest(snap({ offerPending: true }), mem())
    expect(r.action).toEqual({ kind: "accept-offer" })
    expect(r.memory.questActed).toBe(true)
  })

  test("a still-pending offer is re-accepted on the next tick (level-triggered retry)", () => {
    const first = reconcileAutoQuest(snap({ offerPending: true }), mem())
    const second = reconcileAutoQuest(snap({ offerPending: true }), first.memory)
    expect(second.action).toEqual({ kind: "accept-offer" })
  })

  test("a pending offer outranks the chatter menu", () => {
    const r = reconcileAutoQuest(
      snap({ offerPending: true, options: [opt(1, "accept-quest")] }),
      mem()
    )
    expect(r.action).toEqual({ kind: "accept-offer" })
  })

  test("a pending completion is completed and the bridge flag drains", () => {
    const r = reconcileAutoQuest(snap(), mem({ pendingCompletion: true }))
    expect(r.action).toEqual({ kind: "complete-quest" })
    expect(r.memory.pendingCompletion).toBe(false)
    expect(r.memory.questActed).toBe(true)
  })

  test("a pending completion outranks the chatter menu", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk")] }),
      mem({ pendingCompletion: true })
    )
    expect(r.action).toEqual({ kind: "complete-quest" })
  })

  test("a pending offer outranks a pending completion, which is preserved for the next tick", () => {
    const r = reconcileAutoQuest(snap({ offerPending: true }), mem({ pendingCompletion: true }))
    expect(r.action).toEqual({ kind: "accept-offer" })
    expect(r.memory.pendingCompletion).toBe(true)
  })
})

describe("reconcileAutoQuest — chatter priority ladder", () => {
  test("persuade/intimidate beats every other option", () => {
    const r = reconcileAutoQuest(
      snap({
        options: [
          opt(1, "talk"),
          opt(2, "complete-quest"),
          opt(3, "accept-quest"),
          opt(4, "persuade-intimidate"),
        ],
      }),
      mem()
    )
    expect(r.action).toEqual({ kind: "select", index: 4, reason: "persuade-intimidate" })
  })

  test("folium skill-point branch beats accept/advance/complete", () => {
    const r = reconcileAutoQuest(
      snap({
        options: [opt(1, "complete-quest"), opt(2, "folium-skill-point"), opt(3, "accept-quest")],
      }),
      mem()
    )
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "folium-skill-point" })
  })

  test("accept precedes advance precedes complete", () => {
    const all = reconcileAutoQuest(
      snap({
        options: [opt(1, "complete-quest"), opt(2, "advance-quest"), opt(3, "accept-quest")],
      }),
      mem()
    )
    expect(all.action).toEqual({ kind: "select", index: 3, reason: "accept-quest" })

    const advanceVsComplete = reconcileAutoQuest(
      snap({ options: [opt(1, "complete-quest"), opt(2, "advance-quest")] }),
      mem()
    )
    expect(advanceVsComplete.action).toEqual({ kind: "select", index: 2, reason: "advance-quest" })

    const completeAlone = reconcileAutoQuest(snap({ options: [opt(1, "complete-quest")] }), mem())
    expect(completeAlone.action).toEqual({ kind: "select", index: 1, reason: "complete-quest" })
  })

  test("service and goodbye options are never auto-selected on an unexhausted service menu", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "service"), opt(2, "goodbye")] }), mem())
    expect(r.action).toEqual({ kind: "none" })
  })
})
