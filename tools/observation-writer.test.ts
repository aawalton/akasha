import { afterEach, describe, expect, test } from "bun:test"
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import {
  bunIn,
  writerMainIn,
  writingTo,
  type WriterAnswer,
  type WriterAsk,
  type Writing,
} from "../editor-extension/src/seat/observation-writer.ts"

// WHAT KEEPS AN OBSERVATION THE HOST HANDED OVER FROM BEING LOST.
//
// The point of this client is that the write happens in another process, and the whole hazard of
// that is a write which was handed over and never landed. So these are not tests that a write
// works: they are tests of the seam — that an ask handed over is answered, that everything handed
// over before `dispose` has landed by the time `dispose` returns, that a child which is gone
// refuses rather than leaving the host waiting, and that two writers are two children.
//
// Every one of them runs against a real `observation-writer-main.ts` over real pipes, writing real
// YAML into a fixture checkout of its own. Nothing here is a stub, because a stub of the thing
// under test proves the stub.
//
// THE CLIENT KEEPS ITS CHILD TO ITSELF: it reads the `pid` off the child's hello and throws it
// away, and exposes neither the pid nor the `ChildProcess`. A test that means to stop the child
// mid-drain, or to kill it, has no handle to do it with. So what the client is given as `bun` is a
// two-line script that records its own pid and then `exec`s the real bun — after the `exec` the
// process is bun running the real writer main, under the pid the script wrote down.

const REPO = join(import.meta.dir, "..")

const WRITER_MAIN = writerMainIn(REPO)

const PAGE_TYPE = "code-editor-window"

const STATES = join("pages", PAGE_TYPE)

// BUN'S FOURTH PIPE, NOT THE CLIENT'S. Under bun 1.3.14 `node:child_process` gives the parent its
// end of an extra stdio pipe by connecting a socket, and that connect loses a race often enough to
// see: the child starts, writes its hello to fd 3, is told EPIPE, prints this line and exits 1
// before the client has heard anything. Measured against this same writer main, 30 of 30 spawns
// were clean under node 22 and between one in twenty and one in five were refused under bun. The
// extension host is node, so this is the test host at fault and not the subject.
//
// An ask refused with exactly this symptom is therefore asked again, which is what the store
// itself does — a refusal leaves `writtenKey` alone and the next flush writes the same state. Any
// other refusal is passed on, and three goes is the bound, so a client that really opens no fourth
// pipe still fails rather than retrying forever.
const BUN_LOST_THE_PIPE = "nothing is listening on fd 3"

const GOES = 3

interface Writer {
  readonly client: Writing
  readonly noise: string[]
}

const started: Writer[] = []

const roots: string[] = []

// A checkout of our own, holding the two pages the writer needs to be told where a window's state
// goes: the `*-repo` page that says a checkout stands here, and the page type whose `files` glob
// names the folder. `.git` is what `rootsHere` reads as "this repository is cloned here". Nothing
// in Alan's checkout is touched, and `AKASHA_TEST_RUN` is passed on so that if one of these ever
// did name his checkout the live-store write guard would refuse the write rather than land it.
function rootHere(): string {
  const at = mkdtempSync(join(tmpdir(), "observation-writer-test-"))
  roots.push(at)
  mkdirSync(join(at, ".git"), { recursive: true })
  mkdirSync(join(at, "pages", "repo"), { recursive: true })
  mkdirSync(join(at, "pages", "page-type"), { recursive: true })
  writeFileSync(
    join(at, "pages", "repo", "akasha-repo.repo.md"),
    `---\nid: b8152699-76bf-4933-ab6b-2dd8cc881a3b\npage-type-slug: repo\ntitle: "Akasha repo"\n` +
      `slug: akasha-repo\n---\n\n# Definition\n\n` +
      `- **Akasha repo** — the fixture checkout these tests write in.\n`
  )
  writeFileSync(
    join(at, "pages", "page-type", `${PAGE_TYPE}.page-type.md`),
    `---\nid: a97ae8c4-f0b7-57e3-8e46-7f6fcfdc1e1e\npage-type-slug: page-type\n` +
      `title: "Code editor window"\nfiles: akasha:${STATES}/**/*.${PAGE_TYPE}.md\n` +
      `slug: ${PAGE_TYPE}\n---\n\n# Definition\n\n` +
      `- **Code editor window** — one open window of the editor.\n`
  )
  return at
}

function pidFile(root: string): string {
  return join(root, "child.pid")
}

