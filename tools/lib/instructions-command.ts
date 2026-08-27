
import { existsSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "../../repo/roots/roots.ts"
import { shape } from "./shape.ts"

export { akashaRoot }

export const INSTRUCTIONS_CALL_CEILING_MS = 30_000

export interface InstructionsCall {
  readonly verb: string
  readonly args?: readonly string[]
  readonly stdin?: string
  readonly ceilingMs?: number
}

export interface InstructionsAnswer {
  readonly stdout: string
  readonly stderr: string
  readonly code: number
}

function commandPath(verb: string): string {
  return join(akashaRoot(), "tools", `${verb}.ts`)
}

export async function runInstructions(call: InstructionsCall): Promise<InstructionsAnswer> {
  const root = akashaRoot()
  if (!existsSync(root))
    throw new Error(
      `${call.verb}: the akasha root ${root} is not there, so no command under it ` +
        "can be run. Nothing is wrong with bun. Set AKASHA_ROOT to a checkout."
    )

  const ceilingMs = call.ceilingMs ?? INSTRUCTIONS_CALL_CEILING_MS
  const proc = Bun.spawn({
    cmd: [process.execPath, commandPath(call.verb), ...(call.args ?? [])],
    cwd: root,
    stdin: call.stdin === undefined ? "ignore" : new TextEncoder().encode(call.stdin),
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
      `${call.verb}: ${commandPath(call.verb)} was still running after ${ceilingMs}ms and was ` +
        "killed, so nothing it decides is decided. It is stuck rather than slow."
    )

  return { stdout, stderr, code }
}

export async function askInstructions(call: InstructionsCall): Promise<unknown> {
  const answer = await runInstructions(call)

  if (answer.code !== 0)
    throw new Error(
      `${call.verb}: ${commandPath(call.verb)} exited ${answer.code}, so nothing it decides ` +
        `is decided. It said: ${answer.stderr.trim() || "(nothing on stderr)"}`
    )

  try {
    return shape.json().parse(JSON.parse(answer.stdout))
  } catch (cause) {
    throw new Error(
      `${call.verb}: ${commandPath(call.verb)} exited 0 but did not answer in JSON, so its ` +
        `answer cannot be read. It printed: ${answer.stdout.slice(0, 200)}`,
      { cause }
    )
  }
}
