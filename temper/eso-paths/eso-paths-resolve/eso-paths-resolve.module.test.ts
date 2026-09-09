import { describe, expect, test } from "bun:test"
import {
  addonsDir,
  addonsFile,
  esoLiveDir,
  savedVarsDir,
  savedVarsFile,
} from "./eso-paths-resolve.module.code.ts"

const WINDOWS = {
  platform: "win32",
  env: { USERPROFILE: "C:/Users/ann" },
} as const

describe("esoLiveDir", () => {
  test("a directory named outright is answered without asking the disk", () => {
    expect(
      esoLiveDir({
        env: { ESO_LIVE_DIR: "/named" },
        exists: () => {
          throw new Error("the disk was asked")
        },
      })
    ).toBe("/named")
  })

  test("the first candidate present is the answer", () => {
    const seen: string[] = []
    const answer = esoLiveDir({
      ...WINDOWS,
      exists: (path) => {
        seen.push(path)
        return seen.length === 2
      },
    })
    expect(seen.length).toBe(2)
    expect(answer).toBe(seen.at(1) ?? "")
  })

  test("no candidate present is refused with every candidate named", () => {
    expect(() => esoLiveDir({ ...WINDOWS, exists: () => false })).toThrow(
      /Could not find the Elder Scrolls Online 'live' directory/
    )
  })
})

describe("what sits beneath the live directory", () => {
  const named = { env: { ESO_LIVE_DIR: "/live" } } as const

  test("saved variables sit in their own directory", () => {
    expect(savedVarsDir(named)).toBe("/live/SavedVariables")
    expect(savedVarsFile("Temper.lua", named)).toBe("/live/SavedVariables/Temper.lua")
  })

  test("addons sit in their own directory", () => {
    expect(addonsDir(named)).toBe("/live/AddOns")
    expect(addonsFile("Temper/Temper.txt", named)).toBe("/live/AddOns/Temper/Temper.txt")
  })
})
