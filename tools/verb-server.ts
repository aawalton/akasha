#!/usr/bin/env bun

import { writeSync } from "node:fs"
import { duringOneCall } from "@akasha/command-system/during-call"
import { LEASE_ENV, LEASE_MS, leaseAsked, PROTOCOL, VERBS_SERVED } from "./lib/verb-served.ts"

const HELP = `bun tools/verb-server.ts — answer verbs over a pipe, so a caller pays bun's startup once

A caller in a node process pays ~0.19s of wall and ~0.22s of CPU for every verb it asks
as a fresh bun child, whatever the verb is: that is the runtime starting, not the work,
which is 4–6ms. A panel polling once a second pays it once a second. This holds the
runtime open and answers over pipes instead.

Speaks newline-delimited JSON. It reads asks on stdin and writes answers on **fd 3**,
which the caller opens as a fourth pipe. The protocol has a stream of its own because a
verb writes its answer to stdout, and a stray byte from anything a verb loads would
otherwise land in the middle of a reply and be read as one. Whatever escapes onto stdout
here is the caller's to log and never an answer.

  ask     {"id":1,"verb":"agent-turn-colors","args":["01a0…"]}
  answer  {"id":1,"ok":true,"code":0,"stdout":"…","stderr":"…","ageMs":12,"pid":9}
  refusal {"id":1,"ok":false,"refusal":"lease","saying":"…","ageMs":30001}

The first line on fd 3 is {"hello":${PROTOCOL},"pid":…,"leaseMs":…} and nothing
is asked before it.

WHAT KEEPS AN ANSWER FROM GOING STALE. Nothing here is remembered: every ask re-runs the
verb, so an answer is composed from the files as they stand at the moment it is asked,
which is what a fresh child gave. Each run is wrapped in \`duringOneCall\`, so the
per-call memos akasha keeps are as new as they are in a child that has just started —
a run never sees what the run before it read.

What a held-open runtime cannot make fresh is the code it loaded and the few module-wide
memos beneath it. So this process refuses to live: past its lease it answers nothing,
refuses whatever is asked with \`lease\` and exits, and the caller starts another. That
bounds how old the code behind an answer can be to ${LEASE_MS}ms — \`${LEASE_ENV}\` names
another — for a fifth of a second of CPU each time the lease turns over. An answer also
carries \`ageMs\` and the \`pid\` that composed it, so the caller checks the bound a second
time rather than trusting this end to have kept it.

Every verb runs one at a time. Capturing stdout means replacing it for the length of a
run, and two runs overlapping would read each other's bytes.

Exits when stdin closes, which is what happens when the caller dies, and when its lease
is up.

Verbs: ${VERBS_SERVED.join(", ")}

  --help  This.
`

type Verb = (argv: readonly string[]) => number | Promise<number>

// The verbs answered here, loaded rather than spawned. A verb is in this table only once its
// `main` writes every byte of its answer through `process.stdout.write`, since that is what a run
// captures: one reaching a file descriptor another way would answer short and the caller would
// read broken JSON.
//
// EACH IS LOADED WHEN IT IS FIRST ASKED FOR, NOT AT STARTUP. A verb whose imports throw then
// refuses its own asks and leaves the other three answering, where loading all four up front would
// have one broken verb take every panel dark at once. It also means hello goes out at once, so a
// caller waiting to be told the server is up waits on nothing but the runtime.
const LOAD: Readonly<Record<string, () => Promise<{ readonly main: Verb }>>> = {
  "agent-forest": () => import("./agent-forest.ts"),
  "agent-turn-colors": () => import("./agent-turn-colors.ts"),
  "seat-transcripts": () => import("./seat-transcripts.ts"),
  "work-tree": () => import("./work-tree.ts"),
}

const loaded = new Map<string, Verb>()

async function verbFor(named: string): Promise<Verb | null> {
  const held = loaded.get(named)
  if (held !== undefined) return held
  const load = LOAD[named]
  if (load === undefined) return null
  const verb = (await load()).main
  loaded.set(named, verb)
  return verb
}

