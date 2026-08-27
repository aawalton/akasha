const RUN_INSTRUCTION = /^\s*RUN\s+/i

const foldContinuations = (text: string): readonly string[] => {
  const out: string[] = []
  let held = ""
  for (const raw of text.split(/\r?\n/)) {
    const stripped = raw.replace(/^\s+/, "")
    if (held === "" && (stripped === "" || stripped.startsWith("#"))) continue
    const continues = raw.endsWith("\\")
    const body = continues ? raw.slice(0, raw.length - 1) : raw
    held = held === "" ? body : `${held} ${body.replace(/^\s+/, "")}`
    if (continues) continue
    out.push(held)
    held = ""
  }
  if (held !== "") out.push(held)
  return out
}

const OPERATORS: readonly string[] = ["&&", "||", ";", "|"]

const isOperator = (token: string): boolean => OPERATORS.includes(token)

const tokenize = (body: string): readonly string[] => {
  const tokens: string[] = []
  let current = ""
  let open = false
  let quote = ""
  let at = 0
  while (at < body.length) {
    const char = body.charAt(at)
    at += 1
    if (quote !== "") {
      if (char === "\\" && quote === '"' && at < body.length) {
        current += body.charAt(at)
        at += 1
        continue
      }
      if (char === quote) {
        quote = ""
        continue
      }
      current += char
      open = true
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      open = true
      continue
    }
    if (char === " " || char === "\t") {
      if (open) tokens.push(current)
      current = ""
      open = false
      continue
    }
    current += char
    open = true
  }
  if (open) tokens.push(current)
  return tokens
}

const segments = (tokens: readonly string[]): readonly (readonly string[])[] => {
  const out: string[][] = []
  let held: string[] = []
  for (const token of tokens) {
    if (isOperator(token)) {
      out.push(held)
      held = []
      continue
    }
    held.push(token)
  }
  out.push(held)
  return out
}

const isEntryOperand = (token: string): boolean => {
  if (token.startsWith("-")) return false
  return token.endsWith(".ts") || token.endsWith(".tsx")
}

const entriesInSegment = (tokens: readonly string[]): readonly string[] => {
  if (tokens[0] !== "bun" || tokens[1] !== "build") return []
  return tokens.slice(2).filter(isEntryOperand)
}

export const compiledEntries = (text: string): readonly string[] => {
  const found: string[] = []
  for (const instruction of foldContinuations(text)) {
    if (!RUN_INSTRUCTION.test(instruction)) continue
    const body = instruction.replace(RUN_INSTRUCTION, "")
    for (const segment of segments(tokenize(body))) {
      for (const entry of entriesInSegment(segment)) {
        if (!found.includes(entry)) found.push(entry)
      }
    }
  }
  return found
}
