export interface MdPathLink {
  target: string
  fragment: string | null
  line: number
}

const MD_LINK_RE = /(?<!\\)!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

const SKIP_SCHEMES: readonly string[] = [
  "http://",
  "https://",
  "mailto:",
  "tel:",
  "ftp://",
  "data:",
]

const FENCE_RE = /^\s*(```|~~~)/

const shouldSkip = (target: string): boolean => {
  if (target.startsWith("<")) return true
  if (target.includes("${")) return true
  if (target.includes("*") || target.includes("?") || target.includes("{")) return true
  for (const scheme of SKIP_SCHEMES) {
    if (target.startsWith(scheme)) return true
  }
  const lastSlash = target.lastIndexOf("/")
  const basename = lastSlash === -1 ? target : target.slice(lastSlash + 1)
  if (basename.length === 0) return true
  if (!basename.includes(".")) return true
  return false
}

const buildFenceMask = (lines: readonly string[]): readonly boolean[] => {
  const mask = new Array<boolean>(lines.length).fill(false)
  let inside = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? ""
    if (FENCE_RE.test(line)) {
      mask[i] = true
      inside = !inside
      continue
    }
    mask[i] = inside
  }
  return mask
}

const maskInlineCode = (line: string): string => {
  const out: string[] = []
  let inside = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === "\\" && line[i + 1] === "`") {
      out.push("\\`")
      i++
      continue
    }
    if (ch === "`") {
      inside = !inside
      out.push(" ")
      continue
    }
    out.push(inside ? " " : (ch ?? ""))
  }
  return out.join("")
}

export const parseMdLinks = (source: string): readonly MdPathLink[] => {
  const lines = source.split("\n")
  const fenceMask = buildFenceMask(lines)
  const out: MdPathLink[] = []
  for (let i = 0; i < lines.length; i++) {
    if (fenceMask[i]) continue
    const lineText = lines[i]
    if (lineText === undefined) continue
    const masked = maskInlineCode(lineText)
    for (const match of masked.matchAll(MD_LINK_RE)) {
      const raw = match[1]
      if (raw === undefined) continue
      const fragmentIdx = raw.indexOf("#")
      const target = fragmentIdx === -1 ? raw : raw.slice(0, fragmentIdx)
      const rawFragment = fragmentIdx === -1 ? "" : raw.slice(fragmentIdx + 1)
      const fragment = rawFragment === "" ? null : rawFragment
      if (target === "") {
        if (fragment !== null) out.push({ target, fragment, line: i + 1 })
        continue
      }
      if (shouldSkip(target)) continue
      out.push({ target, fragment, line: i + 1 })
    }
  }
  return out
}
