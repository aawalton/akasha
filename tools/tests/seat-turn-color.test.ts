import { describe, expect, test } from "bun:test"
import { SEAT_TURN_STATES } from "../lib/seat-turn-state.ts"
import { colorOfState, colorStatedOn, stateStandsAs } from "../lib/seat-turn-color.ts"
import { akashaRoot } from "../../repo/roots/roots"

const AKASHA = akashaRoot()

describe("which domain a state stands as", () => {
  test("every state stands as the domain its own name spells", () => {
    for (const state of SEAT_TURN_STATES) {
      expect(stateStandsAs(state)).toBe(`agent-turn-${state}`)
    }
  })

  test("no two states stand as the same domain, a state being one thing", () => {
    const named = SEAT_TURN_STATES.map(stateStandsAs)
    expect(new Set(named).size).toBe(named.length)
  })
})

describe("the color a state is drawn in", () => {
  test("every state is drawn in a color its own domain states", () => {
    for (const state of SEAT_TURN_STATES) {
      expect(colorOfState(state, AKASHA)).not.toBeNull()
    }
  })

  // The surfaces all ask this way, naming no root, so this is the reading that goes dark when the
  // root resolves to a repository the domain pages do not stand in. Passing a root above exercises
  // the read and not the resolution, and the two came apart once already.
  test("every state is drawn in a color with no root named, which is how every surface asks", () => {
    for (const state of SEAT_TURN_STATES) {
      expect(colorOfState(state)).not.toBeNull()
    }
  })

  test("a stopped agent is drawn in the plain text color, taking whatever draws it", () => {
    expect(colorOfState("stopped", AKASHA)).toBe("text")
  })

  test("a domain that is not there is drawn in no color, rather than raising", () => {
    expect(colorStatedOn(AKASHA, "agent-turn-nothing-names-this")).toBeNull()
  })
})
