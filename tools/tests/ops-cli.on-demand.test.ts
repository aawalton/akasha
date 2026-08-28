import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { installRepos } from "./fixture.ts"

const DISPATCHER = join(import.meta.dir, "..", "ops", "cli.ts")
const OWN_CHECKOUT = realpathSync(join(import.meta.dir, "..", ".."))

let root = ""

function put(relPath: string, body: string): void {
  const path = join(root, relPath)
  mkdirSync(join(path, ".."), { recursive: true })
  writeFileSync(path, body)
}

function buildFixture(): void {
  put(
    "node_modules/@shared/errors-core/package.json",
    JSON.stringify({
      name: "@shared/errors-core",
      version: "0.0.0",
      type: "module",
      main: "index.ts",
    })
  )
  put(
    "node_modules/@shared/errors-core/exit.ts",
    `export class InputError extends Error {
       code = 1
       unknownFlag
       constructor(message, unknownFlag) {
         super(message)
         this.name = "InputError"
         this.unknownFlag = unknownFlag
       }
     }
    `
  )
  put(
    "node_modules/@shared/errors-core/index.ts",
    `export function normalizeThrowable(err) { return err instanceof Error ? err : new Error(String(err)) }`
  )
  put(
    "tools/commands/branch/start.ts",
    `// command: start a branch
     export const help = { flags: [] }
     export default async function start() { process.stdout.write("started\\n") }
    `
  )
  put(
    "tools/commands/fixture/show.ts",
    `// command: print a line
     export const help = { flags: [{ name: "--seq", description: "which one" }], exits: [{ code: 1, meaning: "input error: fixture" }] }
     export default async function show() { process.stdout.write("shown\\n") }
    `
  )
  put(
    "tools/commands/fixture/create.ts",
    `// command: take an author
     export const help = { flags: [{ name: "--author", description: "who", aliases: ["--by"] }, { name: "--notes", argLabel: "<text>", valueShape: "prose", description: "prose" }] }
     export default async function create() {}
    `
  )
  put(
    "tools/commands/fixture/reject.ts",
    `// command: refuse an unknown flag
     export const help = { flags: [] }
     export default async function reject(args) {
       const { InputError } = await import("@shared/errors-core/exit")
       throw new InputError("unknown flag: " + args[0], { name: args[0] })
     }
    `
  )
  put(
    "tools/commands/fixture/boom.ts",
    `// command: reject after it has returned
     export const help = { flags: [] }
     export default async function boom() {
       setTimeout(() => { Promise.reject(new Error("simulated transient")) }, 0)
       await new Promise((r) => setTimeout(r, 200))
     }
    `
  )
  put(
    "tools/commands/fixture/throw.ts",
    `// command: throw off the stack the dispatcher awaits
     export const help = { flags: [] }
     export default async function thrower() {
       setTimeout(() => { throw new Error("simulated uncaught") }, 0)
       await new Promise((r) => setTimeout(r, 200))
     }
    `
  )
  put(
    "tools/commands/fixture/broken.ts",
    `// command: fail to load at all
     throw new Error("Cannot find module 'graphology'")
    `
  )
  put(
    "tools/commands/other/command.ts",
    `// command: sit in another namespace
     export const help = { flags: [{ name: "--author", description: "who" }] }
     export default async function command() {}
    `
  )
}

