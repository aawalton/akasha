
import { existsSync, readFileSync } from "node:fs"
import { rmSync } from "node:fs"
import { resolve } from "node:path"
import { afterEach, expect, test } from "bun:test"
import {
  assistantLine,
  SLOTS,
  type Slot,
  runStatusline,
  sandbox,
  seatsDir,
  SELF_AGENT_ID,
  teardown,
  writeSeatPage,
  writeAttributes,
  writeTranscript,
} from "./statusline-drive.ts"

afterEach(teardown, 10_000)

test("renders the four stated slots after the token count", () => {
  const { home } = sandbox()
  const sid = "cccccccc-1111-2222-3333-444444444444"
  const tp = writeTranscript(home, [assistantLine("claude-zephyr-4-8")])
  writeAttributes(home, SELF_AGENT_ID, {
    persona: "claude",
    domain: "persona",
    role: "worker",
    task: "define-project",
  })

  const out = runStatusline(home, sid, SELF_AGENT_ID, tp, { total_input_tokens: 164_000 })

  expect(out.trim()).toBe("[0] zephyr 164k claude persona worker define-project")
  expect(out).not.toContain(sid)
})

test("renders in the script's order, not the order the page happens to hold", () => {
  const { home } = sandbox()
  writeSeatPage(home, SELF_AGENT_ID, [
    "start-mode: headless",
    "role-slug: worker",
    "persona-slug: claude",
    "domain-slug: agent-harness",
    "task-slug: build-change",
  ])

  const out = runStatusline(home, "cccccccc-8888-9999-aaaa-bbbbbbbbbbbb", SELF_AGENT_ID)

  expect(out.trim()).toBe("[0] claude agent-harness worker build-change")
})

test("omits the token for each slot the seat page does not carry", () => {
  const { home } = sandbox()
  const sid = "cccccccc-2222-3333-4444-555555555555"
  const full: Record<Slot, string> = {
    persona: "claude",
    domain: "persona",
    role: "worker",
    task: "define-project",
  }

  for (const absent of SLOTS) {
    const slugs: Partial<Record<Slot, string>> = { ...full }
    delete slugs[absent]
    writeAttributes(home, SELF_AGENT_ID, slugs)

    const expected = SLOTS.filter((slot) => slot !== absent)
      .map((slot) => full[slot])
      .join(" ")
    expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe(`[0] ${expected}`)
  }
})

test("omits the attribute group entirely when no slot is stated", () => {
  const { home } = sandbox()
  const sid = "cccccccc-3333-4444-5555-666666666666"

  writeAttributes(home, SELF_AGENT_ID, {})
  expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe("[0]")

  rmSync(seatsDir(home), { recursive: true, force: true })
  expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe("[0]")
})

test("falls back to the payload session id when AGENT_ID is unset", () => {
  const { home } = sandbox()
  const sid = "cccccccc-4444-5555-6666-777777777777"
  writeAttributes(home, sid, { persona: "ryn", domain: "persona", role: "lead", task: "change-instructions" })

  expect(runStatusline(home, sid, null).trim()).toBe("[0] ryn persona lead change-instructions")
})

test("prefers the seat the AGENT_ID names over the one the session id names", () => {
  const { home } = sandbox()
  const sid = "cccccccc-5555-6666-7777-888888888888"
  writeAttributes(home, SELF_AGENT_ID, {
    persona: "claude",
    domain: "persona",
    role: "worker",
    task: "build-change",
  })
  writeAttributes(home, sid, { persona: "ryn", domain: "persona", role: "lead", task: "change-instructions" })

  expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe("[0] claude persona worker build-change")
})

test("keeps what the client reported as observations beside the seat", () => {
  const { home } = sandbox()
  const sid = "cccccccc-7777-8888-9999-aaaaaaaaaaaa"
  writeAttributes(home, SELF_AGENT_ID, { persona: "claude" })

  runStatusline(home, sid, SELF_AGENT_ID, null, { total_input_tokens: 1_000 })

  const kept = Bun.YAML.parse(
    readFileSync(resolve(seatsDir(home), `seat-${SELF_AGENT_ID}.seat.uncommitted.yaml`), "utf8")
  ) as Record<string, { value: string }>
  expect(kept.model?.value).toBe("claude")
  expect(kept["context-tokens"]?.value).toBe("1000")
  expect(Object.hasOwn(kept, "cost-usd")).toBe(false)
})

test("writes no session-scoped usage file, the seat holding the reading instead", () => {
  const { home } = sandbox()
  const sid = "cccccccc-7777-8888-9999-bbbbbbbbbbbb"
  writeAttributes(home, SELF_AGENT_ID, { persona: "claude" })

  runStatusline(home, sid, SELF_AGENT_ID, null, { total_input_tokens: 1_000 })

  expect(existsSync(resolve(home, ".claude", `context-usage-${sid}.json`))).toBe(false)
})
