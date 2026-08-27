
import { describe, expect, test } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { parseArgs } from "../lib/supervisor-args.ts"

function agrees(name: string, standing: unknown, got: unknown): void {
  expect(hold(name, standing, decided("ported", { value: got, notice: null })).matches).toBe(true)
}

const AGENT = "11111111-2222-3333-4444-555555555555"
const SESSION = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"

const DEFAULTS = {
  prompt: "",
  resume: false,
  account: "",
  sessionId: undefined,
  agentId: undefined,
  headless: false,
}

const WHOLE: ReadonlyArray<{ name: string; argv: string[]; standing: object }> = [
  { name: "c — no flags, no positional", argv: [], standing: { ...DEFAULTS } },
  { name: "cc — -r flag (resume)", argv: ["-r"], standing: { ...DEFAULTS, resume: true } },
  { name: "cc — --resume long flag", argv: ["--resume"], standing: { ...DEFAULTS, resume: true } },
  { name: "c1 — -a aawalton", argv: ["-a", "aawalton"], standing: { ...DEFAULTS, account: "aawalton" } },
  { name: "c2 — -a alanwalton", argv: ["-a", "alanwalton"], standing: { ...DEFAULTS, account: "alanwalton" } },
  { name: "c3 — -a audhdalan", argv: ["-a", "audhdalan"], standing: { ...DEFAULTS, account: "audhdalan" } },
  { name: "c4 — -a tempereso", argv: ["-a", "tempereso"], standing: { ...DEFAULTS, account: "tempereso" } },
  { name: "--account long flag", argv: ["--account", "aawalton"], standing: { ...DEFAULTS, account: "aawalton" } },
  {
    name: "--headless (value-less) sets headless true and is not consumed as prompt",
    argv: ["--headless", "-a", "aawalton", "/p", "do", "thing"],
    standing: { ...DEFAULTS, prompt: "/p do thing", account: "aawalton", headless: true },
  },
  {
    name: "cr — -r --session-id UUID (resume with session)",
    argv: ["-r", "--session-id", "550e8400-e29b-41d4-a716-446655440000"],
    standing: { ...DEFAULTS, resume: true, sessionId: "550e8400-e29b-41d4-a716-446655440000" },
  },
  {
    name: "--agent-id UUID captures identity for re-exec reattach",
    argv: ["--agent-id", AGENT],
    standing: { ...DEFAULTS, agentId: AGENT },
  },
  {
    name: "self-heal re-exec combo — --agent-id + --session-id + --resume",
    argv: ["--agent-id", AGENT, "--session-id", SESSION, "--resume"],
    standing: { ...DEFAULTS, resume: true, sessionId: SESSION, agentId: AGENT },
  },
  { name: "extra args become prompt", argv: ["/p", "7458"], standing: { ...DEFAULTS, prompt: "/p 7458" } },
  {
    name: "--exit-after-iterations coexists with other flags — flag in middle",
    argv: ["--account", "aawalton", "--exit-after-iterations", "5", "--agent-id", AGENT, "--session-id", SESSION],
    standing: { ...DEFAULTS, account: "aawalton", sessionId: SESSION, agentId: AGENT, exitAfterIterations: 5 },
  },
]

describe("parseArgs — the whole result, held against what the code repository asserts", () => {
  for (const one of WHOLE) {
    test(one.name, () => {
      agrees(one.name, one.standing, parseArgs(one.argv))
    })
  }
})

describe("parseArgs — the cases that asserted named fields alone", () => {
  test("prompt is joined with spaces", () => {
    agrees("prompt joined", { prompt: "do something useful" }, { prompt: parseArgs(["do", "something", "useful"]).prompt })
  })

  test("unknown flags stop flag parsing and become prompt", () => {
    agrees("unknown flags", { prompt: "--unknown rest" }, { prompt: parseArgs(["--unknown", "rest"]).prompt })
  })

  test("--model captures modelOverride and is not consumed as prompt", () => {
    const model = "hf.co/TheDrummer/Cydonia-24B-v4.1-GGUF:Q4_K_M"
    const got = parseArgs(["--model", model])
    agrees("--model", { modelOverride: model, prompt: "" }, { modelOverride: got.modelOverride, prompt: got.prompt })
  })

  test("--anthropic-base-url captures anthropicBaseUrl and is not consumed as prompt", () => {
    const got = parseArgs(["--anthropic-base-url", "http://100.64.0.2:11434/"])
    agrees(
      "--anthropic-base-url",
      { anthropicBaseUrl: "http://100.64.0.2:11434/", prompt: "" },
      { anthropicBaseUrl: got.anthropicBaseUrl, prompt: got.prompt }
    )
  })

  test("--anthropic-auth-token captures anthropicAuthToken and is not consumed as prompt", () => {
    const got = parseArgs(["--anthropic-auth-token", "ollama"])
    agrees(
      "--anthropic-auth-token",
      { anthropicAuthToken: "ollama", prompt: "" },
      { anthropicAuthToken: got.anthropicAuthToken, prompt: got.prompt }
    )
  })

  test("full dragon-spawn shape — override flags + headless + account + prompt", () => {
    const got = parseArgs([
      "--headless",
      "-a",
      "aawalton",
      "--anthropic-base-url",
      "http://100.64.0.2:11434/",
      "--model",
      "hf.co/TheDrummer/Cydonia-24B-v4.1-GGUF:Q4_K_M",
      "--anthropic-auth-token",
      "ollama",
      "/p",
      "roleplay",
    ])
    agrees(
      "dragon-spawn shape",
      {
        prompt: "/p roleplay",
        account: "aawalton",
        headless: true,
        anthropicBaseUrl: "http://100.64.0.2:11434/",
        modelOverride: "hf.co/TheDrummer/Cydonia-24B-v4.1-GGUF:Q4_K_M",
        anthropicAuthToken: "ollama",
      },
      {
        prompt: got.prompt,
        account: got.account,
        headless: got.headless,
        anthropicBaseUrl: got.anthropicBaseUrl,
        modelOverride: got.modelOverride,
        anthropicAuthToken: got.anthropicAuthToken,
      }
    )
  })

  test("does not mutate input array", () => {
    const input = ["-r", "prompt"]
    parseArgs(input)
    agrees("no mutation", ["-r", "prompt"], input)
  })
})

describe("parseArgs --exit-after-iterations", () => {
  test("parses positive integer", () => {
    agrees(
      "exit-after positive integer",
      { exitAfterIterations: 3 },
      { exitAfterIterations: parseArgs(["--exit-after-iterations", "3"]).exitAfterIterations }
    )
  })

  for (const shown of ["0", "abc", "-1"]) {
    test(`rejects ${shown} as non-positive-integer`, () => {
      let threw = false
      let message = ""
      try {
        parseArgs(["--exit-after-iterations", shown])
      } catch (error) {
        threw = true
        message = error instanceof Error ? error.message : String(error)
      }
      agrees(
        `exit-after refuses ${shown}`,
        { threw: true, message: `--exit-after-iterations: expected positive integer, got "${shown}"` },
        { threw, message }
      )
    })
  }

  test("coexists with other flags — flag last", () => {
    const got = parseArgs([
      "--agent-id",
      AGENT,
      "--account",
      "aawalton",
      "--session-id",
      SESSION,
      "--exit-after-iterations",
      "2",
    ])
    agrees(
      "exit-after flag last",
      { exitAfterIterations: 2, account: "aawalton", agentId: AGENT, sessionId: SESSION },
      {
        exitAfterIterations: got.exitAfterIterations,
        account: got.account,
        agentId: got.agentId,
        sessionId: got.sessionId,
      }
    )
  })
})