const PROTOCOL_FD = 3

const LEASE = leaseAsked()

const STARTED_AT = Date.now()

const GOODBYE_MS = 500

interface Ask {
  readonly id: number
  readonly verb: string
  readonly args: readonly string[]
}

function ageMs(): number {
  return Date.now() - STARTED_AT
}

// A pipe takes what it has room for and says so, so a partial write is ordinary rather than a
// fault. Saying a line means saying all of it: half a line read as a whole one is a broken answer.
function writeAll(fd: number, text: string): undefined {
  let buffer = Buffer.from(text, "utf8")
  while (buffer.length > 0) {
    const written = writeSync(fd, buffer)
    buffer = buffer.subarray(written)
  }
  return undefined
}

function say(said: unknown): undefined {
  return writeAll(PROTOCOL_FD, `${JSON.stringify(said)}\n`)
}

// The server's own voice is fd 2 written straight, because a run replaces `process.stderr.write`
// for as long as it lasts and a note written through it would be read as the verb's.
function note(text: string): undefined {
  try {
    writeAll(2, `verb-server: ${text}\n`)
  } catch {}
  return undefined
}

let leaseOver = false
let running = false
const waiting: Ask[] = []

function refuse(ask: Ask, refusal: string, saying: string): undefined {
  return say({ id: ask.id, ok: false, refusal, saying, ageMs: ageMs() })
}

interface Caught {
  readonly stdout: string
  readonly stderr: string
}

async function ran(verb: Verb, ask: Ask): Promise<{ readonly code: number; readonly failure: string | null } & Caught> {
  const out: string[] = []
  const err: string[] = []
  const stdoutWas = process.stdout.write
  const stderrWas = process.stderr.write
  const argvWas = process.argv
  const caught = (into: string[]) =>
    ((chunk: unknown, ...rest: readonly unknown[]): boolean => {
      into.push(typeof chunk === "string" ? chunk : Buffer.from(chunk as Uint8Array).toString("utf8"))
      const then = rest.find((one) => typeof one === "function")
      if (typeof then === "function") (then as () => void)()
      return true
    }) as typeof process.stdout.write
  process.stdout.write = caught(out)
  process.stderr.write = caught(err)
  process.argv = [argvWas[0] ?? "bun", `${import.meta.dir}/${ask.verb}.ts`, ...ask.args]
  let code = 1
  let failure: string | null = null
  try {
    code = await duringOneCall(async () => verb(ask.args))
  } catch (thrown) {
    failure = thrown instanceof Error ? `${thrown.message}\n${thrown.stack ?? ""}` : String(thrown)
  } finally {
    process.stdout.write = stdoutWas
    process.stderr.write = stderrWas
    process.argv = argvWas
  }
  return { code, failure, stdout: out.join(""), stderr: err.join("") }
}

async function serve(ask: Ask): Promise<undefined> {
  if (leaseOver || ageMs() >= LEASE) {
    leaseOver = true
    return refuse(ask, "lease", `this server's lease of ${LEASE}ms is up, so it answers nothing more`)
  }
  let verb: Verb | null
  try {
    verb = await verbFor(ask.verb)
  } catch (thrown) {
    return refuse(ask, "unloadable", `${ask.verb} could not be loaded: ${String(thrown)}`)
  }
  if (verb === null) {
    return refuse(ask, "unserved", `${ask.verb} is not a verb this server answers`)
  }
  // HOW OLD THIS PROCESS WAS WHEN IT BEGAN COMPOSING THE ANSWER, which is the age the answer
  // carries. Taken here rather than after the run so it is the age the lease was just checked
  // against: a caller holding the same bound then reads the same number this end did, and the two
  // ends can disagree only if this one failed to keep its own lease.
  const askedAt = ageMs()
  const answer = await ran(verb, ask)
  if (answer.failure !== null) {
    return refuse(ask, "threw", `${ask.verb} threw: ${answer.failure}`)
  }
  return say({
    id: ask.id,
    ok: answer.code === 0,
    code: answer.code,
    stdout: answer.stdout,
    stderr: answer.stderr,
    ageMs: askedAt,
    tookMs: ageMs() - askedAt,
    // WHICH PROCESS COMPOSED THIS. A caller comparing it across two answers knows whether the same
    // held-open runtime answered both, which is the difference between a test that shows a server
    // noticing a change under it and one that shows a fresh child noticing nothing in particular.
    pid: process.pid,
  })
}

