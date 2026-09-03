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
  ObservationWriterClient,
  writerMainIn,
  type WriterAnswer,
  type WriterAsk,
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
  readonly client: ObservationWriterClient
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
  const client = new ObservationWriterClient({
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
