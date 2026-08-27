
import { describe, expect, test } from "bun:test"
import { type ContentPair, filePathPairs, type PairsRefused } from "../lib/payload.ts"

const VALUE_FLAGS = [
  "--repo",
  "--input-file",
  "--file-path",
  "--content-file",
  "--message",
  "--message-file",
  "--remove",
]

function pairs(argv: readonly string[]): readonly ContentPair[] {
  const got = filePathPairs(argv, VALUE_FLAGS)
  if ("refusal" in got) throw new Error(`refused: ${(got as PairsRefused).refusal}`)
  return got
}

function refusal(argv: readonly string[]): string {
  const got = filePathPairs(argv, VALUE_FLAGS)
  if (!("refusal" in got)) throw new Error(`took ${got.length} pair(s) where it should refuse`)
  return got.refusal
}

describe("the bodies a call names with --file-path and --content-file", () => {
  test("every pair is carried, so a change set of N paths is N entries rather than the first", () => {
    expect(
      pairs(["--file-path", "a.ts", "--content-file", "a", "--file-path", "b.ts", "--content-file", "b"])
    ).toEqual([
      { filePath: "a.ts", contentFile: "a" },
      { filePath: "b.ts", contentFile: "b" },
    ])
  })

  test("each --file-path takes the --content-file that follows it, not the first in the call", () => {
    const [, second] = pairs([
      "--file-path", "a.ts", "--content-file", "a",
      "--file-path", "b.ts", "--content-file", "b",
    ])
    expect(second).toEqual({ filePath: "b.ts", contentFile: "b" })
  })

  test("a path given no body is refused, never dropped from the set", () => {
    expect(refusal(["--file-path", "a.ts"])).toContain("--content-file")
  })

  test("a path whose body is taken by the next path is refused, never dropped from the set", () => {
    expect(refusal(["--file-path", "a.ts", "--file-path", "b.ts", "--content-file", "b"])).toContain(
      "a.ts"
    )
  })

  test("a body naming no path is refused, nothing saying where it would land", () => {
    expect(refusal(["--content-file", "a"])).toContain("--file-path")
  })

  test("a flag's own value is not read as a flag, so a body may be named for either token", () => {
    expect(pairs(["--message", "--file-path", "--file-path", "a.ts", "--content-file", "a"])).toEqual([
      { filePath: "a.ts", contentFile: "a" },
    ])
  })

  test("a call naming no pair carries none, leaving the payload to say what is written", () => {
    expect(pairs(["--input-file", "some.json", "--dry-run"])).toEqual([])
  })
})
