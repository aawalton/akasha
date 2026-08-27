
const HOOKS = `${import.meta.dir}/../hooks`

export interface Ran {
  readonly exitCode: number
  readonly stdout: string
  readonly stderr: string
}

export interface Firing {
  readonly stdin?: unknown
  readonly env?: Readonly<Record<string, string | null>>
  readonly args?: readonly string[]
}

export function hookPath(script: string): string {
  return `${HOOKS}/${script}`
}

function environment(overrides: Readonly<Record<string, string | null>>): Record<string, string> {
  const env: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || key === "AGENT_ID" || key === "CLAUDE_CODE_SESSION_ID") continue
    env[key] = value
  }
  for (const [key, value] of Object.entries(overrides)) {
    if (value === null) delete env[key]
    else env[key] = value
  }
  return env
}

function runnerFor(script: string): readonly string[] {
  return script.endsWith(".ts") ? [process.execPath] : ["bash"]
}

export function fire(script: string, firing: Firing = {}): Ran {
  const payload = typeof firing.stdin === "string" ? firing.stdin : JSON.stringify(firing.stdin ?? {})
  const run = Bun.spawnSync({
    cmd: [...runnerFor(script), hookPath(script), ...(firing.args ?? [])],
    stdin: Buffer.from(payload),
    env: environment(firing.env ?? {}),
    stdout: "pipe",
    stderr: "pipe",
  })
  return { exitCode: run.exitCode, stdout: run.stdout.toString(), stderr: run.stderr.toString() }
}
