
import { readdir, stat } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { shape } from "./shape.ts"

export interface ToolUse {
  readonly id: string
  readonly name: string
  readonly input: string
}

export interface ToolResult {
  readonly id: string
  readonly text: string
  readonly isError: boolean
}

export interface TranscriptRecord {
  readonly kind: "assistant" | "prompt" | "turn-end" | "other"
  readonly timestampMs: number | null
  readonly stopReason: string | null
  readonly endsWithToolUse: boolean
  readonly text: string
  readonly commands: readonly string[]
  readonly toolInputs: readonly string[]
  readonly toolUses: readonly ToolUse[]
  readonly toolResults: readonly ToolResult[]
  readonly startedTaskId: string | null
  readonly notifiedTaskIds: readonly string[]
}

const PROJECTS_ROOT = join(homedir(), ".claude", "projects")

const TASK_ID = /<task-id>([^<]+)<\/task-id>/g

type Json = Record<string, unknown>

const asObject = (v: unknown): Json | null =>
  typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Json) : null

const asArray = (v: unknown): readonly unknown[] => (Array.isArray(v) ? v : [])

function armedWakeId(result: Json | null): string | null {
  if (result === null) return null
  const bg = result.backgroundTaskId
  if (typeof bg === "string" && bg.length > 0) return bg
  const agentId = result.agentId
  if (result.isAsync === true && typeof agentId === "string" && agentId.length > 0) return agentId
  const taskId = result.taskId
  if (result.timeoutMs !== undefined && typeof taskId === "string" && taskId.length > 0)
    return taskId
  return null
}

function textOf(content: unknown): string {
  if (typeof content === "string") return content
  return asArray(content)
    .map((block) => {
      const b = asObject(block)
      return b !== null && b.type === "text" && typeof b.text === "string" ? b.text : ""
    })
    .join(" ")
}

function resultTextOf(content: unknown): string {
  if (typeof content === "string") return content
  return asArray(content)
    .map((block) => {
      const b = asObject(block)
      return b !== null && typeof b.text === "string" ? b.text : ""
    })
    .join(" ")
}

export const transcriptLineSchema = shape
  .object({
    type: shape.string().optional(),
    subtype: shape.string().optional(),
    timestamp: shape.string().optional(),
    message: shape.unknown().optional(),
    toolUseResult: shape.unknown().optional(),
  })
  .passthrough()

export function normalizeRecord(raw: unknown): TranscriptRecord {
  const record = asObject(raw) ?? {}
  const message = asObject(record.message)
  const timestamp = typeof record.timestamp === "string" ? Date.parse(record.timestamp) : Number.NaN
  const notified = [...textOf(message?.content).matchAll(TASK_ID)].flatMap((m) =>
    m[1] === undefined ? [] : [m[1]]
  )

  const base: Omit<TranscriptRecord, "kind"> = {
    timestampMs: Number.isNaN(timestamp) ? null : timestamp,
    stopReason: null,
    endsWithToolUse: false,
    text: "",
    commands: [],
    toolInputs: [],
    toolUses: [],
    toolResults: [],
    startedTaskId: armedWakeId(asObject(record.toolUseResult)),
    notifiedTaskIds: notified,
  }

  if (record.type === "system" && record.subtype === "stop_hook_summary") {
    return { ...base, kind: "turn-end" }
  }
  if (record.type !== "assistant" || message === null) {
    const userText = message === null ? "" : textOf(message.content)
    const results = asArray(message?.content).flatMap((block) => {
      const b = asObject(block)
      if (b === null || b.type !== "tool_result") return []
      const id = typeof b.tool_use_id === "string" ? b.tool_use_id : ""
      return [{ id, text: resultTextOf(b.content), isError: b.is_error === true }]
    })
    if (record.type === "user" && results.length === 0 && userText.trim().length > 0)
      return { ...base, kind: "prompt", text: userText }
    return { ...base, kind: "other", toolResults: results }
  }

  const commands: string[] = []
  const toolInputs: string[] = []
  const toolUses: ToolUse[] = []
  let endsWithToolUse = false
  for (const block of asArray(message.content)) {
    const b = asObject(block)
    if (b === null || b.type !== "tool_use") continue
    endsWithToolUse = true
    const input = asObject(b.input) ?? {}
    if (b.name === "Bash" && typeof input.command === "string") commands.push(input.command)
    toolInputs.push(JSON.stringify(input))
    toolUses.push({
      id: typeof b.id === "string" ? b.id : "",
      name: typeof b.name === "string" ? b.name : "tool",
      input: JSON.stringify(input),
    })
  }

  return {
    ...base,
    kind: "assistant",
    stopReason: typeof message.stop_reason === "string" ? message.stop_reason : null,
    endsWithToolUse,
    text: textOf(message.content),
    commands,
    toolInputs,
    toolUses,
  }
}

async function listDir(dir: string) {
  try {
    return await readdir(dir, { withFileTypes: true, encoding: "utf8" })
  } catch {
    return []
  }
}

export async function scanTranscripts(
  windowStartMs: number
): Promise<readonly { sessionId: string; path: string }[]> {
  const slugs = (await listDir(PROJECTS_ROOT)).filter((e) => e.isDirectory()).map((e) => e.name)

  const out: { sessionId: string; path: string }[] = []
  for (const slug of slugs) {
    const dir = join(PROJECTS_ROOT, slug)
    for (const entry of await listDir(dir)) {
      if (!entry.isFile() || !entry.name.endsWith(".jsonl")) continue
      const path = join(dir, entry.name)
      try {
        const st = await stat(path)
        if (st.mtimeMs < windowStartMs) continue
      } catch {
        continue
      }
      out.push({ sessionId: basename(entry.name, ".jsonl"), path })
    }
  }
  return out
}