// The script the client is handed as its `bun`. `$$` is the shell's own pid and `exec` replaces
// that shell with bun, so the number written here is the pid of the process the client is talking
// to. Without it nothing outside the client can name its child.
function bunSayingItsPid(root: string): string {
  const bun = bunIn()
  const at = join(root, "bun-saying-its-pid")
  writeFileSync(
    at,
    `#!/bin/sh\nprintf '%s' "$$" > ${JSON.stringify(pidFile(root))}\nexec ${JSON.stringify(bun)} "$@"\n`
  )
  chmodSync(at, 0o755)
  return at
}

function pidHere(root: string): number {
  return Number(readFileSync(pidFile(root), "utf8"))
}

function writerAt(root: string): Writer {
  const bun = bunIn()
  const noise: string[] = []
  const client = writingTo({
    bun: bunSayingItsPid(root),
    mainFile: WRITER_MAIN,
    env: {
      ...process.env,
      PATH: `${dirname(bun)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      AKASHA_TEST_RUN: "1",
    },
    onNoise: (text) => void noise.push(text),
  })
  const writer = { client, noise }
  started.push(writer)
  return writer
}

function askFor(window: string, feature: string): WriterAsk {
  return {
    act: "patch-state",
    pageType: PAGE_TYPE,
    name: window,
    url: `http://127.0.0.1:8787/patch-state/${PAGE_TYPE}/${window}`,
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      writer: "editor-observations",
      values: {
        features: { [feature]: { at: "2026-01-01T00:00:00.000Z" } },
        "observed-at": "2026-01-01T00:00:00.000Z",
      },
    }),
  }
}

// Settled either way and settled now, so a refusal is a value the test can read rather than an
// unhandled rejection thrown at whatever runs next.
interface Told {
  readonly answer: WriterAnswer | null
  readonly saying: string
}

function told(asking: Promise<WriterAnswer>): Promise<Told> {
  return asking.then(
    (answer) => ({ answer, saying: "" }),
    (err: unknown) => ({ answer: null, saying: String(err) })
  )
}

// The plain ask, for the tests that mean to be answered. A refusal the child itself blamed on its
// fourth pipe is asked again — see BUN_LOST_THE_PIPE — and nothing else is.
async function asked(writer: Writer, ask: WriterAsk): Promise<WriterAnswer> {
  for (let go = 1; ; go++) {
    const said = await told(writer.client.ask(ask))
    if (said.answer !== null) return said.answer
    const bunsFault = writer.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))
    if (go >= GOES || !bunsFault) throw new Error(said.saying)
    writer.noise.length = 0
  }
}

// A turn of the event loop, which is what lets a write already queued on the child's stdin reach
// the pipe. `await` alone drains microtasks and moves no bytes.
async function handedOver(): Promise<void> {
  await new Promise<void>((done) => setImmediate(done))
}

// SETTLED, OR NOT SETTLED SOON ENOUGH TO BE CALLED SETTLED. A write handed to a stream that has
// already been ended is never answered and never seen to fail — it sits out the client's whole
// 60s `WRITE_TIMEOUT_MS` and is then reported as a stuck child. A bound well under that is what
// tells a prompt refusal apart from that hang, and it fails here rather than at the test timeout
// so the failure names which promise never came back.
const PROMPTLY_MS = 10_000

async function promptly<T>(what: Promise<T>, saying: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const late = new Promise<never>((_, refuse) => {
    timer = setTimeout(
      () => refuse(new Error(`${saying} had not settled ${PROMPTLY_MS}ms later`)),
      PROMPTLY_MS
    )
  })
  try {
    return await Promise.race([what, late])
  } finally {
    clearTimeout(timer)
  }
}

async function afterAMoment(): Promise<void> {
  await new Promise<void>((done) => setTimeout(done, 25))
}

