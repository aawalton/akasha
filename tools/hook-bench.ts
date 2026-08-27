
import { chmodSync, existsSync, mkdirSync, openSync, closeSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { HOOK_BENCH_HELP } from "./lib/hook-bench-help.ts"

function refuse(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(2)
}

function slurp(path: string, what: string): string {
  try {
    return readFileSync(path === "-" ? 0 : path, "utf8")
  } catch (error) {
    refuse(`${what} could not be read from ${path === "-" ? "stdin" : path}: ${(error as Error).message}`)
  }
}

function parseJson(text: string, what: string): Record<string, unknown> {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch (error) {
    refuse(`${what} is not readable JSON: ${(error as Error).message}`)
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) refuse(`${what} is not a JSON object`)
  return value as Record<string, unknown>
}

interface Declared {
  readonly label: string
  readonly command: string
}

function wrap(hooks: Record<string, unknown>, runDir: string, shim: string): { settings: unknown; declared: Declared[] } {
  const declared: Declared[] = []
  const out: Record<string, unknown> = {}
  for (const [event, groups] of Object.entries(hooks)) {
    if (!Array.isArray(groups)) refuse(`\`hooks.${event}\` is not an array of matcher groups`)
    out[event] = groups.map((group: unknown, groupAt: number) => {
      const where = `hooks.${event}[${groupAt}]`
      if (group === null || typeof group !== "object") refuse(`\`${where}\` is not an object`)
      const entries = (group as { hooks?: unknown }).hooks
      if (!Array.isArray(entries)) refuse(`\`${where}.hooks\` is not an array`)
      return {
        ...(group as Record<string, unknown>),
        hooks: entries.map((entry: unknown, entryAt: number) => {
          if (entry === null || typeof entry !== "object") refuse(`\`${where}.hooks[${entryAt}]\` is not an object`)
          const command = (entry as { command?: unknown }).command
          if (typeof command !== "string" || command === "") {
            refuse(`\`${where}.hooks[${entryAt}]\` declares no \`command\`; only command hooks can be benched`)
          }
          const label = `${event}-${groupAt}-${entryAt}`
          declared.push({ label, command })
          return { ...(entry as Record<string, unknown>), command: `${process.execPath} ${shim} ${runDir} ${label}` }
        }),
      }
    })
  }
  if (declared.length === 0) refuse("the hooks object declares no hook, so there would be nothing to bench")
  return { settings: out, declared }
}

function credential(account: string | null, home: string): string {
  const named = account ?? (process.env.CLAUDE_CONFIG_DIR ?? "").split("/").filter((part) => part !== "").at(-1) ?? ""
  if (named === "") refuse("no --account was given and $CLAUDE_CONFIG_DIR names none")
  const path = `${home}/.claude/accounts/${named}/.credentials.json`
  if (!existsSync(path)) refuse(`${named} has no credential at ${path}; name another with --account`)
  return path
}

interface Args {
  hooks: string | null
  prompt: string | null
  promptFile: string | null
  agents: string | null
  model: string
  timeout: number
  runDir: string | null
  account: string | null
}

function parseArgs(argv: readonly string[]): Args {
  const args: Args = {
    hooks: null, prompt: null, promptFile: null, agents: null,
    model: "sonnet", timeout: 300, runDir: null, account: null,
  }
  for (let at = 0; at < argv.length; at += 1) {
    const arg = argv[at] ?? ""
    const value = (): string => {
      const next = argv[at + 1]
      if (next === undefined) refuse(`\`${arg}\` takes a value`)
      at += 1
      return next
    }
    if (arg === "--hooks") args.hooks = value()
    else if (arg === "--prompt") args.prompt = value()
    else if (arg === "--prompt-file") args.promptFile = value()
    else if (arg === "--agents") args.agents = value()
    else if (arg === "--model") args.model = value()
    else if (arg === "--run-dir") args.runDir = value()
    else if (arg === "--account") args.account = value()
    else if (arg === "--timeout") {
      const seconds = Number(value())
      if (!Number.isFinite(seconds) || seconds <= 0) refuse("--timeout takes a positive number of seconds")
      args.timeout = seconds
    } else refuse(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  return args
}

function tally(runDir: string): { reported: number; recorded: Map<string, number> } {
  let reported = 0
  for (const line of (existsSync(`${runDir}/stream.jsonl`) ? readFileSync(`${runDir}/stream.jsonl`, "utf8") : "").split("\n")) {
    if (line === "") continue
    try {
      if ((JSON.parse(line) as { subtype?: string }).subtype === "hook_response") reported += 1
    } catch {
    }
  }
  const recorded = new Map<string, number>()
  for (const line of (existsSync(`${runDir}/hooks.jsonl`) ? readFileSync(`${runDir}/hooks.jsonl`, "utf8") : "").split("\n")) {
    if (line === "") continue
    try {
      const label = (JSON.parse(line) as { label?: string }).label ?? "?"
      recorded.set(label, (recorded.get(label) ?? 0) + 1)
    } catch {
    }
  }
  return { reported, recorded }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HOOK_BENCH_HELP)
    return
  }
  const args = parseArgs(argv)
  const home = process.env.HOME ?? refuse("$HOME is unset, so no account directory could be found")

  if (args.hooks === null) refuse("--hooks is required — the hooks object to install")
  if (args.prompt === null && args.promptFile === null) refuse("one of --prompt or --prompt-file is required")
  if (args.prompt !== null && args.promptFile !== null) refuse("--prompt and --prompt-file are two answers to one question")
  const prompt = args.prompt ?? slurp(args.promptFile ?? "-", "the prompt")
  const hooks = parseJson(slurp(args.hooks, "the hooks object"), "the hooks object")
  const agents = args.agents === null ? null : slurp(args.agents, "the agents object")
  if (agents !== null) parseJson(agents, "the agents object")
  const credentialPath = credential(args.account, home)

  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "")
  const runDir = args.runDir ?? `${home}/.hook-bench/${stamp}-${process.pid}`
  if (existsSync(runDir)) refuse(`${runDir} is already there; a run composes its own directory rather than joining one`)
  const config = `${runDir}/config`
  mkdirSync(`${runDir}/commands`, { recursive: true })
  mkdirSync(config, { recursive: true })
  chmodSync(config, 0o700)
  symlinkSync(credentialPath, `${config}/.credentials.json`)
  writeFileSync(`${config}/settings.json`, `${JSON.stringify({ hooks: {} }, null, 2)}\n`, "utf8")

  const shim = `${import.meta.dir}/lib/hook-bench-record.ts`
  const { settings, declared } = wrap(hooks, runDir, shim)
  for (const one of declared) writeFileSync(`${runDir}/commands/${one.label}`, one.command, "utf8")
  writeFileSync(`${runDir}/settings.json`, `${JSON.stringify({ hooks: settings }, null, 2)}\n`, "utf8")

  const clientArgv = [
    "claude", "-p", prompt,
    "--settings", `${runDir}/settings.json`,
    "--model", args.model,
    "--output-format", "stream-json", "--include-hook-events", "--verbose",
    "--permission-mode", "bypassPermissions",
    ...(agents === null ? [] : ["--agents", agents]),
  ]
  const env: Record<string, string | undefined> = { ...process.env, CLAUDE_CONFIG_DIR: config }
  delete env.ANTHROPIC_UNIX_SOCKET

  const out = openSync(`${runDir}/stream.jsonl`, "w")
  const err = openSync(`${runDir}/stderr.txt`, "w")
  const child = Bun.spawn(clientArgv, { cwd: runDir, env, stdout: out, stderr: err, timeout: args.timeout * 1000 })
  const exit = await child.exited
  closeSync(out)
  closeSync(err)
  const killed = child.killed && child.signalCode !== null

  const { reported, recorded } = tally(runDir)
  const stray = reported - [...recorded.values()].reduce((sum, count) => sum + count, 0)
  const verdict = killed
    ? `the client was killed at the ${args.timeout}s ceiling`
    : exit !== 0
      ? `the client exited ${exit}; see stderr.txt`
      : stray > 0
        ? `${stray} firing(s) the client reported were installed by something other than this bench`
        : "ran, and every firing was one this bench installed"

  writeFileSync(
    `${runDir}/run.json`,
    `${JSON.stringify({ argv: clientArgv, config, credential: credentialPath, exit, killed, reported, stray, verdict }, null, 2)}\n`,
    "utf8"
  )

  for (const one of declared) {
    process.stderr.write(`hook:   ${one.label} fired ${recorded.get(one.label) ?? 0} time(s) — ${one.command}\n`)
  }
  process.stderr.write(`run:    ${verdict}\n`)
  process.stdout.write(`${runDir}\n`)
  process.exitCode = killed || exit !== 0 || stray > 0 ? 1 : 0
}

if (import.meta.main) await main()
