
import { describe, expect, it } from "bun:test"
import { decideReviveIoVerify, lastAdvancementMs } from "../lib/decide-revive-io-verify.ts"
import { decideReviveLaunch } from "../lib/decide-revive-launch.ts"

const SESSION = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"

describe("decideReviveLaunch", () => {
  it("no bound session plans a cold start seeded by the boot prompt", () => {
    expect(decideReviveLaunch({ sessionId: null, bootPrompt: "/handler amy" })).toEqual({
      materializeTranscript: false,
      resumeSessionId: undefined,
      prompt: "/handler amy",
      status: "spawned",
    })
  })

  it("a caller's own prompt outranks the boot prompt on a cold start", () => {
    expect(
      decideReviveLaunch({ sessionId: null, prompt: "read your row", bootPrompt: "/handler amy" })
        .prompt
    ).toBe("read your row")
  })

  it("a cold start with neither prompt drives nothing", () => {
    expect(decideReviveLaunch({ sessionId: null }).prompt).toBe("")
  })

  it("a bound session plans a resume that materializes the transcript", () => {
    expect(decideReviveLaunch({ sessionId: SESSION })).toEqual({
      materializeTranscript: true,
      resumeSessionId: SESSION,
      prompt: "",
      status: "revived",
    })
  })

  it("the boot prompt never drives a resume, so an absent seat is not revived into a turn", () => {
    expect(decideReviveLaunch({ sessionId: SESSION, bootPrompt: "/handler amy" }).prompt).toBe("")
  })

  it("a caller's prompt does drive a resume", () => {
    expect(decideReviveLaunch({ sessionId: SESSION, prompt: "work came back" }).prompt).toBe(
      "work came back"
    )
  })
})

describe("decideReviveIoVerify", () => {
  it("no signal at all reads as wedged rather than as recovered", () => {
    expect(
      decideReviveIoVerify({
        transcriptMtimeMs: null,
        ownedRowUpdatedAtMs: null,
        reviveAtMs: 1_000,
      })
    ).toBe("wedged")
  })

  it("a signal that has not moved past the revive baseline is wedged", () => {
    expect(
      decideReviveIoVerify({
        transcriptMtimeMs: 900,
        ownedRowUpdatedAtMs: null,
        reviveAtMs: 1_000,
      })
    ).toBe("wedged")
  })

  it("advancement in either signal is enough to read as recovered", () => {
    expect(
      decideReviveIoVerify({
        transcriptMtimeMs: 900,
        ownedRowUpdatedAtMs: 1_100,
        reviveAtMs: 1_000,
      })
    ).toBe("advancing")
  })

  it("lastAdvancementMs takes the newest signal and answers nothing where there is none", () => {
    expect(lastAdvancementMs(null, 5, 3)).toBe(5)
    expect(lastAdvancementMs(null, null)).toBeNull()
  })
})
