
import { existsSync } from "node:fs"
import { join } from "node:path"
import { shape } from "./shape.ts"

const LOG = "[spawn-agents]"

const COMPOSE_COMMAND = "compose-subagents"

const COMPOSE_TIMEOUT_MS = 5_000

const AGENT_MAP = shape.record(shape.string(), shape.unknown())

export function renderSubagentDefinitions(raw: string): string | null {
  let parsed: ReturnType<typeof AGENT_MAP.safeParse>
  try {
    parsed = AGENT_MAP.safeParse(JSON.parse(raw))
  } catch {
    return null
  }
  if (!parsed.success) return null
  if (Object.keys(parsed.data).length === 0) return null
  return JSON.stringify(parsed.data)
}

export async function resolveSubagentDefinitions(): Promise<string | null> {
  const result = await composed()
  if ("reason" in result) {
    console.error(
      `${LOG} subagent definitions NOT loaded: ${result.reason}. Subagents on this seat ` +
        `run on the client's own prompts and descriptions.`
    )
    return null
  }
  const rendered = renderSubagentDefinitions(result.out)
  if (rendered === null) {
    console.error(
      `${LOG} subagent definitions NOT loaded: ${COMPOSE_COMMAND} did not return a non-empty ` +
        `JSON object of definitions. Subagents on this seat run on the client's own prompts ` +
        `and descriptions.`
    )
  }
  return rendered
}

async function composed(): Promise<{ out: string } | { reason: string }> {
  try {
    const answer = await runInstructions(COMPOSE_COMMAND, COMPOSE_TIMEOUT_MS)
    if (answer.code === 0) return { out: answer.stdout }
    const said = answer.stderr.trim()
    return { reason: `${COMPOSE_COMMAND} exited ${answer.code}${said === "" ? "" : ` (${said})`}` }
  } catch (error) {
    return { reason: `${COMPOSE_COMMAND} could not be run (${String(error)})` }
  }
}

const ENV_VALUE = shape.string().optional()

interface InstructionsAnswer {
  readonly stdout: string
  readonly stderr: string
  readonly code: number
}

function instructionsRoot(): string | null {
  const override = ENV_VALUE.parse(process.env.INSTRUCTIONS_ROOT)
  if (override !== undefined && override !== "") return override
  const home = ENV_VALUE.parse(process.env.HOME)
  return home === undefined || home === "" ? null : join(home, "instructions")
}

function commandPath(verb: string): string {
  return join(instructionsRoot() ?? "", "tools", `${verb}.ts`)
}

async function runInstructions(verb: string, ceilingMs: number): Promise<InstructionsAnswer> {
  const root = instructionsRoot()
  if (root === null)
    throw new Error(
      `${verb}: no instructions root, so no command there can be run. ` +
        "Set INSTRUCTIONS_ROOT, or make $HOME/repos/instructions a checkout."
    )

  if (!existsSync(root))
    throw new Error(
      `${verb}: the instructions root ${root} is not there, so no command under it ` +
        "can be run. Nothing is wrong with bun. Set INSTRUCTIONS_ROOT to a checkout."
    )

  const proc = Bun.spawn({
    cmd: [process.execPath, commandPath(verb)],
    cwd: root,
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })

  let killedAtCeiling = false
  const ceiling = setTimeout(() => {
    killedAtCeiling = true
    proc.kill()
  }, ceilingMs)
  let stdout: string
  let stderr: string
  let code: number
  try {
    ;[stdout, stderr, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
  } finally {
    clearTimeout(ceiling)
  }

  if (killedAtCeiling)
    throw new Error(
      `${verb}: ${commandPath(verb)} was still running after ${ceilingMs}ms and was ` +
        "killed, so nothing it decides is decided. It is stuck rather than slow."
    )

  return { stdout, stderr, code }
}
