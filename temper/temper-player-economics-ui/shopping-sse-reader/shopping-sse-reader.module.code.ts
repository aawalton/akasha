import type { ShoppingPlan } from "@akasha/temper-shopping/ttc-shopping-types"
import { z } from "zod"

interface ProgressEvent {
  completed: number
  total: number
}

interface CompleteEvent {
  plan: ShoppingPlan
}

interface ErrorEvent {
  error: string
}

export interface DroppedFrame {
  readonly event: string
  readonly reason: "unparseable" | "schema-rejected"
}

export interface SseReadOutcome {
  readonly terminal: "complete" | "error" | "none"
  readonly dropped: readonly DroppedFrame[]
}

const progressEventSchema = z
  .object({ completed: z.number(), total: z.number() })
  .strict() satisfies z.ZodType<ProgressEvent>

const shoppingPlanShape = z.custom<ShoppingPlan>(
  (v) => typeof v === "object" && v !== null && "purchases" in v
)
const completeEventSchema = z.object({ plan: shoppingPlanShape }) satisfies z.ZodType<CompleteEvent>

const errorEventSchema = z.object({ error: z.string() }) satisfies z.ZodType<ErrorEvent>

export async function readSSEStream(
  response: Response,
  onProgress: (data: ProgressEvent) => void,
  onComplete: (data: CompleteEvent) => void,
  onError: (data: ErrorEvent) => void
): Promise<SseReadOutcome> {
  const reader = response.body?.getReader()
  if (!reader) {
    onError({ error: "No response body" })
    return { terminal: "error", dropped: [] }
  }

  const decoder = new TextDecoder()
  let buffer = ""
  let terminal: SseReadOutcome["terminal"] = "none"
  const dropped: DroppedFrame[] = []

  const handleFrame = (part: string) => {
    let event = ""
    let data = ""

    for (const line of part.split("\n")) {
      if (line.startsWith("event: ")) event = line.slice(7)
      else if (line.startsWith("data: ")) data = line.slice(6)
    }

    if (event === "" || data === "") return

    try {
      if (event === "progress") {
        const result = progressEventSchema.safeParse(JSON.parse(data))
        if (!result.success) dropped.push({ event, reason: "schema-rejected" })
        else onProgress(result.data)
      } else if (event === "complete") {
        const result = completeEventSchema.safeParse(JSON.parse(data))
        if (!result.success) dropped.push({ event, reason: "schema-rejected" })
        else {
          terminal = "complete"
          onComplete(result.data)
        }
      } else if (event === "error") {
        const result = errorEventSchema.safeParse(JSON.parse(data))
        if (!result.success) dropped.push({ event, reason: "schema-rejected" })
        else {
          terminal = "error"
          onError(result.data)
        }
      }
    } catch {
      dropped.push({ event, reason: "unparseable" })
    }
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      const parts = buffer.split("\n\n")
      buffer = parts.pop() ?? ""

      for (const part of parts) {
        if (part.trim() === "") continue
        handleFrame(part)
      }
    }

    buffer += decoder.decode()
    if (buffer.trim() !== "") handleFrame(buffer)
  } finally {
    reader.releaseLock()
  }

  return { terminal, dropped }
}
