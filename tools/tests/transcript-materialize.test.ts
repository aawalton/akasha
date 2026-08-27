
import { describe, expect, it } from "bun:test"
import {
  decideResumeSource,
  transcriptRecordCount,
} from "../lib/transcript-materialize.ts"

const SESSION = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"
const FOREIGN = "11111111-2222-4333-8444-555555555555"

function record(sessionId: string, seq: number): string {
  return JSON.stringify({ sessionId, type: "user", seq })
}

describe("transcriptRecordCount — how much of one session a copy carries", () => {
  it("counts the records carrying the session asked for and leaves a foreign one out", () => {
    const text = [record(SESSION, 1), record(FOREIGN, 2), record(SESSION, 3)].join("\n")
    expect(transcriptRecordCount(text, SESSION)).toBe(2)
  })

  it("a copy carrying none of the session counts zero, which is how absence reads", () => {
    const text = [record(FOREIGN, 1), record(FOREIGN, 2)].join("\n")
    expect(transcriptRecordCount(text, SESSION)).toBe(0)
  })

  it("a blank line and a line that is not json are skipped rather than counted", () => {
    const text = ["", record(SESSION, 1), "not json at all", "   ", record(SESSION, 2)].join("\n")
    expect(transcriptRecordCount(text, SESSION)).toBe(2)
  })

  it("a line carrying no session id at all is skipped", () => {
    const text = [JSON.stringify({ type: "summary" }), record(SESSION, 1)].join("\n")
    expect(transcriptRecordCount(text, SESSION)).toBe(1)
  })
})

describe("decideResumeSource — the more complete copy is the one hydrated", () => {
  it("a stored copy carrying more of the session is written over the local one", () => {
    expect(decideResumeSource({ localRecords: 3, remoteRecords: 9 })).toBe("write-remote")
  })

  it("a local copy carrying more of the session stands, so a shorter store cannot clobber it", () => {
    expect(decideResumeSource({ localRecords: 9, remoteRecords: 3 })).toBe("keep-local")
  })

  it("two copies carrying the same count keep the local one, so an equal fetch rewrites nothing", () => {
    expect(decideResumeSource({ localRecords: 5, remoteRecords: 5 })).toBe("keep-local")
  })

  it("no local copy and a stored one carrying the session hydrates from the store", () => {
    expect(decideResumeSource({ localRecords: 0, remoteRecords: 4 })).toBe("write-remote")
  })

  it("neither copy carrying the session fails rather than resuming into empty context", () => {
    expect(decideResumeSource({ localRecords: 0, remoteRecords: 0 })).toBe("fail")
  })
})
