import { describe, expect, test } from "bun:test"
import { exploreKey, reconcileAutoQuest } from "../decide"
import { mem, opt, snap } from "./snapshot-builders"

describe("reconcileAutoQuest — DFS exploration", () => {
  test("explores the first unvisited talk option", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk"), opt(2, "talk"), opt(3, "goodbye")] }),
      mem()
    )
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "explore" })
  })

  test("an explore select records its key in the returned memory", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "talk")] }), mem())
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "explore" })
    expect(r.memory.visitedExploreKeys.has(exploreKey("menu", 1))).toBe(true)
  })

  test("skips a visited option and descends the next one", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk"), opt(2, "talk")] }),
      mem({ visitedExploreKeys: new Set([exploreKey("menu", 1)]) })
    )
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "explore" })
  })

  test("skips an engine chosenBefore talk option and descends the next one", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "talk", true), opt(2, "talk")] }), mem())
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "explore" })
  })

  test("the same option index in different menus is tracked independently", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk")] }),
      mem({ visitedExploreKeys: new Set([exploreKey("other-menu", 1)]) })
    )
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "explore" })
  })
})

describe("reconcileAutoQuest — auto-goodbye / auto-leave on exhaustion", () => {
  test("selects goodbye when a conversational NPC has only a goodbye left", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "goodbye")] }), mem())
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "goodbye" })
  })

  test("selects goodbye once every talk branch is exhausted", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk", true), opt(2, "goodbye")] }),
      mem()
    )
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "goodbye" })
  })

  test("explores before resorting to goodbye", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "talk"), opt(2, "goodbye")] }), mem())
    expect(r.action).toEqual({ kind: "select", index: 1, reason: "explore" })
  })

  test("a disabled blocked choice does not suppress auto-goodbye", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "blocked"), opt(2, "goodbye")] }), mem())
    expect(r.action).toEqual({ kind: "select", index: 2, reason: "goodbye" })
  })

  test("ends the interaction when exhausted with no goodbye and no service", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "talk", true)] }), mem())
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })

  test("the lone gossip loop: a single already-visited talk option ends the interaction", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "talk")] }),
      mem({ visitedExploreKeys: new Set([exploreKey("menu", 1)]) })
    )
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })

  test("only blocked options remain (no goodbye, no service) — ends the interaction", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "blocked")] }), mem())
    expect(r.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })

  test("a service-only menu is left open, never auto-left", () => {
    const r = reconcileAutoQuest(snap({ options: [opt(1, "service")] }), mem())
    expect(r.action).toEqual({ kind: "none" })
  })

  test("a service option with no goodbye suppresses leave (merchant stays open)", () => {
    const r = reconcileAutoQuest(
      snap({ options: [opt(1, "service"), opt(2, "talk", true)] }),
      mem()
    )
    expect(r.action).toEqual({ kind: "none" })
  })
})
