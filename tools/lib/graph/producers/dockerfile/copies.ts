import { posix } from "node:path"

const COPY_INSTRUCTION = /^\s*COPY\s+/i

const FROM_FLAG = "--from"

export const foldContinuations = (text: string): readonly string[] => {
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

const sourcesIn = (body: string): readonly string[] => {
  const tokens = tokenize(body)
  let at = 0
  while (at < tokens.length && (tokens[at] ?? "").startsWith("--")) {
    const flag = tokens[at] ?? ""
    if (flag === FROM_FLAG || flag.startsWith(`${FROM_FLAG}=`)) return []
    at += 1
  }
  const operands = tokens.slice(at)
  if (operands.length < 2) return []
  return operands.slice(0, operands.length - 1)
}

export const copySources = (text: string): readonly string[] => {
  const found: string[] = []
  for (const instruction of foldContinuations(text)) {
    if (!COPY_INSTRUCTION.test(instruction)) continue
    for (const source of sourcesIn(instruction.replace(COPY_INSTRUCTION, ""))) {
      if (!found.includes(source)) found.push(source)
    }
  }
  return found
}

const trimTrailingSlash = (path: string): string => path.replace(/\/+$/, "")

const insideRepo = (path: string): string | null => {
  const at = posix.normalize(path)
  if (at === "." || at === "/") return ""
  if (at === ".." || at.startsWith("../")) return null
  return trimTrailingSlash(at)
}

export const candidatePaths = (recipePath: string, source: string): readonly string[] => {
  if (source.startsWith("/")) return []
  const dir = recipeDir(recipePath)
  const held: string[] = []
  for (const at of [insideRepo(posix.join(dir, source)), insideRepo(source)]) {
    if (at === null || held.includes(at)) continue
    held.push(at)
  }
  return held
}

export const recipeDir = (recipePath: string): string => {
  const dir = posix.dirname(recipePath)
  return dir === "." ? "" : dir
}
