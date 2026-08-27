import { describe, expect, test } from "bun:test"
import { exploreKey, reconcileAutoQuest } from "../decide"
import { mem, opt, snap } from "./snapshot-builders"

describe("reconcileAutoQuest — exit-over-service after a quest action", () => {
  test("after a quest action, selects goodbye to leave even past a service menu", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "goodbye")] }),
      mem({ questActed: true })
    )
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "goodbye" })
  })

  test("after a quest action with no goodbye, force-ends even past a service menu", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "service")] }), mem({ questActed: true }))
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exit-over-service-no-goodbye" })
  })

  test("after a quest action, leaves a service menu once talk is exhausted", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "talk", true)] }),
      mem({ questActed: true })
    )
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exit-over-service-no-goodbye" })
  })

  test("the quest-acted flag does not short-circuit exploration — unexplored talk still wins", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "talk"), opt(3, "goodbye")] }),
      mem({ questActed: true })
    )
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "explore" })
  })

  test("without a quest action, a service menu is still left open (regression guard)", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "goodbye")] }),
      mem({ questActed: false })
    )
    expect(r.action).toEqual({ kind: "none" })
  })
})

describe("reconcileAutoQuest — select idempotence rule (stale-page wait)", () => {
  test("a select equal to lastSelected degrades to none until the menu changes", () => {
    const first = reconcileAutoQuest(snap({ options: [opt(1, "advance-quest")] }), mem())
    expect(first.action).toEqual({ kind: "select", index: 1, reason: "advance-quest" })
    expect(first.memory.lastSelected).toEqual({ fingerprint: "menu", index: 1 })

    const frozen = reconcileAutoQuest(snap({ options: [opt(1, "advance-quest")] }), first.memory)
    expect(frozen.action).toEqual({ kind: "none" })
  })

  test("the same option index on a changed menu fingerprint is selected again", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "accept-quest")], menuFingerprint: "menu-v2" }),
      mem({ lastSelected: { fingerprint: "menu", index: 1 } })
    )
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "accept-quest" })
  })

  test("a different index on the same menu is not blocked (DFS advances)", () => {
    const first = reconcileAutoQuest(snap({ options: [opt(1, "talk"), opt(2, "talk")] }), mem())
    expect(first.action).toEqual({ kind: "select", index: 1, reason: "explore" })
    const second = reconcileAutoQuest(
      snap({ options: [opt(1, "talk"), opt(2, "talk")] }),
      first.memory
    )
    expect(second.action).toEqual({ kind: "select", index: 2, reason: "explore" })
  })

  test("accept-offer is never blocked by lastSelected (idempotent action)", () => {
    const r = reconcileAutoQuest(
      snap({ offerPending: true, options: [opt(1, "accept-quest")] }),
      mem({ lastSelected: { fingerprint: "menu", index: 1 } })
    )
    expect(r.action).toEqual({ kind: "accept-offer" })
  })
})

describe("reconcileAutoQuest — stale-page wait, force-end variant", () => {
  test("the only talk option, just selected, waits while its page is frozen mid-commit", () => {
    const first = reconcileAutoQuest(snap({ options: [opt(1, "talk")] }), mem())
    expect(first.action).toEqual({ kind: "select", index: 1, reason: "explore" })
    expect(first.memory.lastSelected).toEqual({ fingerprint: "menu", index: 1 })

    const frozen = reconcileAutoQuest(snap({ options: [opt(1, "talk")] }), first.memory)
    expect(frozen.action).toEqual({ kind: "none" })
  })

  test("exit-over-service force-end on a just-selected frozen page also waits", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "talk")], menuFingerprint: "m" }),
      mem({
        questActed: true,
        visitedExploreKeys: new Set([exploreKey("m", 2)]),
        lastSelected: { fingerprint: "m", index: 2 },
      })
    )
    expect(r.action).toEqual({ kind: "none" })
  })

  test("an exhausted page we did NOT just select into still ends (lastSelected elsewhere)", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk")], menuFingerprint: "page-b" }),
      mem({
        visitedExploreKeys: new Set([exploreKey("page-b", 1)]),
        lastSelected: { fingerprint: "page-a", index: 2 },
      })
    )
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })

  test("the lone gossip loop with no prior self-select still ends (regression guard)", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk")] }),
      mem({ visitedExploreKeys: new Set([exploreKey("menu", 1)]) })
    )
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })
})
