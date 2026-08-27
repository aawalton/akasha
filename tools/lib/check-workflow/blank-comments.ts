export type CommentSyntax = "ts" | "shell"

export function blankComments(source: string, syntax: CommentSyntax): string {
  const out: string[] = []
  const templateBraceDepths: number[] = []
  let braceDepth = 0
  let state: "code" | "line-comment" | "block-comment" | "single" | "double" | "template" = "code"
  let i = 0

  while (i < source.length) {
    const c = source.charAt(i)
    const next = source.charAt(i + 1)

    if (state === "line-comment") {
      if (c === "\n") {
        out.push("\n")
        state = "code"
      } else out.push(" ")
      i++
      continue
    }

    if (state === "block-comment") {
      if (c === "*" && next === "/") {
        out.push("  ")
        state = "code"
        i += 2
        continue
      }
      out.push(c === "\n" ? "\n" : " ")
      i++
      continue
    }

    if (state === "single" || state === "double") {
      out.push(c)
      const escaping = syntax === "ts" || state === "double"
      if (c === "\\" && escaping && i + 1 < source.length) {
        out.push(next)
        i += 2
        continue
      }
      if (c === "\n") state = "code"
      else if (c === (state === "single" ? "'" : '"')) state = "code"
      i++
      continue
    }

    if (state === "template") {
      out.push(c)
      if (c === "\\" && i + 1 < source.length) {
        out.push(next)
        i += 2
        continue
      }
      if (c === "`") {
        state = "code"
        i++
        continue
      }
      if (c === "$" && next === "{") {
        out.push("{")
        templateBraceDepths.push(braceDepth)
        braceDepth++
        state = "code"
        i += 2
        continue
      }
      i++
      continue
    }

    if (syntax === "ts" && c === "/" && (next === "/" || next === "*")) {
      out.push("  ")
      state = next === "/" ? "line-comment" : "block-comment"
      i += 2
      continue
    }
    if (syntax === "shell" && c === "#" && (i === 0 || /\s/.test(source.charAt(i - 1)))) {
      out.push(" ")
      state = "line-comment"
      i++
      continue
    }
    if (c === "'" || c === '"') {
      out.push(c)
      state = c === "'" ? "single" : "double"
      i++
      continue
    }
    if (syntax === "ts" && c === "`") {
      out.push(c)
      state = "template"
      i++
      continue
    }
    if (c === "{") braceDepth++
    else if (c === "}") {
      braceDepth--
      const resume = templateBraceDepths.at(-1)
      if (resume !== undefined && braceDepth === resume) {
        templateBraceDepths.pop()
        state = "template"
      }
    }
    out.push(c)
    i++
  }

  return out.join("")
}

export function blankCode(source: string, syntax: CommentSyntax): string {
  const code = blankComments(source, syntax)
  const out: string[] = []
  for (let i = 0; i < source.length; i++) {
    const c = source.charAt(i)
    if (c === "\n") out.push("\n")
    else out.push(code.charAt(i) === c ? " " : c)
  }
  return out.join("")
}
