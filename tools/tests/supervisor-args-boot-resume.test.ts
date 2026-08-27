
import { describe, expect, test } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { buildReExecArgv, decideBootResume } from "../lib/supervisor-args.ts"

function agrees(name: string, standing: unknown, got: unknown): void {
  expect(hold(name, standing, decided("ported", { value: got, notice: null })).matches).toBe(true)
}

describe("buildReExecArgv", () => {
  const A = "aaaa1111-2222-3333-4444-555555555555"
  const S = "bbbb6666-7777-8888-9999-000000000000"
  const identity = ["--agent-id", A, "--session-id", S, "--resume"]
  const build = (argv: readonly string[]) => buildReExecArgv({ originalArgv: argv, agentId: A, sessionId: S })

  test("fresh launch — appends identity", () => {
    agrees("fresh launch", [...identity], build([]))
  })

  test("preserves --account and prompt tail — identity precedes prompt", () => {
    agrees(
      "account and prompt tail",
      ["-a", "aawalton", ...identity, "hello", "world"],
      build(["-a", "aawalton", "hello", "world"])
    )
  })

  test("dedupes prior --agent-id / --session-id / --resume across repeat re-exec", () => {
    agrees("dedupe identity", [...identity], build(["--agent-id", "old", "--session-id", "old", "--resume"]))
    agrees("dedupe -r", [...identity, "hello"], build(["-r", "hello"]))
  })

  test("flags only — identity appended after flags", () => {
    agrees("flags only", ["-a", "aawalton", ...identity], build(["-a", "aawalton"]))
  })

  test("preserves --model / --anthropic-base-url / --anthropic-auth-token before identity, prompt after", () => {
    agrees(
      "override flags survive re-exec",
      [
        "-a",
        "aawalton",
        "--anthropic-base-url",
        "http://100.64.0.2:11434/",
        "--model",
        "cydonia",
        "--anthropic-auth-token",
        "ollama",
        ...identity,
        "hello",
      ],
      build([
        "-a",
        "aawalton",
        "--anthropic-base-url",
        "http://100.64.0.2:11434/",
        "--model",
        "cydonia",
        "--anthropic-auth-token",
        "ollama",
        "hello",
      ])
    )
  })

  test("preserves --headless across re-exec, identity before prompt", () => {
    agrees(
      "--headless survives re-exec",
      ["--headless", "-a", "aawalton", ...identity, "hello"],
      build(["--headless", "-a", "aawalton", "hello"])
    )
  })
})

describe("decideBootResume", () => {
  const base = { resume: false, sessionId: undefined, prompt: "", headless: true }

  test("neither flag nor inherited session → no resume, exactly as the prior boolean", () => {
    agrees("no resume", { resume: false }, decideBootResume(base))
    agrees("no resume, prompt ignored", { resume: false }, decideBootResume({ ...base, prompt: "do the thing" }))
  })

  test("an inherited session resumes even without the explicit flag", () => {
    agrees("inherited session", { resume: true }, { resume: decideBootResume({ ...base, sessionId: "s" }).resume })
  })

  test("a prompt positional survives the resume and is the seat's first turn", () => {
    agrees(
      "argv-prompt drives",
      { resume: true, driver: "argv-prompt" },
      decideBootResume({ ...base, resume: true, prompt: "carry on" })
    )
  })

  test("headless with no prompt is the `revive` shape — idle, waiting on its mailbox", () => {
    agrees(
      "awaiting-inbound drives",
      { resume: true, driver: "awaiting-inbound" },
      decideBootResume({ ...base, resume: true })
    )
  })

  test("interactive with no prompt is a live REPL — the human at the keyboard drives it", () => {
    agrees(
      "operator-prompt drives",
      { resume: true, driver: "operator-prompt" },
      decideBootResume({ ...base, resume: true, headless: false })
    )
  })
})
