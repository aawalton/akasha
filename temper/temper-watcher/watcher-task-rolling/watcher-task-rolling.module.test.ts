import { describe, expect, test } from "bun:test"
import { rollVerdicts, tasksThatRoll } from "./watcher-task-rolling.module.code.ts"

const ROSTER = ["c1", "c2", "c3"]

describe("a task of next_character scope", () => {
  test("rolls once the character it falls to has progressed", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "next_character", effectiveCharacterId: "c2" }],
        completed: [],
        progressed: [{ taskId: "t", characterId: "c2" }],
        roster: ROSTER,
      })
    ).toEqual(["t"])
  })

  test("does not roll when another character progressed instead", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "next_character", effectiveCharacterId: "c2" }],
        completed: [],
        progressed: [{ taskId: "t", characterId: "c3" }],
        roster: ROSTER,
      })
    ).toEqual([])
  })

  test("does not roll when the whole roster progressed but the one it falls to did not", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "next_character", effectiveCharacterId: "c1" }],
        completed: [],
        progressed: [
          { taskId: "t", characterId: "c2" },
          { taskId: "t", characterId: "c3" },
        ],
        roster: ROSTER,
      })
    ).toEqual([])
  })

  test("does not roll when it falls to nobody", () => {
    const [one] = rollVerdicts({
      tasks: [{ taskId: "t", scope: "next_character", effectiveCharacterId: undefined }],
      completed: [],
      progressed: [{ taskId: "t", characterId: "c1" }],
      roster: ROSTER,
    })
    expect(one?.rolls).toBe(false)
    expect(one?.why).toBe("the task falls to no character yet")
  })
})

describe("a task of all_characters scope", () => {
  test("rolls once every character has completed it or progressed at it", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "all_characters", effectiveCharacterId: undefined }],
        completed: [{ taskId: "t", characterId: "c1" }],
        progressed: [
          { taskId: "t", characterId: "c2" },
          { taskId: "t", characterId: "c3" },
        ],
        roster: ROSTER,
      })
    ).toEqual(["t"])
  })

  test("does not roll while one character has neither", () => {
    const [one] = rollVerdicts({
      tasks: [{ taskId: "t", scope: "all_characters", effectiveCharacterId: undefined }],
      completed: [{ taskId: "t", characterId: "c1" }],
      progressed: [{ taskId: "t", characterId: "c2" }],
      roster: ROSTER,
    })
    expect(one?.rolls).toBe(false)
    expect(one?.why).toBe("1 of the 3 characters have neither completed nor progressed")
  })

  test("counts a character the game holds no record for as not progressed", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "all_characters", effectiveCharacterId: undefined }],
        completed: [
          { taskId: "t", characterId: "c1" },
          { taskId: "t", characterId: "c2" },
          { taskId: "t", characterId: "c3" },
        ],
        progressed: [],
        roster: [...ROSTER, "c4-never-played"],
      })
    ).toEqual([])
  })

  test("does not roll against an empty roster", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "all_characters", effectiveCharacterId: undefined }],
        completed: [],
        progressed: [],
        roster: [],
      })
    ).toEqual([])
  })
})

describe("a task of another scope", () => {
  test("is not rolled by a character's own progress", () => {
    const [one] = rollVerdicts({
      tasks: [{ taskId: "t", scope: "character", effectiveCharacterId: "c1" }],
      completed: [{ taskId: "t", characterId: "c1" }],
      progressed: [{ taskId: "t", characterId: "c1" }],
      roster: ROSTER,
    })
    expect(one?.rolls).toBe(false)
  })
})

describe("marks for another task", () => {
  test("do not answer for the task being judged", () => {
    expect(
      tasksThatRoll({
        tasks: [{ taskId: "t", scope: "all_characters", effectiveCharacterId: undefined }],
        completed: ROSTER.map((characterId) => ({ taskId: "other", characterId })),
        progressed: [],
        roster: ROSTER,
      })
    ).toEqual([])
  })
})
