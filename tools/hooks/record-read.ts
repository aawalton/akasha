
import { readFileSync } from "node:fs"
import { blobId } from "../../repo/git/git.ts"
import { countLines, DEFAULT_READ_LIMIT, recordingAgentId, recordRead } from "../lib/read-record.ts"
import { canonicalize, isInside } from "../../repo/path/path"
import { resolveRoots } from "../../repo/roots/roots"

function positiveInteger(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const agent = recordingAgentId(fields)
  if (agent === null) return
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return
  const call = input as Record<string, unknown>
  const filePath = call.file_path
  if (typeof filePath !== "string" || filePath === "") return

  const resolved = canonicalize(filePath)
  const memory = resolveRoots().memory
  if (memory === undefined || !isInside(memory, resolved)) return

  try {
    const bytes = readFileSync(resolved)
    const lines = countLines(new TextDecoder().decode(bytes))
    const start = positiveInteger(call.offset, 1)
    const end = Math.min(lines, start + positiveInteger(call.limit, DEFAULT_READ_LIMIT) - 1)
    if (start !== 1 || end < lines) return
    recordRead(agent, resolved, Date.now(), blobId(bytes))
  } catch {
  }
}

await main()
