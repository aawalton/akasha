
import { expect, it } from "bun:test"
import { digestOf, hold } from "../lib/digest-harness.ts"
import {
  askSupervisorDecide,
  SUPERVISOR_DECIDE_CEILING_MS,
  SUPERVISOR_DECIDE_COMMAND,
} from "../lib/supervisor-limit-resume-effects.ts"

const PAYLOADS: Readonly<Record<string, string>> = {
  "one seat, headless": JSON.stringify({
    remoteControl: [{ seat: "astra", question: { headless: true } }],
  }),
  "two seats, one headless": JSON.stringify({
    remoteControl: [
      { seat: "astra", question: { headless: true } },
      { seat: "amy", question: { headless: false } },
    ],
  }),
  "no seats": JSON.stringify({ remoteControl: [] }),
  "stray key": JSON.stringify({ remoteContro1: [] }),
  "empty payload": JSON.stringify({}),
  "not JSON": "this is not json",
}

const STANDING: Readonly<Record<string, unknown>> = {
  "one seat, headless": {
    outcome: "answered",
    answer: { remoteControl: [{ seat: "astra", remoteControl: false }] },
  },
  "two seats, one headless": {
    outcome: "answered",
    answer: {
      remoteControl: [
        { seat: "astra", remoteControl: false },
        { seat: "amy", remoteControl: true },
      ],
    },
  },
  "no seats": { outcome: "answered", answer: { remoteControl: [] } },
  "stray key": { outcome: "threw", callerSurvived: true, namesExit1: true },
  "empty payload": { outcome: "threw", callerSurvived: true, namesExit1: true },
  "not JSON": { outcome: "threw", callerSurvived: true, namesExit1: true },
}

async function ported(stdin: string): Promise<Record<string, unknown>> {
  try {
    return { outcome: "answered", answer: await askSupervisorDecide(stdin) }
  } catch (error) {
    return { outcome: "threw", callerSurvived: true, namesExit1: /exited 1/.test(String(error)) }
  }
}

for (const [name, stdin] of Object.entries(PAYLOADS)) {
  it(`answers over the wire as it stands: ${name}`, async () => {
    const verdict = hold(name, STANDING[name], await ported(stdin))
    expect(verdict).toMatchObject({ matches: true })
  })
}

it("carries both of the source's postures unchanged", () => {
  expect(SUPERVISOR_DECIDE_COMMAND).toBe("supervisor-decide")
  expect(SUPERVISOR_DECIDE_CEILING_MS).toBe(5_000)
})

it("would go red if the two sides disagreed", () => {
  const answered = STANDING["one seat, headless"]
  const other = {
    outcome: "answered",
    answer: { remoteControl: [{ seat: "astra", remoteControl: true }] },
  }
  expect(digestOf(answered)).not.toBe(digestOf(other))
  expect(hold("control", answered, other).matches).toBe(false)
})

it("dies in the caller's own process when the wire is deleted", async () => {
  const probe =
    'const m = await import("./tools/supervisor-decide.ts");' +
    'try { m.answer({ remoteContro1: [] }) } catch { console.log("SURVIVED-CATCH") }' +
    'console.log("SURVIVED-END")'
  const child = Bun.spawn({
    cmd: [process.execPath, "-e", probe],
    cwd: new URL("../..", import.meta.url).pathname,
    stdout: "pipe",
    stderr: "pipe",
  })
  const [out, code] = await Promise.all([new Response(child.stdout).text(), child.exited])
  expect(code).toBe(1)
  expect(out).not.toContain("SURVIVED-CATCH")
  expect(out).not.toContain("SURVIVED-END")
})
