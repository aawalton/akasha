
import { basename } from "node:path"
import { fileStemOf } from "../../page/name/name"
import { attributesOf } from "../lib/attributes.ts"
import { isBareKeyboardPrompt } from "../lib/prompt-shape.ts"
import { hookAgentId } from "../lib/read-record.ts"
import { errandOf } from "../lib/seat-errand.ts"
import { writeSeatPage } from "../lib/seat-page.ts"
import { seatPageForAgent } from "../lib/seat-presence-read.ts"
import { statedNow } from "../lib/seat-stated.ts"

const PAGE_SUFFIX = ".md"

function statedFrom(fields: Record<string, unknown>): void {
  const prompt = fields["prompt"]
  if (typeof prompt !== "string" || !isBareKeyboardPrompt(prompt)) return
  const agent = hookAgentId(fields)
  if (agent === null) return
  if (errandOf(agent) !== null) return
  const page = seatPageForAgent(agent)
  if (page === null) return
  writeSeatPage(
    statedNow(agent, attributesOf(agent), {
      clear: [],
      errand: prompt,
      flex: null,
      initiative: null,
      mode: null,
      onCall: false,
      principal: null,
      registration: null,
    }),
    fileStemOf(page)
  )
}

async function main(): Promise<void> {
  let fields: Record<string, unknown> = {}
  try {
    const parsed: unknown = JSON.parse(await Bun.stdin.text())
    if (parsed === null || typeof parsed !== "object") return
    fields = parsed as Record<string, unknown>
  } catch {
    return
  }
  try {
    statedFrom(fields)
  } catch {
    return
  }
}

if (import.meta.main) await main()
