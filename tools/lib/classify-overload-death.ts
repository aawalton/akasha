
export const OVERLOAD_STATUS = 529

export interface OverloadReading {
  readonly detected: boolean
  readonly consecutive: number
}

function assistantRecords(text: string): Record<string, unknown>[] {
  const held: Record<string, unknown>[] = []
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: unknown
    try {
      line = JSON.parse(raw)
    } catch {
      continue
    }
    if (typeof line !== "object" || line === null || Array.isArray(line)) continue
    const record = line as Record<string, unknown>
    if (record.type === "assistant") held.push(record)
  }
  return held
}

function isOverload(record: Record<string, unknown>): boolean {
  return record.isApiErrorMessage === true && record.apiErrorStatus === OVERLOAD_STATUS
}

export function classifyOverloadDeath(text: string): OverloadReading {
  const assistants = assistantRecords(text)
  let consecutive = 0
  for (let at = assistants.length - 1; at >= 0; at--) {
    const one = assistants[at]
    if (one === undefined || !isOverload(one)) break
    consecutive += 1
  }
  return { detected: consecutive > 0, consecutive }
}
