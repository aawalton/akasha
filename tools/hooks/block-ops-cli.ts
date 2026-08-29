const REASON =
  "The ops CLI is turned off. Use the ordinary tools instead: read and write files " +
  "with the file tools, search with ripgrep, run git directly. Nothing records reading " +
  "any more, and nothing is gated on it."

function segmentsOf(command: string): string[] {
  const parts: string[] = []
  let current = ""
  let quote: string | null = null
  for (let i = 0; i < command.length; i += 1) {
    const ch = command[i]
    if (quote !== null) {
      if (ch === "\\" && quote === '"') {
        current += ch + (command[i + 1] ?? "")
        i += 1
        continue
      }
      if (ch === quote) quote = null
      current += ch
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      current += ch
      continue
    }
    if (ch === ";" || ch === "\n" || ch === "|" || ch === "&" || ch === "(" || ch === ")") {
      parts.push(current)
      current = ""
      continue
    }
    if (ch === "$" && command[i + 1] === "(") {
      parts.push(current)
      current = ""
      i += 1
      continue
    }
    if (ch === "`") {
      parts.push(current)
      current = ""
      continue
    }
    current += ch
  }
  parts.push(current)
  return parts
}

function invokesOps(segment: string): boolean {
  for (const word of segment.trim().split(/\s+/)) {
    if (word === "") continue
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(word)) continue
    if (word === "command" || word === "builtin" || word === "exec" || word === "sudo") continue
    const name = word.slice(word.lastIndexOf("/") + 1)
    return name === "ops"
  }
  return false
}

async function main(): Promise<number> {
  let command = ""
  try {
    const payload = JSON.parse(await Bun.stdin.text()) as {
      tool_input?: { command?: unknown }
    }
    const raw = payload.tool_input?.command
    command = typeof raw === "string" ? raw : ""
  } catch {
    return 0
  }
  if (command === "") return 0
  if (!segmentsOf(command).some(invokesOps)) return 0
  process.stderr.write(`${REASON}\n`)
  console.log(JSON.stringify({ decision: "block", reason: REASON }))
  return 2
}

if (import.meta.main) process.exit(await main())
