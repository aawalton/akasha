import type { Comment } from "./comments.ts"

export const FORMS_DOC = "pages/list/code-comment-forms.list.md"
export const DOMAIN_DOC = "pages/domain/code-comment.domain.md"

export type Klass = "form" | "candidate" | "instruction" | "prose"

export interface Form {
  readonly handle: string
  readonly pattern: RegExp
  readonly everyLine?: boolean
  readonly onlyWhere?: (comment: Comment, relPath: string) => boolean
}

export class FormUnrecognised extends Error {}

export function directivesIn(comment: Comment): readonly string[] {
  const raw = comment.raw
  if (raw.startsWith("#!")) return [raw.trim()]
  if (raw.startsWith("//")) return [raw.slice(2).trim()]
  if (raw.startsWith("#")) return [raw.slice(1).trim()]
  if (raw.startsWith("/*")) {
    return raw
      .replace(/^\/\*+/, "")
      .replace(/\*+\/$/, "")
      .split("\n")
      .map((line) => line.replace(/^\s*\*+\s?/, "").trim())
      .filter((line) => line !== "")
  }
  return []
}

export function directiveIn(comment: Comment): string | null {
  const said = directivesIn(comment)
  return said.length === 1 ? (said[0] as string) : null
}

const RECOGNISERS: readonly Form[] = [
  { handle: "shebang", pattern: /^#!/, onlyWhere: (comment) => comment.line === 1 },
  { handle: "expect-error", pattern: /^@ts-expect-error\b/ },
  { handle: "eslint suppression", pattern: /^eslint-(disable|enable)\b/ },
  { handle: "biome suppression", pattern: /^biome-ignore\b/ },
  { handle: "shellcheck directive", pattern: /^shellcheck (disable|enable|external-sources|shell|source-path|source)=/ },
  { handle: "triple-slash reference", pattern: /^\/\s*<reference\b/ },
  { handle: "no-self annotation", pattern: /^@noSelfInFile\b/ },
  { handle: "js type", pattern: /^@type\b/, onlyWhere: (_comment, relPath) => relPath.endsWith(".js") },
  { handle: "js satisfies", pattern: /^@satisfies\b/, onlyWhere: (_comment, relPath) => relPath.endsWith(".js") },
  { handle: "deprecation", pattern: /^@deprecated\b/ },
  { handle: "source map", pattern: /^#?\s*sourceMappingURL=/ },
]

export function recognises(form: Form, comment: Comment, relPath: string): boolean {
  const said = form.everyLine === true ? directivesIn(comment) : directivesOf(comment)
  if (said.length === 0 || !said.every((one) => form.pattern.test(one))) return false
  return form.onlyWhere === undefined || form.onlyWhere(comment, relPath)
}

function directivesOf(comment: Comment): readonly string[] {
  const directive = directiveIn(comment)
  return directive === null ? [] : [directive]
}

export function handlesIn(listBody: string): readonly string[] {
  const handles: string[] = []
  let inList = false
  for (const line of listBody.split("\n")) {
    if (line.startsWith("# ")) {
      inList = line.trim() === "# List"
      continue
    }
    if (!inList) continue
    const item = /^- \*\*(.+?)\*\*/.exec(line)
    if (item !== null) handles.push(item[1] as string)
  }
  return handles
}

export function formsFrom(listBody: string): readonly Form[] {
  const handles = handlesIn(listBody)
  if (handles.length === 0) {
    throw new FormUnrecognised(`${FORMS_DOC} lists no form, so every comment would be a violation`)
  }
  const unrecognised = handles.filter((handle) => !RECOGNISERS.some((form) => form.handle === handle))
  if (unrecognised.length > 0) {
    throw new FormUnrecognised(
      `${FORMS_DOC} names ${unrecognised.map((handle) => `\`${handle}\``).join(", ")}, and nothing here recognises that shape in a file — write a recogniser beside the others`
    )
  }
  return RECOGNISERS.filter((form) => handles.includes(form.handle))
}

export const PRAGMA_MARKERS: readonly string[] = [
  "@ts-",
  "eslint",
  "biome-",
  "oxlint",
  "prettier-ignore",
  "shellcheck ",
  "noqa",
  "v8 ignore",
  "c8 ignore",
  "istanbul ignore",
  "sourceURL",
  "@license",
  "@preserve",
  "@jsx",
  "@type",
  "@satisfies",
  "@module",
  "<reference",
  "deno-lint",
  "type: ignore",
  "vim:",
  "#!",
]

function looksParsed(comment: Comment): boolean {
  const directive = directiveIn(comment)
  if (directive === null) return false
  const bare = directive.replace(/^[/#]+\s*/, "")
  return PRAGMA_MARKERS.some((marker) => directive.startsWith(marker) || bare.startsWith(marker))
}

const INSTRUCTION_WORDS = /\b(never|always|must|do not|don't|cannot|shall|should|prefer|avoid|instead of)\b/i

const IMPERATIVES = new Set([
  "add",
  "ask",
  "avoid",
  "bind",
  "call",
  "check",
  "delete",
  "derive",
  "do",
  "ensure",
  "fix",
  "keep",
  "land",
  "leave",
  "make",
  "never",
  "note",
  "prefer",
  "put",
  "read",
  "remove",
  "report",
  "run",
  "see",
  "set",
  "take",
  "treat",
  "use",
  "wait",
  "write",
])

function opensImperatively(raw: string): boolean {
  for (const line of raw.split("\n")) {
    const words = line.replace(/^[\s/*#-]+/, "").split(/\s+/)
    const first = (words[0] ?? "").toLowerCase().replace(/[^a-z']/g, "")
    if (first === "") continue
    if (IMPERATIVES.has(first)) return true
  }
  return false
}

export function classify(comment: Comment, relPath: string, forms: readonly Form[]): Klass {
  if (forms.some((form) => recognises(form, comment, relPath))) return "form"
  if (looksParsed(comment)) return "candidate"
  if (INSTRUCTION_WORDS.test(comment.raw) || opensImperatively(comment.raw)) return "instruction"
  return "prose"
}