// The pid the shell script wrote down, once it has written it. The client spawns synchronously but
// the script runs when the kernel gets to it, so a test that means to name the child of a start it
// deliberately raced has to wait for the child to say who it is.
async function pidAppeared(root: string, within: number): Promise<number> {
  const until = Date.now() + within
  for (;;) {
    if (existsSync(pidFile(root))) {
      const pid = pidHere(root)
      if (Number.isFinite(pid) && pid > 0) return pid
    }
    if (Date.now() >= until) throw new Error("no child ever wrote its pid down")
    await afterAMoment()
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

// A child the client abandoned holds its end of a pipe the client will never close, so it sits
// there until this test process itself dies. Polling rather than looking once, because the client
// is allowed to reap it a turn or two after the promises it owes have settled.
async function goneWithin(pid: number, within: number): Promise<boolean> {
  const until = Date.now() + within
  for (;;) {
    if (!alive(pid)) return true
    if (Date.now() >= until) return false
    await afterAMoment()
  }
}

const CLIENT = join(REPO, "editor-extension", "src", "seat", "observation-writer.ts")

// The whole of the same-tick race, run as a node program: build a writer, get one ask answered so
// there is a child up, then fire an ask and a dispose with nothing awaited between them and report
// what came back. It carries no fixture of its own — the two asks are handed to it as JSON, built
// by this file's own `askFor`, so there is one definition of what an ask looks like.
//
// The verdict goes out on stdout as one line, because node prints an ExperimentalWarning about
// stripping the client's types to stderr and a driver that died prints its stack there too.
const DRIVER = `
import { pathToFileURL } from "node:url"

const [, , clientAt, mainFile, bun, root, first, sameTick] = process.argv
const { writingTo } = await import(pathToFileURL(clientAt).href)

const noise = []
const client = writingTo({
  bun,
  mainFile,
  env: { ...process.env, AKASHA_ROOT: root, AKASHA_TEST_RUN: "1" },
  onNoise: (text) => void noise.push(text),
})

const told = (asking) =>
  asking.then(
    (answer) => ({ answer, saying: "" }),
    (err) => ({ answer: null, saying: String(err) })
  )

const say = (what) => console.log("VERDICT " + JSON.stringify({ ...what, noise }))

const before = await told(client.ask(JSON.parse(first)))
if (before.answer === null) {
  say(before)
  process.exit(0)
}

// The race. No await, no microtask, nothing between them.
const asking = told(client.ask(JSON.parse(sameTick)))
const disposing = client.dispose()

const late = new Promise((_, refuse) => {
  const timer = setTimeout(() => refuse(new Error("it had still not settled 20000ms later")), 20000)
  timer.unref()
})
try {
  await Promise.race([disposing, late])
  say(await Promise.race([asking, late]))
} catch (thrown) {
  say({ answer: null, saying: String(thrown) })
}
process.exit(0)
`

interface Drove extends Told {
  readonly noise: readonly string[]
}

function droveUnderNode(root: string): Drove {
  const bun = bunIn()
  const at = join(root, "same-tick-under-node.mjs")
  writeFileSync(at, DRIVER)
  const ran = Bun.spawnSync({
    cmd: [
      "node",
      at,
      CLIENT,
      WRITER_MAIN,
      bun,
      root,
      JSON.stringify(askFor("before-dispose", "activation")),
      JSON.stringify(askFor("same-tick", "shutdown")),
    ],
    env: {
      ...process.env,
      PATH: `${dirname(bun)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      AKASHA_TEST_RUN: "1",
    },
    stdout: "pipe",
    stderr: "pipe",
  })
  const out = ran.stdout.toString()
  const said = out.split("\n").find((one) => one.startsWith("VERDICT "))
  // A driver that printed no verdict did not come back to print one — which is itself the defect
  // under node, where the write onto an ended stdin is an unhandled `error` event on the socket
  // and takes the host down. So the exit code and both streams are the failure message.
  if (said === undefined) {
    throw new Error(
      `the node driver reached no verdict (exit ${String(ran.exitCode)})\n` +
        `--- stdout ---\n${out}\n--- stderr ---\n${ran.stderr.toString()}`
    )
  }
  return JSON.parse(said.slice("VERDICT ".length)) as Drove
}

function landedIn(root: string): readonly string[] {
  const at = join(root, STATES)
  if (!existsSync(at)) return []
  return readdirSync(at).sort()
}

function stateFile(window: string): string {
  return `${window}.${PAGE_TYPE}.uncommitted.yaml`
}

function stateOf(root: string, window: string): string {
  return readFileSync(join(root, STATES, stateFile(window)), "utf8")
}

afterEach(async () => {
  // NOTHING IS LEFT RUNNING. Every writer a test started is disposed here whether it passed or
  // threw, so a failing test leaves no bun process behind on the workstation, and every fixture
  // checkout is removed.
  while (started.length > 0) await started.pop()?.client.dispose().catch(() => undefined)
  while (roots.length > 0) rmSync(roots.pop() ?? "", { recursive: true, force: true })
})

describe("the observation writer against a real child", () => {
  test("an ask is answered, and the state it names lands in the checkout", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    const answer = await asked(writer, askFor("one-window", "activation"))

    expect(answer.ok).toBe(true)
    expect(answer.status).toBe(200)
    // The answer is not the evidence. The file is: a client that resolved without the child having
    // written anything would pass on the answer alone.
    expect(landedIn(root)).toEqual([stateFile("one-window")])
    expect(stateOf(root, "one-window")).toContain("activation")
  }, 60_000)

  test("a disposed writer starts no child and refuses", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    await writer.client.dispose()
    const said = await told(writer.client.ask(askFor("after-dispose", "activation")))

    expect(said.answer).toBe(null)
    expect(said.saying).toContain("disposed")
    expect(landedIn(root)).toEqual([])
  }, 60_000)
})

describe("the observation writer when the host is disposed", () => {
  // THE LOAD-BEARING ONE. `dispose` ends the child's stdin and waits for it to exit, and the child
  // exits only once its queue is empty; between them that is the whole durability story, and it is
  // the part a rewrite can drop without any other test noticing.
  //
  // The child is stopped with SIGSTOP before these asks are handed over, so it is not a matter of
  // luck whether work is still outstanding when stdin closes: the child has provably read none of
  // them. It is let go again only after `dispose` has closed stdin, so everything below is drain.
  test("everything handed over before dispose has landed by the time dispose returns", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    // The first ask is what starts the child, and only a started child has a pid to stop.
    await asked(writer, askFor("first-window", "activation"))
    const pid = pidHere(root)

    process.kill(pid, "SIGSTOP")
    const windows = ["late-1", "late-2", "late-3", "late-4", "late-5", "late-6", "late-7", "late-8"]
    const asking = windows.map((window) => told(writer.client.ask(askFor(window, "shutdown"))))
    await handedOver()

    // Nothing but the first window has landed: the child is stopped, so all eight of these are
    // sitting unread in the pipe. This is what makes the assertion after `dispose` mean something.
    expect(landedIn(root)).toEqual([stateFile("first-window")])

    const disposing = writer.client.dispose()
    process.kill(pid, "SIGCONT")
    await disposing

    // `dispose` has returned. Every state handed over before it is on disk — not in flight, not
    // about to be, on disk.
    expect(landedIn(root)).toEqual([stateFile("first-window"), ...windows.map(stateFile)].sort())
    for (const window of windows) expect(stateOf(root, window)).toContain("shutdown")

    // And each was answered rather than refused by the exit that followed it.
    const said = await Promise.all(asking)
    expect(said.map((one) => one.answer?.ok)).toEqual(windows.map(() => true))
  }, 60_000)
})

// DISPOSE AND A WRITE IN THE SAME TICK, WHICH IS TWO RACES AND NOT ONE. `ask` defers everything it
// does behind `await open()`; `dispose` does everything it does synchronously. So an ask and a
// dispose fired without an `await` between them always run dispose-first, ask-second, and which
// half of the client is caught out depends only on whether a child was already up:
//
//   no child yet — `dispose` reads a `session` that is still null, finds nothing to end and
//   returns having ended nothing. The start it did not know about then completes, and the ask
//   behind it writes into a child that now has no one left to close it. A leaked bun process.
//
//   a child already up — `dispose` ends its stdin before the ask is written, and the write lands
//   on an ended stream, where it fails asynchronously somewhere the client's `try/catch` cannot
//   see it. Nothing refuses the ask and nothing answers it.
//
// Neither is reachable from the store today, whose own dispose awaits its in-flight write first.
// Both are one caller away, and both are on the path that records observations.
describe("the observation writer disposed in the same tick as a write", () => {
  test("a dispose landing on a start still in flight leaves no child behind", async () => {
    // The spawn is the thing being raced here, so a spawn the test host itself lost is not an
    // answer either way — see BUN_LOST_THE_PIPE. A child that died of that has trivially left
    // nothing behind, which would pass this test without ever having run it.
    for (let go = 1; ; go++) {
      const root = rootHere()
      const writer = writerAt(root)

      // `ask` spawns the child synchronously on its way to `await open()`, so by the time it has
      // handed back a promise there is a real process; and `dispose` runs before the hello.
      const asking = told(writer.client.ask(askFor("mid-start", "activation")))
      const disposing = writer.client.dispose()

      const pid = await pidAppeared(root, PROMPTLY_MS)
      await promptly(disposing, "dispose")
      const said = await promptly(asking, "the ask")

      const bunsFault = writer.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))
      if (said.answer === null && bunsFault && go < GOES) continue

      // The child the client started while it was being disposed is not still standing.
      expect(await goneWithin(pid, PROMPTLY_MS)).toBe(true)

      // And it was not answered on the way out. A client that wrote the ask into that child and
      // reported it landed, then killed the child, has lost an observation while saying it kept
      // one — worse than the refusal, because the store believes a refusal and writes again.
      expect(said.answer).toBe(null)
      expect(said.saying).toContain("disposed")
      expect(landedIn(root)).toEqual([])
      return
    }
  }, 60_000)

  // THIS ONE RUNS UNDER NODE, AND HAS TO. What a stream does with a `write` that arrives after its
  // `end` is where the two hosts part company, and bun — the host this suite runs on — is the one
  // that is forgiving:
  //
  //   node 22 drops the bytes and reports it as an `error` event on the stream. Nothing in the
  //   client listens on `child.stdin`, so an unhandled `error` event takes the whole host process
  //   down; and were it handled, the ask behind it is neither answered nor refused and sits out
  //   its full 60s WRITE_TIMEOUT_MS.
  //
  //   bun 1.3.14 delivers the bytes anyway. The ask is answered, the state lands, and the defect
  //   is completely invisible.
  //
  // The extension host is node. So asserting this from a bun test would assert nothing — the same
  // reasoning as BUN_LOST_THE_PIPE above, in the other direction: there the test host invents a
  // fault the subject does not have, here it hides one the subject does. The driver below is the
  // real client and the real writer main over real pipes, hosted where the extension hosts it.
  test("an ask fired in the same tick as a dispose is handed over before stdin closes", async () => {
    for (let go = 1; ; go++) {
      const root = rootHere()
      const said = droveUnderNode(root)
      if (said.saying !== "" && said.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))) {
        if (go < GOES) continue
      }

      // Answered, not refused and not hung: an ask the host accepted before it began disposing is
      // one the child was given, and `dispose` does not close stdin out from under it.
      expect(said.saying).toBe("")
      expect(said.answer?.ok).toBe(true)

      // And it is on disk beside the one before it, which is the same promise the drain test
      // makes: what was handed over before `dispose` returned has landed.
      expect(landedIn(root)).toEqual([stateFile("before-dispose"), stateFile("same-tick")].sort())
      expect(stateOf(root, "same-tick")).toContain("shutdown")
      return
    }
  }, 120_000)
})

describe("the observation writer where the child is gone", () => {
  test("an ask outstanding when the child is killed is refused by name, and the next ask starts another", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    await asked(writer, askFor("before-kill", "activation"))
    const first = pidHere(root)

    // Stopped, then asked, then killed: the ask is provably outstanding at the moment the child
    // dies, because a stopped process has answered nothing. This is the shape of the child being
    // reaped with a write in flight.
    process.kill(first, "SIGSTOP")
    const asking = told(writer.client.ask(askFor("during-kill", "shutdown")))
    await handedOver()
    process.kill(first, "SIGKILL")

    const said = await asking
    expect(said.answer).toBe(null)
    expect(said.saying).toContain("the observation writer exited")
    expect(landedIn(root)).toEqual([stateFile("before-kill")])

    // A lost child is not a lost writer. The store leaves `writtenKey` alone on a refusal and asks
    // again about a second later, so this is the ask that has to work.
    const after = await asked(writer, askFor("after-kill", "activation"))
    expect(after.ok).toBe(true)
    expect(pidHere(root)).not.toBe(first)
    expect(landedIn(root)).toContain(stateFile("after-kill"))
  }, 60_000)
})

describe("two observation writers", () => {
  // A writer built twice is two children, with two queues and two counts of ids. Held in a class
  // that is free, and held in a closure it is still free; held in a module-level singleton — which
  // is the plausible wrong answer — it is one child answering for both, and the only thing that
  // shows it is a second writer pointed somewhere else.
  test("two writers built independently keep their own child, and disposing one leaves the other answering", async () => {
    const here = rootHere()
    const there = rootHere()
    const one = writerAt(here)
    const other = writerAt(there)

    await asked(one, askFor("here-window", "activation"))
    await asked(other, askFor("there-window", "activation"))

    // Each landed in its own checkout and in neither the other's. A shared child would have
    // written both under whichever AKASHA_ROOT it happened to be started with.
    expect(landedIn(here)).toEqual([stateFile("here-window")])
    expect(landedIn(there)).toEqual([stateFile("there-window")])
    expect(pidHere(here)).not.toBe(pidHere(there))

    await one.client.dispose()

    const after = await asked(other, askFor("there-again", "shutdown"))
    expect(after.ok).toBe(true)
    expect(landedIn(there)).toContain(stateFile("there-again"))
  }, 60_000)
})