// HOW A LEASE TURNS OVER, AND WHY IT IS NOT A CLOCK THAT KILLS THE PROCESS. A server that exits
// the moment its lease is up races every ask in flight: the caller finds a pipe that has just
// closed, which is the same shape as a crash and is read as one. So the lease is spent instead on
// the next ask that arrives — that ask is refused by name, and the server exits behind the
// refusal. The caller then knows exactly what happened and starts another, and the one path a
// lease turnover takes is the one path that gets tested.
//
// The idle timer is the other end of it, for a caller that has stopped asking without closing its
// end — a panel nobody has open. It stands at twice the lease, and must stand above it: an idle
// bound below the lease would take every server out before a lease could turn over, and the
// refusal above would be a path nothing ever walks.
const IDLE_OVER_LEASE = 2

let idleTimer: ReturnType<typeof setTimeout> | undefined

function idling(): undefined {
  if (idleTimer !== undefined) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    note(`nothing has been asked for ${LEASE * IDLE_OVER_LEASE}ms, so this server is finished`)
    finish()
  }, LEASE * IDLE_OVER_LEASE)
  return undefined
}

function finish(): undefined {
  if (idleTimer !== undefined) clearTimeout(idleTimer)
  idleTimer = undefined
  process.exitCode = 0
  try {
    process.stdin.destroy()
  } catch {}
  // Everything said is already on the wire: `writeAll` returns only once the bytes have gone. This
  // is here for a handle nothing closed, so a server past its lease cannot become one that lives.
  setTimeout(() => {
    process.exit(0)
  }, GOODBYE_MS).unref()
  return undefined
}

async function pump(): Promise<undefined> {
  if (running) return undefined
  running = true
  try {
    for (;;) {
      const ask = waiting.shift()
      if (ask === undefined) break
      await serve(ask)
    }
  } finally {
    running = false
  }
  if (leaseOver) finish()
  return undefined
}

export function askIn(line: string): Ask | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  if (typeof held["id"] !== "number" || typeof held["verb"] !== "string") return null
  const args = held["args"]
  return {
    id: held["id"],
    verb: held["verb"],
    args: Array.isArray(args) ? args.filter((one): one is string => typeof one === "string") : [],
  }
}

function listen(): undefined {
  let held = ""
  process.stdin.setEncoding("utf8")
  process.stdin.on("data", (chunk: string) => {
    held += chunk
    for (;;) {
      const cut = held.indexOf("\n")
      if (cut < 0) break
      const line = held.slice(0, cut)
      held = held.slice(cut + 1)
      if (line.trim() === "") continue
      const ask = askIn(line)
      if (ask === null) {
        note(`an ask that is not a JSON object carrying an id and a verb was thrown away`)
        continue
      }
      waiting.push(ask)
      idling()
      void pump()
    }
  })
  // The caller dying closes this end, and that is what reaps the server: nothing else is watching.
  process.stdin.on("end", () => finish())
  process.stdin.on("close", () => finish())
  process.stdin.on("error", () => finish())
  return undefined
}

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  try {
    say({ hello: PROTOCOL, pid: process.pid, leaseMs: LEASE, verbs: VERBS_SERVED })
  } catch (thrown) {
    process.stderr.write(
      `error: nothing is listening on fd ${PROTOCOL_FD}, and that is where every answer goes — spawn this with a fourth pipe (${String(thrown)})\n`
    )
    return 1
  }
  idling()
  listen()
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
