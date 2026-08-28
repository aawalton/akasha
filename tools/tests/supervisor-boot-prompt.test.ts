import { afterEach, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { decided, hold } from "../lib/digest-harness.ts"
import { materializeBootPrompt } from "../lib/supervisor-boot-prompt.ts"

type Mode = "ok" | "empty" | "no-file" | "nonzero" | "hang"

function stubComposer(mode: Mode): string {
  return `const argv = process.argv.slice(2)
const out = argv[argv.indexOf("--out") + 1]
const mode = ${JSON.stringify(mode)}
if (mode === "hang") await Bun.sleep(60_000)
if (mode === "nonzero") process.exit(3)
if (mode === "no-file") process.exit(0)
if (mode === "empty") { await Bun.write(out, "") ; process.exit(0) }
await Bun.write(out, "AUTHORED PROMPT for " + argv[argv.indexOf("--agent") + 1] + "\\n")
process.exit(0)
`
}

const AGENT = "claude-agent-harness-worker"

interface Trace {
  readonly returned: string | null
  readonly logs: readonly string[]
  readonly landed: string | null
  readonly leftovers: number
}

const made: string[] = []

const SCRATCH = "/var/tmp/akasha-boot-prompt-test"

function scratch(prefix: string): string {
  mkdirSync(SCRATCH, { recursive: true })
  const path = mkdtempSync(`${SCRATCH}/${prefix}-`)
  made.push(path)
  return path
}

afterEach(() => {
  for (const path of made.splice(0)) rmSync(path, { recursive: true, force: true })
})

interface Vector {
  readonly mode: Mode | null
  readonly agentId: string | undefined
  readonly blockTarget?: boolean
  readonly ceilingMs?: number
}

async function run(vector: Vector): Promise<Trace> {
  const root = scratch("root")
  const tmpDir = scratch("tmp")
  mkdirSync(`${root}/tools`, { recursive: true })
  Bun.spawnSync(["git", "init", "-q", root])
  if (vector.mode !== null) writeFileSync(`${root}/tools/compose-boot.ts`, stubComposer(vector.mode))
  if (vector.blockTarget === true) {
    mkdirSync(`${tmpDir}/agent-boot-prompt-${vector.agentId}.md`, { recursive: true })
  }

  const before = process.env.AKASHA_ROOT
  process.env.AKASHA_ROOT = root
  const logs: string[] = []
  const real = console.log
  console.log = (...args: unknown[]): void => {
    logs.push(args.map((one) => String(one)).join(" "))
  }
  let returned: string | null
  try {
    returned = await materializeBootPrompt(vector.agentId, {
      tmpDir,
      ...(vector.ceilingMs === undefined ? {} : { ceilingMs: vector.ceilingMs }),
    })
  } finally {
    console.log = real
    if (before === undefined) delete process.env.AKASHA_ROOT
    else process.env.AKASHA_ROOT = before
  }

  const token = (text: string): string =>
    text.split(root).join("<ROOT>").split(tmpDir).join("<TMP>").replace(/\.tmp-\d+/g, ".tmp-<PID>")
  return {
    returned: returned === null ? null : token(returned),
    logs: logs.map(token),
    landed: returned !== null && existsSync(returned) ? await Bun.file(returned).text() : null,
    leftovers: [...new Bun.Glob("*.tmp-*").scanSync({ cwd: tmpDir })].length,
  }
}

interface Scenario {
  readonly name: string
  readonly vector: Vector
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "no agent id: drops the flag before it reaches the composer",
    vector: { mode: "ok", agentId: undefined },
    standing: {
      returned: null,
      logs: ["[boot-prompt] no agent id; spawning with no authored prompt"],
      landed: null,
      leftovers: 0,
    },
  },
  {
    name: "empty agent id: the same answer as none, on the same line",
    vector: { mode: "ok", agentId: "" },
    standing: {
      returned: null,
      logs: ["[boot-prompt] no agent id; spawning with no authored prompt"],
      landed: null,
      leftovers: 0,
    },
  },
  {
    name: "the composer is not there: names the path it looked for",
    vector: { mode: null, agentId: AGENT },
    standing: {
      returned: null,
      logs: ["[boot-prompt] <ROOT>/tools/compose-boot.ts is not there; spawning with no authored prompt"],
      landed: null,
      leftovers: 0,
    },
  },
  {
    name: "the composer exits non-zero: no prompt, and no file left at the target",
    vector: { mode: "nonzero", agentId: AGENT },
    standing: {
      returned: null,
      logs: ["[boot-prompt] tools/compose-boot.ts exited non-zero; spawning with no authored prompt"],
      landed: null,
      leftovers: 0,
    },
  },
  {
    name: "the composer exits zero writing nothing: read as composing to nothing",
    vector: { mode: "no-file", agentId: AGENT },
    standing: {
      returned: null,
      logs: [`[boot-prompt] ${AGENT} composed to nothing; spawning with no authored prompt`],
      landed: null,
      leftovers: 0,
    },
  },
  {
    name: "the composer writes an empty file: the same answer, and the empty file is left where it fell",
    vector: { mode: "empty", agentId: AGENT },
    standing: {
      returned: null,
      logs: [`[boot-prompt] ${AGENT} composed to nothing; spawning with no authored prompt`],
      landed: null,
      leftovers: 1,
    },
  },
  {
    name: "the composer composes: renames into place and hands back the target",
    vector: { mode: "ok", agentId: AGENT },
    standing: {
      returned: `<TMP>/agent-boot-prompt-${AGENT}.md`,
      logs: [],
      landed: `AUTHORED PROMPT for ${AGENT}\n`,
      leftovers: 0,
    },
  },
  {
    name: "the rename cannot land: reports the error and still refuses nothing",
    vector: { mode: "ok", agentId: AGENT, blockTarget: true },
    standing: {
      returned: null,
      logs: [
        `[boot-prompt] could not compose: EISDIR: illegal operation on a directory, rename '<TMP>/agent-boot-prompt-${AGENT}.md.tmp-<PID>' -> '<TMP>/agent-boot-prompt-${AGENT}.md'`,
      ],
      landed: null,
      leftovers: 1,
    },
  },
]

function projected(trace: Trace, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = (trace as unknown as Record<string, unknown>)[key]
  return picked
}

describe("materializeBootPrompt, held against the standing its port was taken from", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const trace = decided("ported", { value: await run(scenario.vector), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(trace, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})

describe("the ceiling the port added, held against nothing", () => {
  it("kills a composer that overruns and reports the bound as itself", async () => {
    const trace = await run({ mode: "hang", agentId: AGENT, ceilingMs: 250 })
    expect(trace.returned).toBeNull()
    expect(trace.logs).toEqual([
      "[boot-prompt] tools/compose-boot.ts did not finish within 250ms; spawning with no authored prompt",
    ])
  })
})
