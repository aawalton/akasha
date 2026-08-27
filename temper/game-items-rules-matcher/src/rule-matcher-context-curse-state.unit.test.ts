import { describe, expect, it } from "bun:test"
import { buildGetCharacterCurseState, compileCurseStates } from "./rule-matcher-context-curse-state"

describe("compileCurseStates", () => {
  it("ignores characters without completion data", () => {
    const map = compileCurseStates([
      { esoCharacterId: "1001", targetBuildId: undefined, sortOrder: undefined },
    ])
    expect(map.size).toBe(0)
  })

  it("ignores characters whose completion has no curseState", () => {
    const map = compileCurseStates([
      {
        esoCharacterId: "1001",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: {},
      },
    ])
    expect(map.size).toBe(0)
  })

  it("captures `vampire` curse state from the completion blob", () => {
    const map = compileCurseStates([
      {
        esoCharacterId: "1001",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: { curseState: "vampire" },
      },
    ])
    expect(map.get("1001")).toBe("vampire")
  })

  it("captures `werewolf` curse state from the completion blob", () => {
    const map = compileCurseStates([
      {
        esoCharacterId: "1002",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: { curseState: "werewolf" },
      },
    ])
    expect(map.get("1002")).toBe("werewolf")
  })

  it("does not surface `no-curse` — only active curse states are captured", () => {
    const map = compileCurseStates([
      {
        esoCharacterId: "1003",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: { curseState: "no-curse" },
      },
    ])
    expect(map.has("1003")).toBe(false)
  })

  it("skips entries with non-string curseState", () => {
    const map = compileCurseStates([
      {
        esoCharacterId: "1004",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: { curseState: 42 },
      },
    ])
    expect(map.size).toBe(0)
  })
})

describe("buildGetCharacterCurseState", () => {
  const charMap = new Map<string, "vampire" | "werewolf">([
    ["1001", "vampire"],
    ["1002", "werewolf"],
  ])
  const resolve = buildGetCharacterCurseState(charMap)

  it("returns `vampire` for a known vampire character", () => {
    expect(resolve("1001")).toBe("vampire")
  })

  it("returns `werewolf` for a known werewolf character", () => {
    expect(resolve("1002")).toBe("werewolf")
  })

  it("returns undefined for an unknown character", () => {
    expect(resolve("9999")).toBeUndefined()
  })

  it("returns undefined when the per-char map is empty", () => {
    const empty = buildGetCharacterCurseState(new Map())
    expect(empty("1001")).toBeUndefined()
  })
})
