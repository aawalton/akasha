import { afterEach, beforeEach, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { fire } from "./hook-shell.ts"

const SEAT = "forward-turn-test-seat"

const AGENT = "019fa471-82e6-7808-93fa-30a33698aaaa"

const RECORDER = "forward-turn-test-recorder"

const DEADLINE_MS = 1_500

let home = ""
let root = ""
let akasha = ""

function seatPage(forwardsTo: string | null): void {
  writeFileSync(
    `${akasha}/agent/seat/${SEAT}.seat.md`,
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      `title: "${SEAT}"`,
      ...(forwardsTo === null ? [] : [`forwards-turns-to: ${forwardsTo}`]),
      "---",
      "",
    ].join("\n")
  )
}

beforeEach(() => {
  home = mkdtempSync("/var/tmp/forward-turn-home-")
  root = mkdtempSync("/var/tmp/forward-turn-root-")
  akasha = `${home}/repos/akasha`
  mkdirSync(`${home}/bin`, { recursive: true })
  mkdirSync(`${akasha}/agent/seat`, { recursive: true })
  seatPage(null)
  writeFileSync(
    `${home}/bin/bun`,
    `#!/bin/sh\nprintf '%s\\n' "$*" >> ${home}/called\n` +
      `for a in "$@"; do case "$a" in /var/tmp/forward-turn-body-*) cp "$a" ${home}/body 2>/dev/null;; esac; done\n` +
      `printf 'probe-message-id\\t${RECORDER}\\tpending\\tlive\\n'\n`,
    { mode: 0o755 }
  )
  writeFileSync(
    `${home}/bin/curl`,
    `#!/bin/sh\nmode=get\nbody=""\nprev=""\n` +
      `for a in "$@"; do\n` +
      `  if [ "$prev" = "-d" ]; then body="$a"; fi\n` +
      `  if [ "$a" = "POST" ]; then mode=post; fi\n` +
      `  prev="$a"\n` +
      `done\n` +
      `if [ "$mode" = "post" ]; then\n` +
      `  printf '%s' "$body" | sed 's/.*"forwarded-turn-uuid":"\\([^"]*\\)".*/\\1/' > ${home}/forwarded\n` +
      `else\n` +
      `  held=""\n` +
      `  if [ -f ${home}/forwarded ]; then held=$(cat ${home}/forwarded); fi\n` +
      `  printf '{"values":{"forwarded-turn-uuid":"%s"}}' "$held"\n` +
      `fi\n` +
      `exit 0\n`,
    { mode: 0o755 }
  )
})

