export const extractPackageName = (specifier: string): string | null => {
  if (specifier === "") return null
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null
  if (specifier.startsWith("node:") || specifier.startsWith("bun:")) return null
  if (specifier.startsWith("@/") || specifier.startsWith("~")) return null
  if (specifier.includes("${")) return null
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    if (parts.length < 2) return null
    const scopePart = parts[0]
    const namePart = parts[1]
    if (scopePart === undefined || namePart === undefined) return null
    const scope = scopePart.slice(1)
    if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(scope)) return null
    return `${scopePart}/${namePart}`
  }
  const name = specifier.split("/")[0]
  if (name === undefined) return null
  if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(name)) return null
  return name
}

const splitShellSubcommands = (cmd: string): readonly string[] => {
  const out: string[] = []
  let current = ""
  let i = 0
  while (i < cmd.length) {
    const c = cmd[i]
    const n = cmd[i + 1]
    if ((c === "&" && n === "&") || (c === "|" && n === "|")) {
      if (current.trim() !== "") out.push(current.trim())
      current = ""
      i += 2
      continue
    }
    if (c === ";" || c === "|") {
      if (current.trim() !== "") out.push(current.trim())
      current = ""
      i++
      continue
    }
    current += c
    i++
  }
  if (current.trim() !== "") out.push(current.trim())
  return out
}

const stripVersionSuffix = (name: string): string => {
  if (name.startsWith("@")) {
    const at = name.indexOf("@", 1)
    if (at > 0) return name.slice(0, at)
    return name
  }
  const at = name.indexOf("@")
  return at === -1 ? name : name.slice(0, at)
}

const firstCommandToken = (cmd: string): string | null => {
  const trimmed = cmd.trim()
  if (trimmed === "") return null
  const tokens = trimmed.split(/\s+/)
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t === undefined) break
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(t)) {
      i++
      continue
    }
    break
  }
  if (i >= tokens.length) return null
  let t = tokens[i]
  if (t === undefined) return null
  if (t.includes("/")) {
    const parts = t.split("/")
    t = parts[parts.length - 1] ?? t
  }
  if (t === "") return null
  return t
}

export const commandNamesFromScript = (script: string): readonly string[] => {
  const out: string[] = []
  for (const sub of splitShellSubcommands(script)) {
    const first = firstCommandToken(sub)
    if (first == null) continue
    out.push(first)
    const tokens = sub.trim().split(/\s+/)
    let idx = 0
    while (idx < tokens.length) {
      const tok = tokens[idx]
      if (tok === undefined || !/^[A-Za-z_][A-Za-z0-9_]*=/.test(tok)) break
      idx++
    }
    if (idx >= tokens.length) continue
    const cmd = tokens[idx]
    if (cmd === undefined) continue
    const base = cmd.includes("/") ? cmd.split("/").pop() : cmd
    if (base === "bunx" || base === "npx") {
      const next = tokens[idx + 1]
      if (next != null && !next.startsWith("-")) {
        out.push(stripVersionSuffix(next))
      }
    } else if (base === "bun" || base === "npm" || base === "yarn" || base === "pnpm") {
      const sub1 = tokens[idx + 1]
      const sub2 = tokens[idx + 2]
      if ((sub1 === "x" || sub1 === "run") && sub2 != null && !sub2.startsWith("-")) {
        if (sub1 === "x") out.push(stripVersionSuffix(sub2))
      }
    }
  }
  return out
}