interface Ran {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

async function ops(args: readonly string[], env: Record<string, string> = {}): Promise<Ran> {
  const proc = Bun.spawn(["bun", DISPATCHER, ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      CODE_ROOT: root,
      AKASHA_ROOT: root,
      ...env,
    },
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

beforeAll(() => {
  root = mkdtempSync("/var/tmp/ops-cli-fixture-")
  buildFixture()
  installRepos(root)
  Bun.spawnSync(["git", "init", "-q"], { cwd: root })
})

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

describe("what an invocation exits with", () => {
  test("a command that ran exits with the vocabulary's OK", async () => {
    const ran = await ops(["fixture", "show"])
    expect(ran.stdout).toBe("shown\n")
    expect(ran.exitCode).toBe(0)
  })

  test("an unknown command is the caller's mistake, so it takes the input code and the listing", async () => {
    const ran = await ops(["not-a-namespace"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("Usage: ops")
    expect(ran.stderr).toContain("ops: unknown command")
  })

  test("the exit code comes from the shared vocabulary, not from a copy here", async () => {
    const ran = await ops(["fixture", "boom"])
    expect(ran.exitCode).toBe(3)
  })
})

describe("the backstops, armed before any command runs", () => {
  test("a rejection nobody handled is one readable line, not a page of markup", async () => {
    const ran = await ops(["fixture", "boom"])
    expect(ran.stderr).toContain("ops: unhandled rejection: simulated transient")
    expect(ran.stdout).not.toContain("<html>")
    expect(ran.exitCode).toBe(3)
  })

  test("a throw off the stack is the same one line", async () => {
    const ran = await ops(["fixture", "throw"])
    expect(ran.stderr).toContain("ops: uncaught exception: simulated uncaught")
    expect(ran.stdout).not.toContain("<html>")
    expect(ran.exitCode).toBe(3)
  })
})

describe("what `ops` prints", () => {
  test("a bare invocation lists every command and signposts the provenance flag", async () => {
    const ran = await ops([])
    expect(ran.exitCode).toBe(0)
    expect(ran.stdout).toContain("Usage: ops <command> [flags]")
    expect(ran.stdout).toContain("fixture show")
    expect(ran.stdout).toContain("Run `ops --version`")
  })

  test("a namespace lists its own commands and nobody else's", async () => {
    const ran = await ops(["fixture"])
    expect(ran.stdout).toContain("Usage: ops fixture <command>")
    expect(ran.stdout).toContain("fixture show")
    expect(ran.stdout).not.toContain("other command")
  })

  test("a command's help carries its flags and appends the inherited unclassified code", async () => {
    const ran = await ops(["fixture", "show", "--help"])
    expect(ran.exitCode).toBe(0)
    expect(ran.stdout).toContain("ops fixture show")
    expect(ran.stdout).toContain("--seq")
    expect(ran.stdout).toContain("input error: fixture")
    expect(ran.stdout).toContain("unclassified error: the command threw")
  })

  test("the provenance flag answers with the checkout it runs from, and nothing else does", async () => {
    const asked = await ops(["--version"])
    expect(asked.exitCode).toBe(0)
    expect(asked.stdout).toContain(`checkout\t${OWN_CHECKOUT}`)
    expect(asked.stdout).toContain("commit\t")
    const ordinary = await ops(["fixture", "show"])
    expect(ordinary.stdout + ordinary.stderr).not.toContain("checkout\t")
  })

  test("the provenance flag beside anything else stays a loud unknown command", async () => {
    const ran = await ops(["--version", "extra"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stdout).not.toContain("checkout\t")
  })
})

describe("a rejected flag that is real on a sibling", () => {
  test("names the whole invocation that takes it", async () => {
    const ran = await ops(["fixture", "reject", "--author"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("unknown flag: --author")
    expect(ran.stderr).toContain("ops fixture create --author")
  })

  test("reaches a route that exists only in the expansion", async () => {
    const ran = await ops(["fixture", "reject", "--notes-file"])
    expect(ran.stderr).toContain("ops fixture create --notes-file")
  })

  test("says nothing about another namespace's command carrying it", async () => {
    const ran = await ops(["fixture", "reject", "--author"])
    expect(ran.stderr).not.toContain("ops other command")
  })

  test("counts an alias as a name that command accepts", async () => {
    const ran = await ops(["fixture", "reject", "--by"])
    expect(ran.stderr).toContain("ops fixture create --by")
  })

  test("survives a sibling that cannot be loaded at all, which is why commands load lazily", async () => {
    const ran = await ops(["fixture", "reject", "--author"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("ops fixture create --author")
  })
})
