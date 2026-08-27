import { accessSync, appendFileSync, constants, mkdirSync } from "node:fs"

const HOOK_NAME = "block-substituting-backtick"

const DECIDER = `${import.meta.dir}/../lib/refuse-substituting-backtick.ts`

const BLOCK = 2

const UNPARSEABLE = 3

function healthDir(): string {
  const stated = process.env.CLAUDE_HOOK_HEALTH_DIR
  return stated === undefined || stated === "" ? "/var/tmp/claude-hook-health" : stated
}

function healthFile(): string {
  return `${healthDir()}/${HOOK_NAME}.jsonl`
}

function reportUninspected(detail: string): number {
  try {
    mkdirSync(healthDir(), { recursive: true })
    appendFileSync(
      healthFile(),
      `{"hook":"${HOOK_NAME}","at":${Math.floor(Date.now() / 1000)},"uninspected":"${detail}"}\n`
    )
  } catch {
    void 0
  }
  process.stderr.write(`${HOOK_NAME}: ${detail} — FAILED OPEN, this Bash call was NOT inspected\n`)
  process.stdout.write(
    `{"systemMessage":"${HOOK_NAME} did not inspect a Bash call (${detail}) and failed open. See ${healthFile()}"}\n`
  )
  return 0
}

function bunPath(): string {
  const own = `${process.env.HOME ?? ""}/.bun/bin/bun`
  try {
    accessSync(own, constants.X_OK)
  } catch {
    return "bun"
  }
  return own
}

async function main(): Promise<number> {
  const runner = bunPath()
  if (Bun.argv[2] === "--scope") {
    const ran = Bun.spawnSync({ cmd: [runner, DECIDER, "--scope"], stdout: "inherit", stderr: "inherit" })
    return ran.exitCode
  }
  const input = await Bun.stdin.text()
  if (!input.includes("`")) return 0
  const ran = Bun.spawnSync({
    cmd: [runner, DECIDER],
    stdin: Buffer.from(input),
    stdout: "inherit",
    stderr: "inherit",
  })
  if (ran.exitCode === BLOCK) return BLOCK
  if (ran.exitCode === 0) return 0
  if (ran.exitCode === UNPARSEABLE) return reportUninspected("the command could not be parsed")
  return reportUninspected(`internal failure: the decider exited ${ran.exitCode}`)
}

if (import.meta.main) {
  try {
    process.exit(await main())
  } catch (error) {
    process.exit(
      reportUninspected(`internal failure: ${error instanceof Error ? error.message : String(error)}`)
    )
  }
}
