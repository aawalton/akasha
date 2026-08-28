import { existsSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "../../repo/roots/roots.ts"
import { shape } from "./shape.ts"

const LOG = "[spawn-agents]"

const COMPOSE_COMMAND = "compose-subagents"

const COMPOSE_TIMEOUT_MS = 5_000

const DELEGATION_TOOL = "Agent"

const DELEGATION_OFF =
  `Delegation is OFF for this launch: the ${DELEGATION_TOOL} tool is disallowed, so this seat ` +
  `cannot dispatch a subagent at all. A subagent started without these definitions is never ` +
  `told to read its seat, and nothing it can see tells it apart from one that was.`

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
    console.error(`${LOG} subagent definitions NOT loaded: ${result.reason}. ${DELEGATION_OFF}`)
    return null
  }
  const rendered = renderSubagentDefinitions(result.out)
  if (rendered === null) {
    console.error(
      `${LOG} subagent definitions NOT loaded: ${COMPOSE_COMMAND} did not return a non-empty ` +
        `JSON object of definitions. ${DELEGATION_OFF}`
    )
  }
  return rendered
}

export function disallowedToolsForLaunch(
  declared: readonly string[],
  agentsJson: string | null
): readonly string[] {
  if (agentsJson !== null) return declared
  return [...declared, DELEGATION_TOOL]
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

interface InstructionsAnswer {
  readonly stdout: string
  readonly stderr: string
  readonly code: number
}

function commandPath(verb: string): string {
  return join(akashaRoot(), "tools", `${verb}.ts`)
}

async function runInstructions(verb: string, ceilingMs: number): Promise<InstructionsAnswer> {
  const root = akashaRoot()
  if (!existsSync(root))
    throw new Error(
      `${verb}: the akasha root ${root} is not there, so no command under it ` +
        "can be run. Nothing is wrong with bun. Set AKASHA_ROOT to a checkout."
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
