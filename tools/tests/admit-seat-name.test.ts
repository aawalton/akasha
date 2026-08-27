
import { describe, expect, test } from "bun:test"
import { resolveRoots, targetRoot } from "../../repo/roots/roots"
import { admitsPayload, BadPayload } from "../seat-name.ts"

const root = targetRoot(resolveRoots())

interface Admission {
  readonly name: string
  readonly admitted: boolean
  readonly family: string | null
}

function answer(payload: unknown): {
  readonly root: string
  readonly admissions: readonly Admission[]
  readonly shapes: readonly string[]
} {
  return JSON.parse(admitsPayload(payload, root))
}

function admissionOf(name: string): Admission {
  return answer({ names: [name] }).admissions[0] as Admission
}

describe("admitsPayload", () => {
  test("every name in comes back out, in the order it arrived", () => {
    const names = ["amy", "garbage-nonsense-xyz", "athena"]
    expect(answer({ names }).admissions.map((one) => one.name)).toEqual(names)
  })

  test("`admitted` is false exactly where `family` is null", () => {
    const names = ["amy", "garbage-nonsense-xyz", "athena", "stalls"]
    for (const one of answer({ names }).admissions) {
      expect(one.admitted).toBe(one.family !== null)
    }
  })

  test("a name no family admits is an answer rather than an omission", () => {
    expect(admissionOf("garbage-nonsense-xyz")).toEqual({
      name: "garbage-nonsense-xyz",
      admitted: false,
      family: null,
    })
  })

  test("the three forms a seat name may take are each admitted", () => {
    expect(admissionOf("amy").family).toBe("bare-persona")
    expect(admissionOf("alan").family).toBe("person")
    expect(admissionOf("memory-repo-worker").family).toBe("composed-identity")
  })

  test("an empty name is refused rather than admitted by a family that takes anything", () => {
    expect(admissionOf("").admitted).toBe(false)
  })

  test("a payload that is not an object is refused", () => {
    expect(() => admitsPayload(null, root)).toThrow(BadPayload)
    expect(() => admitsPayload("names", root)).toThrow(BadPayload)
  })

  test("`names` missing or not an array is refused", () => {
    expect(() => admitsPayload({}, root)).toThrow(BadPayload)
    expect(() => admitsPayload({ names: "amy" }, root)).toThrow(BadPayload)
  })

  test("a non-string entry is refused, and the refusal names which one", () => {
    expect(() => admitsPayload({ names: ["amy", null] }, root)).toThrow(/names\[1\]/)
  })
})
