
import { describe, expect, it } from "bun:test"
import { decideRelaunchName } from "../lib/relaunch-name.ts"

describe("decideRelaunchName", () => {
  it("row has a name, no --name → use-row with the row name", () => {
    expect(decideRelaunchName({ rowName: "amy", providedName: null })).toEqual({
      kind: "use-row",
      name: "amy",
    })
  })

  it("row has a name AND --name given → use-row with the row name (provided ignored)", () => {
    expect(decideRelaunchName({ rowName: "amy", providedName: "something-else" })).toEqual({
      kind: "use-row",
      name: "amy",
    })
  })

  it("nameless row, --name given → bind with the provided name", () => {
    expect(decideRelaunchName({ rowName: null, providedName: "amy" })).toEqual({
      kind: "bind",
      name: "amy",
    })
  })

  it("nameless row, no --name → need-name", () => {
    expect(decideRelaunchName({ rowName: null, providedName: null })).toEqual({ kind: "need-name" })
  })
})
