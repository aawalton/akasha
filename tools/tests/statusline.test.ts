
import { afterEach, expect, test } from "bun:test"
import {
  assistantLine,
  DEATH_LINE,
  liveProcKey,
  OTHER_AGENT_ID,
  runStatusline,
  sandbox,
  SELF_AGENT_ID,
  teardown,
  writeChildSeat,
  writeNamedSeatPage,
  writeTranscript,
} from "./statusline-drive.ts"
import { resolve } from "node:path"

afterEach(teardown, 10_000)

test("prepends [0] when this session has no spawned headless children", () => {
  const { home } = sandbox()

  expect(runStatusline(home, "11111111-1111-1111-1111-111111111111", SELF_AGENT_ID).trim()).toBe(
    "[0]"
  )
})

test("renders the count alone when the payload carries no session id", () => {
  const { home } = sandbox()

  expect(runStatusline(home, null, SELF_AGENT_ID).trim()).toBe("[0]")
})

test("counts only the seats present that name this seat as their principal", () => {
  const { home } = sandbox()
  const sid = "22222222-2222-2222-2222-222222222222"

  writeNamedSeatPage(home, "mine", SELF_AGENT_ID, [])
  writeNamedSeatPage(home, "theirs", OTHER_AGENT_ID, [])
  writeChildSeat(home, "worker-a", "mine", liveProcKey())
  writeChildSeat(home, "worker-b", "mine", liveProcKey())
  writeChildSeat(home, "another-seats-child", "theirs", liveProcKey())
  writeChildSeat(home, "gone-child", "mine", "2147483646-1")
  writeChildSeat(home, "rootless", null, liveProcKey())

  expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe("[2]")
})

test("does not count a child whose pid was handed to a process started after it", () => {
  const { home } = sandbox()
  const sid = "cccccccc-1111-2222-3333-444444444444"
  const [pid] = liveProcKey().split("-")

  writeNamedSeatPage(home, "mine", SELF_AGENT_ID, [])
  writeChildSeat(home, "recycled", "mine", `${pid}-1`)

  expect(runStatusline(home, sid, SELF_AGENT_ID).trim()).toBe("[0]")
})

test("counts 0 when AGENT_ID is unset even if seats present name a principal", () => {
  const { home } = sandbox()

  writeNamedSeatPage(home, "mine", SELF_AGENT_ID, [])
  writeChildSeat(home, "worker-a", "mine", liveProcKey())

  expect(runStatusline(home, "33333333-3333-3333-3333-333333333333", null).trim()).toBe("[0]")
})

test("renders the served model token after the count", () => {
  const { home } = sandbox()
  const tp = writeTranscript(home, [assistantLine("claude-zephyr-4-8")])

  expect(
    runStatusline(home, "44444444-4444-4444-4444-444444444444", SELF_AGENT_ID, tp).trim()
  ).toBe("[0] zephyr")
})

test("suffixes the extended-context [1m] flag onto the model token", () => {
  const { home } = sandbox()
  const tp = writeTranscript(home, [assistantLine("claude-quartz-5[1m]")])

  expect(
    runStatusline(home, "55555555-5555-5555-5555-555555555555", SELF_AGENT_ID, tp).trim()
  ).toBe("[0] quartz[1m]")
})

test("uses the LAST served model, a mid-session fallback having changed it", () => {
  const { home } = sandbox()
  const tp = writeTranscript(home, [
    assistantLine("claude-quartz-5"),
    assistantLine("claude-zephyr-4-8"),
  ])

  expect(
    runStatusline(home, "66666666-6666-6666-6666-666666666666", SELF_AGENT_ID, tp).trim()
  ).toBe("[0] zephyr")
})

test("skips a terminal <synthetic> death line, surfacing the prior served model", () => {
  const { home } = sandbox()
  const tp = writeTranscript(home, [assistantLine("claude-zephyr-4-8"), DEATH_LINE])

  expect(
    runStatusline(home, "77777777-7777-7777-7777-777777777777", SELF_AGENT_ID, tp).trim()
  ).toBe("[0] zephyr")
})

