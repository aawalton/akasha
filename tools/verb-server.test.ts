import { afterEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { homedir, tmpdir } from "node:os"
import { dirname, join } from "node:path"
import {
  askServed,
  CommandServerRefusal,
  REFUSAL_GONE,
  REFUSAL_LEASE,
  REFUSAL_OVER_LEASE,
  type Serving,
  servingFrom,
} from "@akasha/editor-extension/command-server-client"
import { LEASE_ENV, VERBS_SERVED } from "./lib/verb-served.ts"
import { VERBS_LOADABLE, verbsAdrift } from "./verb-server.ts"

// WHAT KEEPS THE HELD-OPEN SERVER FROM ANSWERING SOMETHING THAT IS NO LONGER TRUE.
//
// The point of the server is that one bun process answers many asks, and the whole hazard of that
// is an answer composed from what an earlier ask read. So these are not tests that the server
// answers: they are tests that it notices a change made under it, and that where it cannot answer
// it refuses instead of repeating itself.
//
// Every one of them runs against a real server over real pipes. Nothing here is a stub, because a
// stub of the thing under test proves the stub.

const BUN = join(homedir(), ".bun", "bin", "bun")

const SERVER = join(import.meta.dir, "verb-server.ts")

const WORKING_PAGE = "akasha/seat-system/seat-turn-states/pages/working.seat-turn-state.ts"

const ASK_MS = 20_000

const started: Serving[] = []

// A root of our own, holding the one page `agent-turn-colors --state working` reads. Writing a
// colour here is a change the server must notice; nothing in the repository is touched.
function rootWith(colour: string): string {
  const at = mkdtempSync(join(tmpdir(), "verb-server-test-"))
  mkdirSync(join(at, dirname(WORKING_PAGE)), { recursive: true })
  colourIn(at, colour)
  return at
}

function colourIn(at: string, colour: string): undefined {
  // The page as `agent-turn-colors` loads one: the body is transpiled and evaluated, and the type
  // import a landed page carries is erased before that, so a root of our own needs no node_modules.
  writeFileSync(
    join(at, WORKING_PAGE),
    `export const working = {\n  pageTypeSlug: "seat-turn-state",\n  slug: "working",\n` +
      `  definition: "an agent taking a turn",\n  colorSlug: "${colour}",\n} as const\n`
  )
  return undefined
}

function clientAt(
  root: string,
  more: { readonly leaseBoundMs?: number; readonly serverLeaseMs?: number } = {}
): Serving {
  const client = servingFrom({
    bun: BUN,
    serverFile: SERVER,
    env: {
      ...process.env,
      PATH: `${dirname(BUN)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      ...(more.serverLeaseMs === undefined ? {} : { [LEASE_ENV]: String(more.serverLeaseMs) }),
    },
    startTimeoutMs: 20_000,
    ...(more.leaseBoundMs === undefined ? {} : { leaseBoundMs: more.leaseBoundMs }),
  })
  started.push(client)
  return client
}

async function colourSaid(
  client: Serving
): Promise<{ readonly colour: string; readonly pid: number }> {
  const answer = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS)
  const said = JSON.parse(answer.stdout) as { colors: Record<string, string> }
  return { colour: said.colors["working"] ?? "", pid: answer.pid }
}

async function rested(ms: number): Promise<void> {
  await new Promise((wake) => setTimeout(wake, ms))
}

afterEach(() => {
  // NOTHING IS LEFT RUNNING. Every client started by a test is disposed here whether it passed or
  // threw, so a failing test leaves no bun process behind on the workstation.
  while (started.length > 0) started.pop()?.dispose()
})

// THE TWO LISTS THAT MUST AGREE, CHECKED WITHOUT STARTING ANYTHING. A server that finds them apart
// refuses to start, so every test below would already fail on a drift — but each would fail as a
// server that would not say hello, which is the shape of half a dozen other faults. These name it,
// and the two seeded ones are here because a check that cannot fail reports success for free.
describe("what the server can load against what the caller is told it answers", () => {
  test("the two lists agree", () => {
    expect(verbsAdrift(VERBS_LOADABLE, VERBS_SERVED)).toEqual([])
  })

  test("a verb named in VERBS_SERVED that this server cannot load is reported", () => {
    const said = verbsAdrift(["work-tree"], ["work-tree", "domain-tree"])
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("domain-tree")
    expect(said[0]).toContain("refused as unserved")
  })

  test("a verb this server can load that VERBS_SERVED does not name is reported", () => {
    const said = verbsAdrift(["work-tree", "domain-tree"], ["work-tree"])
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("domain-tree")
    expect(said[0]).toContain("spawn a child for it and never ask")
  })
})

describe("the verb server against a change made under it", () => {
  test("a colour rewritten under a running server is the colour it next answers", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    try {
      const first = await colourSaid(client)
      expect(first.colour).toBe("chartreuse")

      colourIn(root, "vermilion")

      const second = await colourSaid(client)
      // The same process answered both. Without this the test would pass against a server that
      // died and was replaced between the two asks, which notices a change for a reason that has
      // nothing to do with what is being claimed here.
      expect(second.pid).toBe(first.pid)
      expect(second.colour).toBe("vermilion")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)
})

describe("the verb server where it cannot answer", () => {
  test("a server killed with an ask in flight refuses it rather than repeating its last answer", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    try {
      const first = await colourSaid(client)
      expect(first.colour).toBe("chartreuse")

      // Killed, and asked before node has had a turn in which to notice: the ask is written to a
      // pipe whose far end is already gone. This is the shape of the server dying mid-poll.
      process.kill(first.pid, "SIGKILL")
      const asking = client.ask("agent-turn-colors", ["--state", "working"], ASK_MS)

      const thrown = await asking.then(
        (answer) => ({ refused: false, saying: JSON.stringify(answer) }),
        (err: unknown) => ({ refused: true, saying: err })
      )
      expect(thrown.refused).toBe(true)
      expect(thrown.saying).toBeInstanceOf(CommandServerRefusal)
      expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_GONE)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)

  test("a server past its lease refuses rather than answering from the runtime it has held", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root, { serverLeaseMs: 1_500 })
    try {
      const first = await colourSaid(client)
      expect(first.colour).toBe("chartreuse")

      await rested(1_800)

      const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
        (answer) => ({ refused: false, saying: JSON.stringify(answer) as unknown }),
        (err: unknown) => ({ refused: true, saying: err })
      )
      expect(thrown.refused).toBe(true)
      expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_LEASE)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)

  test("an answer older than the caller's own bound is refused, not passed on", async () => {
    const root = rootWith("chartreuse")
    // The server holds a lease long enough that it will answer happily. The caller holds a tighter
    // one. So the server does answer, and this is a test of the caller's own guard alone: the
    // second instrument, for the day the first one fails to keep its word.
    const client = clientAt(root, { serverLeaseMs: 30_000, leaseBoundMs: 1_000 })
    try {
      const first = await colourSaid(client)
      expect(first.colour).toBe("chartreuse")

      await rested(1_400)

      const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
        (answer) => ({ refused: false, saying: JSON.stringify(answer) as unknown }),
        (err: unknown) => ({ refused: true, saying: err })
      )
      expect(thrown.refused).toBe(true)
      expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_OVER_LEASE)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)
})

describe("the verb server when its lease turns over under a caller", () => {
  test("askServed starts another server and answers, and the answer is the new colour", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root, { serverLeaseMs: 1_500 })
    try {
      const first = await colourSaid(client)
      expect(first.colour).toBe("chartreuse")

      colourIn(root, "vermilion")
      await rested(1_800)

      const answer = await askServed(client, "agent-turn-colors", ["--state", "working"], ASK_MS)
      const said = JSON.parse(answer.stdout) as { colors: Record<string, string> }
      expect(said.colors["working"]).toBe("vermilion")
      // A different process, because the one that held the lease is finished.
      expect(answer.pid).not.toBe(first.pid)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)

  test("a disposed client starts nothing and refuses", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    try {
      await colourSaid(client)
      client.dispose()
      const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
        () => null,
        (err: unknown) => err
      )
      expect(thrown).toBeInstanceOf(CommandServerRefusal)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 60_000)
})
