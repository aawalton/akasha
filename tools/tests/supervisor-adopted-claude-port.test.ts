
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { parseProxyPortFromBaseUrl } from "../lib/supervisor-adopted-claude-port.ts"

interface Case {
  readonly name: string
  readonly inputs: readonly (string | undefined)[]
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "parses the supervisor's canonical proxy URL shape",
    inputs: ["http://localhost:44395/"],
    standing: { ports: [44395] },
  },
  {
    name: "accepts the URL without a trailing slash",
    inputs: ["http://localhost:33605"],
    standing: { ports: [33605] },
  },
  {
    name: "accepts 127.0.0.1",
    inputs: ["http://127.0.0.1:8080/"],
    standing: { ports: [8080] },
  },
  {
    name: "rejects non-loopback hosts — a #13130 custom base URL is not a bind target",
    inputs: ["http://100.64.0.2:11434/", "https://api.anthropic.com/"],
    standing: { ports: [null, null] },
  },
  {
    name: "rejects a loopback URL with no explicit port",
    inputs: ["http://localhost/"],
    standing: { ports: [null] },
  },
  {
    name: "rejects garbage, empty, and undefined input",
    inputs: ["not a url", "", undefined],
    standing: { ports: [null, null, null] },
  },
  {
    name: "rejects an out-of-range port",
    inputs: ["http://localhost:0/"],
    standing: { ports: [null] },
  },
]

function run(one: Case): Record<string, unknown> {
  return { ports: one.inputs.map((input) => parseProxyPortFromBaseUrl(input)) }
}

function projected(answered: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answered[key]
  return picked
}

describe("parseProxyPortFromBaseUrl, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, () => {
      const answered = decided("ported", { value: run(one), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("answers one port per input, so no input in any case goes unasserted", () => {
    let inputs = 0
    let asserted = 0
    for (const one of CASES) {
      expect(Object.keys(one.standing).length).toBeGreaterThan(0)
      inputs += one.inputs.length
      asserted += (one.standing.ports as readonly unknown[]).length
    }
    expect(asserted).toBe(inputs)
  })
})
