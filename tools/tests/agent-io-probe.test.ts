import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { readOwnTranscriptTail } from "../lib/agent-io-probe.ts"

const dir = mkdtempSync(join("/var/tmp", "iop-"))
const transcriptPath = join(dir, "session.jsonl")

afterAll(() => {
  rmSync(dir, { recursive: true, force: true })
})

const statedFor = (agentId: string) =>
  agentId === "missing" ? null : { value: transcriptPath }

describe("readOwnTranscriptTail", () => {
  test("a seat stating no transcript → null", () => {
    expect(readOwnTranscriptTail("missing", 65_536, statedFor)).toBeNull()
  })

  test("absent file → null (fail-safe silence)", () => {
    expect(readOwnTranscriptTail("agent", 1024, statedFor)).toBeNull()
    writeFileSync(transcriptPath, "")
  })

  test("small file → whole content", () => {
    writeFileSync(transcriptPath, "line-a\nline-b\n")
    expect(readOwnTranscriptTail("agent", 65_536, statedFor)).toBe("line-a\nline-b\n")
  })

  test("tail bound returns only the final bytes, partial leading line included", () => {
    writeFileSync(transcriptPath, "AAAAAAAAAA\nBBBBBBBBBB\nCCC\n")
    expect(readOwnTranscriptTail("agent", 8, statedFor)).toBe("BBB\nCCC\n")
  })
})
