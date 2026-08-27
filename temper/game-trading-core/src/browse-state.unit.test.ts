import { describe, expect, test } from "bun:test"
import {
  type BrowseAction,
  type BrowseEvent,
  type BrowseState,
  decideBrowseNext,
  initialBrowseState,
} from "./browse-state"

function reduce(
  state: BrowseState,
  ...events: readonly BrowseEvent[]
): { state: BrowseState; actions: readonly BrowseAction[] } {
  let current = state
  let actions: readonly BrowseAction[] = []
  for (const event of events) {
    const next = decideBrowseNext(current, event)
    current = next.state
    actions = next.actions
  }
  return { state: current, actions }
}

function hasAction(actions: readonly BrowseAction[], kind: string): boolean {
  return actions.some((a) => a.kind === kind)
}

describe("decideBrowseNext — start", () => {
  test("selects the first guild and queues page 0 of that guild", () => {
    const { state, actions } = reduce(initialBrowseState, {
      kind: "start",
      guildIds: [10, 20, 30],
    })
    expect(state.currentGuildId).toBe(10)
    expect(state.queue).toEqual([20, 30])
    expect(state.phase).toBe("searching")
    expect(actions).toContainEqual({ kind: "selectGuild", guildId: 10 })
    expect(actions).toContainEqual({ kind: "executeSearch", guildId: 10, page: 0 })
  })

  test("an empty guild list completes immediately", () => {
    const { state, actions } = reduce(initialBrowseState, {
      kind: "start",
      guildIds: [],
    })
    expect(state.phase).toBe("done")
    expect(hasAction(actions, "complete")).toBe(true)
  })
})

describe("decideBrowseNext — searchExecuted sets awaiting", () => {
  test("marks awaiting and phase searching", () => {
    const { state } = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10] },
      { kind: "searchExecuted" }
    )
    expect(state.awaiting).toBe(true)
    expect(state.phase).toBe("searching")
  })
})

describe("decideBrowseNext — pageReceived with more pages", () => {
  test("advances to the next page of the same guild after cooldown ready", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10] },
      { kind: "searchExecuted" },
      { kind: "pageReceived", guildId: 10, currentPage: 0, hasMorePages: true }
    )
    expect(after.state.awaiting).toBe(false)
    expect(after.state.highestPage).toBe(0)
    expect(after.state.hasMore).toBe(true)
    expect(after.state.phase).toBe("cooldown")
    expect(hasAction(after.actions, "executeSearch")).toBe(false)

    const ready = decideBrowseNext(after.state, { kind: "cooldownReady" })
    expect(ready.actions).toContainEqual({
      kind: "executeSearch",
      guildId: 10,
      page: 1,
    })
    expect(ready.state.phase).toBe("searching")
  })
})

describe("decideBrowseNext — pageReceived terminal for guild advances guild", () => {
  test("hasMorePages false moves to next guild and selects it", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10, 20] },
      { kind: "searchExecuted" },
      { kind: "pageReceived", guildId: 10, currentPage: 0, hasMorePages: false }
    )
    expect(after.state.currentGuildId).toBe(20)
    expect(after.state.queue).toEqual([])
    expect(after.state.awaiting).toBe(false)
    expect(after.actions).toContainEqual({ kind: "selectGuild", guildId: 20 })
    expect(after.actions).toContainEqual({
      kind: "executeSearch",
      guildId: 20,
      page: 0,
    })
  })

  test("exhausting the guild queue completes", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10] },
      { kind: "searchExecuted" },
      { kind: "pageReceived", guildId: 10, currentPage: 0, hasMorePages: false }
    )
    expect(after.state.phase).toBe("done")
    expect(after.state.currentGuildId).toBeUndefined()
    expect(hasAction(after.actions, "complete")).toBe(true)
  })

  test("terminates pagination only on hasMorePages false, never on a count", () => {
    let s = decideBrowseNext(initialBrowseState, {
      kind: "start",
      guildIds: [10],
    }).state
    for (let page = 0; page < 250; page++) {
      s = decideBrowseNext(s, { kind: "searchExecuted" }).state
      s = decideBrowseNext(s, {
        kind: "pageReceived",
        guildId: 10,
        currentPage: page,
        hasMorePages: true,
      }).state
      s = decideBrowseNext(s, { kind: "cooldownReady" }).state
      expect(s.phase).not.toBe("done")
    }
    s = decideBrowseNext(s, { kind: "searchExecuted" }).state
    const final = decideBrowseNext(s, {
      kind: "pageReceived",
      guildId: 10,
      currentPage: 250,
      hasMorePages: false,
    })
    expect(final.state.phase).toBe("done")
  })
})

describe("decideBrowseNext — guild-switch guard while awaiting", () => {
  test("never selectGuild while awaiting is true", () => {
    const started = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10, 20] },
      { kind: "searchExecuted" }
    )
    expect(started.state.awaiting).toBe(true)
    const ready = decideBrowseNext(started.state, { kind: "cooldownReady" })
    expect(hasAction(ready.actions, "selectGuild")).toBe(false)
    expect(hasAction(ready.actions, "executeSearch")).toBe(false)
  })
})

describe("decideBrowseNext — cooldown gating", () => {
  test("cooldownReady with no pending advance is a noop", () => {
    const ready = decideBrowseNext(initialBrowseState, { kind: "cooldownReady" })
    expect(ready.actions).toEqual([{ kind: "noop" }])
  })

  test("executeSearch only fires when not awaiting and cooldown ready", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10] },
      { kind: "searchExecuted" },
      { kind: "pageReceived", guildId: 10, currentPage: 0, hasMorePages: true }
    )
    expect(after.state.awaiting).toBe(false)
    expect(after.state.phase).toBe("cooldown")
    const ready = decideBrowseNext(after.state, { kind: "cooldownReady" })
    expect(hasAction(ready.actions, "executeSearch")).toBe(true)
  })
})

describe("decideBrowseNext — searchError", () => {
  test("clears awaiting and surfaces error without advancing the page", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10] },
      { kind: "searchExecuted" },
      { kind: "searchError", code: "SEARCH_RATE_EXCEEDED" }
    )
    expect(after.state.awaiting).toBe(false)
    expect(after.state.error).toBe("SEARCH_RATE_EXCEEDED")
    expect(after.state.highestPage).toBeUndefined()
    expect(after.actions).toEqual([{ kind: "noop" }])
  })
})

describe("decideBrowseNext — cancel", () => {
  test("moves to done and clears awaiting", () => {
    const after = reduce(
      initialBrowseState,
      { kind: "start", guildIds: [10, 20] },
      { kind: "searchExecuted" },
      { kind: "cancel" }
    )
    expect(after.state.phase).toBe("done")
    expect(after.state.awaiting).toBe(false)
  })
})

describe("decideBrowseNext — purity", () => {
  test("does not mutate the input state", () => {
    const frozen = Object.freeze({ ...initialBrowseState })
    expect(() => decideBrowseNext(frozen, { kind: "start", guildIds: [1, 2] })).not.toThrow()
    expect(frozen.phase).toBe("idle")
    expect(frozen.currentGuildId).toBeUndefined()
  })
})