afterEach(() => {
  rmSync(home, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

function forwardingIsOn(): void {
  seatPage(RECORDER)
}

function transcript(entries: readonly Record<string, unknown>[]): string {
  const path = `${root}/transcript.jsonl`
  writeFileSync(path, entries.map((entry) => JSON.stringify(entry)).join("\n"))
  return path
}

function replied(...content: readonly Record<string, unknown>[]): Record<string, unknown> {
  return { type: "assistant", message: { content } }
}

function calls(): readonly string[] {
  if (!existsSync(`${home}/called`)) return []
  return readFileSync(`${home}/called`, "utf8")
    .split("\n")
    .filter((line) => line !== "")
}

function stopOver(path: string): void {
  const before = calls().length
  const ran = fire("agent-hook-forward-turn-to-recorder.agent-hook.code.attachment.ts", {
    stdin: { transcript_path: path },
    env: {
      HOME: home,
      AGENT_ID: AGENT,
      AKASHA_ROOT: akasha,
      FORWARD_TURN_LOG_DIR: home,
      PATH: `${home}/bin:${process.env.PATH ?? ""}`,
    },
  })
  expect(ran.exitCode).toBe(0)
  const until = Date.now() + DEADLINE_MS
  while (Date.now() < until && calls().length === before) Bun.sleepSync(25)
  if (calls().length !== before) Bun.sleepSync(200)
}

function sent(): { readonly call: string; readonly body: string } | null {
  if (calls().length === 0) return null
  return {
    call: calls().join("\n"),
    body: existsSync(`${home}/body`) ? readFileSync(`${home}/body`, "utf8") : "",
  }
}

test("Alan's words and the reply he saw reach the recorder verbatim", () => {
  forwardingIsOn()
  stopOver(
    transcript([
      { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "Tell me about the table." } },
      replied({ type: "text", text: "Somebody mended it twice." }),
    ])
  )
  const delivered = sent()
  expect(delivered).not.toBeNull()
  expect(delivered?.call).toContain(`seat send ${RECORDER}`)
  expect(delivered?.body).toContain("Tell me about the table.")
  expect(delivered?.body).toContain("Somebody mended it twice.")
})

test("thinking and tool calls are not part of the reply he saw", () => {
  forwardingIsOn()
  stopOver(
    transcript([
      { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "And the command?" } },
      replied(
        { type: "thinking", thinking: "reasoning Alan never saw" },
        { type: "text", text: "You took its weight in your palm." },
        { type: "tool_use", name: "Read", input: { file_path: "/etc/passwd" } }
      ),
    ])
  )
  expect(sent()?.body).toContain("You took its weight in your palm.")
  expect(sent()?.body).not.toContain("reasoning Alan never saw")
  expect(sent()?.body).not.toContain("/etc/passwd")
})

test("no class but the principal is taken for the principal", () => {
  forwardingIsOn()
  stopOver(
    transcript([
      { type: "user", uuid: "u1", message: { content: [{ type: "tool_result", content: "refused: the gate said no" }] } },
      {
        type: "user",
        uuid: "u2",
        origin: { kind: "task-notification" },
        message: { content: "<task-notification>FINISHED worker-17366</task-notification>" },
      },
      {
        type: "user",
        uuid: "u3",
        origin: { kind: "channel" },
        isMeta: true,
        message: { content: '<channel source="messages">a message from another seat</channel>' },
      },
      { type: "user", uuid: "u4", message: { content: "<command-name>/compact</command-name>" } },
      { type: "user", uuid: "u5", message: { content: "<local-command-stdout>Compacted</local-command-stdout>" } },
      replied({ type: "text", text: "Picking up where I left off." }),
    ])
  )
  expect(sent()).toBeNull()
})

test("one turn is forwarded once, however many stops follow it", () => {
  forwardingIsOn()
  const path = transcript([
    { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "What is under it?" } },
    replied({ type: "text", text: "Something nearer to this." }),
  ])
  stopOver(path)
  stopOver(path)
  expect(calls()).toHaveLength(1)
})

test("the turn it forwarded is the one the seat goes on stating, so a restart repeats nothing", () => {
  forwardingIsOn()
  stopOver(
    transcript([
      { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "What did you keep?" } },
      replied({ type: "text", text: "The one I sent." }),
    ])
  )
  expect(readFileSync(`${home}/forwarded`, "utf8").trim()).toBe("u1")
})

test("the reachability the send recorded is kept, so a dead recorder is legible", () => {
  forwardingIsOn()
  stopOver(
    transcript([
      { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "Are you still there?" } },
      replied({ type: "text", text: "I am." }),
    ])
  )
  const log = readFileSync(`${home}/forward-turn-${SEAT}.log`, "utf8")
  expect(log).toContain("live")
  expect(log).toContain("u1")
})

test("a seat stating no recipient reads no transcript and calls nothing", () => {
  stopOver(
    transcript([
      { type: "user", uuid: "u1", origin: { kind: "human" }, message: { content: "Anything at all." } },
      replied({ type: "text", text: "A reply." }),
    ])
  )
  expect(sent()).toBeNull()
  expect(existsSync(`${home}/forward-turn-${SEAT}.log`)).toBe(false)
})
