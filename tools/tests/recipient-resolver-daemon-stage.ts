import { afterAll } from "bun:test"
import {
  chmodSync,
  copyFileSync,
  cpSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = join(HERE, "..", "..")

export const STAGE = mkdtempSync("/var/tmp/recipient-resolver-daemon-")
export const FAKE_HOME = join(STAGE, "home")
for (const entry of readdirSync(REPO)) {
  if (entry === "tools" || entry === "services") continue
  symlinkSync(join(REPO, entry), join(STAGE, entry))
}
cpSync(join(REPO, "tools"), join(STAGE, "tools"), { recursive: true })
mkdirSync(join(STAGE, "services"), { recursive: true })
copyFileSync(
  join(REPO, "services", "recipient-resolver-daemon.ts"),
  join(STAGE, "services", "recipient-resolver-daemon.ts")
)

function stub(name: string, body: string): undefined {
  writeFileSync(join(STAGE, "tools", "lib", `${name}.ts`), body)
}

stub(
  "recipient-resolver-config",
  `export interface RecipientResolverConfig {
  tickMs: number; reviveTimeoutMs: number; dryRun: boolean
}
export function resolveRecipientResolverConfig(): RecipientResolverConfig {
  return {
    tickMs: Number(process.env.STUB_TICK_MS ?? "60000"),
    reviveTimeoutMs: Number(process.env.STUB_REVIVE_TIMEOUT_MS ?? "5000"),
    dryRun: (process.env.STUB_DRY_RUN ?? "1") === "1",
  }
}
export function recipientResolverConfigBanner(c: RecipientResolverConfig): string {
  if ((process.env.STUB_MODE ?? "") === "banner-throw") throw "banner-boom"
  return \`stub-ww-banner tick=\${c.tickMs}\`
}
`
)
stub(
  "recipient-resolver-registry",
  `const MODE = process.env.STUB_MODE ?? "ok"
const KILL_AT = Number(process.env.STUB_KILL_AT ?? "1")
const SIG = (process.env.STUB_SIGNAL ?? "SIGTERM") as NodeJS.Signals
let n = 0
export async function assembleRecipientResolverSpecs(a: unknown, b: unknown, c: unknown): Promise<unknown[]> {
  n += 1
  console.log(\`stub specs assembled from \${typeof a}/\${typeof b}/\${typeof c}\`)
  if (MODE === "specs-throw") {
    if (n === KILL_AT) process.kill(process.pid, SIG)
    throw "specs-boom"
  }
  return [{ name: "stub-seat" }]
}
`
)
stub(
  "recipient-resolver-tick",
  `const MODE = process.env.STUB_MODE ?? "ok"
const KILL_AT = Number(process.env.STUB_KILL_AT ?? "1")
const SIG = (process.env.STUB_SIGNAL ?? "SIGTERM") as NodeJS.Signals
const BOOT = process.env.STUB_BOOT_PROMPT
export const HARNESS_LEAD_NAME = "athena"
export interface RecipientResolverAgentRow { id: string }
export interface RecipientResolverTickDeps { specs: unknown[] }
let n = 0
export async function runRecipientResolverTick(deps: {
  specs: unknown[]
  revive: (id: string, boot: string | undefined) => Promise<string>
  perSpecTimeoutMs?: number
}): Promise<void> {
  n += 1
  console.log(\`stub ww tick n=\${n} specs=\${deps.specs.length} perSpec=\${deps.perSpecTimeoutMs}\`)
  if (MODE === "revive") {
    const signal = await deps.revive("agent-0001", BOOT)
    console.log(\`stub ww tick revive signal=\${signal}\`)
  }
  if (n === KILL_AT) {
    process.kill(process.pid, SIG)
    if (MODE === "kill-then-throw") {
      await new Promise((r) => setTimeout(r, 200))
      throw "boom"
    }
    return
  }
  if (MODE === "tick-throw") throw "boom"
}
`
)

export const FAKE_BIN = join(FAKE_HOME, "bin")
mkdirSync(FAKE_BIN, { recursive: true })
const FAKE_OPS = join(FAKE_BIN, "ops")
writeFileSync(
  FAKE_OPS,
  `#!/usr/bin/env bun
console.error(\`fake-ops argv=\${JSON.stringify(process.argv.slice(2))}\`)
if ((process.env.STUB_OPS ?? "") === "hang") { await new Promise(() => {}) }
process.exit(Number(process.env.STUB_OPS_EXIT ?? "0"))
`
)
chmodSync(FAKE_OPS, 0o755)

afterAll(() => rmSync(STAGE, { recursive: true, force: true }))

export interface Answer {
  readonly stdout: readonly string[]
  readonly stderr: readonly string[]
  readonly exitCode: number | null
  readonly endedUnderTenSeconds: boolean
}

const lines = (bytes: Uint8Array): string[] =>
  new TextDecoder()
    .decode(bytes)
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/pid=\d+/, "pid=<pid>"))

export function drive(env: Record<string, string>): Answer {
  const started = Date.now()
  const run = Bun.spawnSync({
    cmd: ["bun", join(STAGE, "services", "recipient-resolver-daemon.ts")],
    cwd: STAGE,
    env: {
      ...process.env,
      HOME: FAKE_HOME,
      PATH: `${FAKE_BIN}:${process.env.PATH ?? ""}`,
      ...env,
    },
    stdout: "pipe",
    stderr: "pipe",
    timeout: 25_000,
  })
  const elapsed = Date.now() - started
  const stdout = lines(run.stdout)
  for (const marker of ["revive-timeout=", "pre-filter-floor="]) {
    if (stdout.some((line) => line.includes(marker))) {
      throw new Error(`a real recipient-resolver sibling loaded (${marker}) — refusing to report a verdict`)
    }
  }
  return {
    stdout,
    stderr: lines(run.stderr),
    exitCode: run.exitCode,
    endedUnderTenSeconds: elapsed < 10_000,
  }
}

export const CLEAN = { STUB_KILL_AT: "1", STUB_SIGNAL: "SIGTERM", STUB_TICK_MS: "60000" }