test("fails open to the bare form when transcript_path is absent", () => {
  const { home } = sandbox()
  const sid = "88888888-8888-8888-8888-888888888888"

  const out = runStatusline(home, sid, SELF_AGENT_ID)

  expect(out.trim()).toBe("[0]")
  expect(out).not.toContain(sid)
})

test("fails open to the bare form when the transcript file is missing", () => {
  const { home } = sandbox()
  const sid = "99999999-9999-9999-9999-999999999999"

  const out = runStatusline(home, sid, SELF_AGENT_ID, resolve(home, "nope.jsonl"))

  expect(out.trim()).toBe("[0]")
  expect(out).not.toContain(sid)
})

test("renders a logical name it has never heard of, the transform being structural", () => {
  const { home } = sandbox()
  const sid = "aaaaaaaa-1111-2222-3333-444444444444"

  for (const [wire, logical] of [
    ["claude-zephyr-4-8", "zephyr"],
    ["claude-quartz-5", "quartz"],
    ["claude-obsidian-12-3", "obsidian"],
    ["claude-obsidian-12-3[1m]", "obsidian[1m]"],
  ] as const) {
    const tp = writeTranscript(home, [assistantLine(wire)])
    expect(runStatusline(home, sid, SELF_AGENT_ID, tp).trim()).toBe(`[0] ${logical}`)
  }
})

test("renders the compact token count after the model token", () => {
  const { home } = sandbox()
  const tp = writeTranscript(home, [assistantLine("claude-zephyr-4-8")])

  const out = runStatusline(home, "bbbbbbbb-1111-2222-3333-444444444444", SELF_AGENT_ID, tp, {
    total_input_tokens: 164_000,
  })

  expect(out.trim()).toBe("[0] zephyr 164k")
})

test("renders the raw token count below 1000, with no model present", () => {
  const { home } = sandbox()

  const out = runStatusline(home, "bbbbbbbb-2222-3333-4444-555555555555", SELF_AGENT_ID, null, {
    total_input_tokens: 512,
  })

  expect(out.trim()).toBe("[0] 512")
})

test("rounds the token count to the nearest k", () => {
  const { home } = sandbox()

  const out = runStatusline(home, "bbbbbbbb-3333-4444-5555-666666666666", SELF_AGENT_ID, null, {
    total_input_tokens: 164_500,
  })

  expect(out.trim()).toBe("[0] 165k")
})

test("renders the m form at or above one million tokens", () => {
  const { home } = sandbox()

  const out = runStatusline(home, "bbbbbbbb-4444-5555-6666-777777777777", SELF_AGENT_ID, null, {
    total_input_tokens: 1_234_567,
  })

  expect(out.trim()).toBe("[0] 1.2m")
})

test("fails open (omits the token) when context_window is absent", () => {
  const { home } = sandbox()
  const sid = "bbbbbbbb-5555-6666-7777-888888888888"

  const out = runStatusline(home, sid, SELF_AGENT_ID)

  expect(out.trim()).toBe("[0]")
  expect(out).not.toContain(sid)
})

test("fails open (omits the token) when total_input_tokens is missing or non-numeric", () => {
  const { home } = sandbox()
  const sid = "bbbbbbbb-6666-7777-8888-999999999999"

  const missingKey = runStatusline(home, sid, SELF_AGENT_ID, null, {})
  expect(missingKey.trim()).toBe("[0]")
  expect(missingKey).not.toContain(sid)

  const nonNumeric = runStatusline(home, sid, SELF_AGENT_ID, null, {
    total_input_tokens: "lots",
  })
  expect(nonNumeric.trim()).toBe("[0]")
  expect(nonNumeric).not.toContain(sid)
})
