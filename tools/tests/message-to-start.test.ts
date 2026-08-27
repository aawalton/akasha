
import { describe, expect, test } from "bun:test"
import { bootPromptFor, readStartedSeat } from "../lib/message-to-start.ts"
import { SEAT_MODE_HEADLESS } from "../lib/seat-modes.ts"

describe("readStartedSeat", () => {
  test("the started line is found among whatever else was printed before it", () => {
    expect(
      readStartedSeat(
        `[start] a warning line\n01a0-abc\tdalla-code-harness-operator\t${SEAT_MODE_HEADLESS}\n`
      )
    ).toEqual({ id: "01a0-abc", name: "dalla-code-harness-operator" })
  })

  test("it reads the line `ops seat start` prints, however the headless start mode is spelled", () => {
    expect(readStartedSeat(`01a0-abc\tsome-name\t${SEAT_MODE_HEADLESS}`)).toEqual({
      id: "01a0-abc",
      name: "some-name",
    })
  })

  test("a seat this command did not start is never read as one", () => {
    expect(readStartedSeat("01a0-abc\tsome-name\tinteractive\n")).toBeNull()
    expect(readStartedSeat("01a0-abc\tsome-name\trevived\n")).toBeNull()
    expect(readStartedSeat("[start] only a warning\n")).toBeNull()
  })

  test("output carrying no id is answered as none rather than as an empty id", () => {
    expect(readStartedSeat("")).toBeNull()
    expect(readStartedSeat(`\tname\t${SEAT_MODE_HEADLESS}`)).toBeNull()
  })
})

describe("bootPromptFor", () => {
  test("the seat is told both slots it was started on, so neither is inferred", () => {
    const prompt = bootPromptFor("code-harness", "operator")
    expect(prompt).toContain("code-harness")
    expect(prompt).toContain("operator")
  })

  test("the seat is pointed at the mailbox, the message being why it exists", () => {
    expect(bootPromptFor("code-harness", "operator")).toContain("ops seat inbox")
  })
})
