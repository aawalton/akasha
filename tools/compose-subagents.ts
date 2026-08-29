export const tool = {
  summary: "Render the delegate definitions the `claude --agents` flag takes",
  path: "seat subagents",
} as const
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { render } from "./compose-notices.ts"
import { bullets, sections } from "./lib/markdown.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots"
import { fail } from "./lib/command.ts"

const FOLDER = "pages/subagent-kind"

const SECTION_DEPTH = 1

const SEPARATOR = " — "

const HELP = `bun tools/compose-subagents.ts — render the delegate definitions the client takes

Every kind in \`${FOLDER}\`, as the JSON object the client's \`--agents\` flag takes: a map
of the \`subagent-type\` a seat dispatches by to its definition, its prompt, and the model it
runs on where it states one.

A kind's definition is what a dispatcher reads to choose, so the sentence after the dash is
what lands in the map, and the bolded term is left behind.

Wrapping is the author's convenience and not part of the text, exactly as it is for
\`./compose-notices.ts\`: the lines of a paragraph are joined with a space, and a blank line
between paragraphs survives as one.

Usage:
  bun ~/repos/akasha/tools/compose-subagents.ts [--out <path>]

Flags:
  --out <path>   Write there rather than to stdout.
  --help         This.
`

function parse(argv: readonly string[]): { readonly out: string | null } {
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--help") {
      process.stdout.write(HELP)
      process.exit(0)
    }
    if (arg === "--out") {
      const value = argv[i + 1]
      if (value === undefined) fail("`--out` takes a value")
      i += 1
      out = value
    } else fail(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  return { out }
}

export type Definition = { description: string; prompt: string; model?: string }

export type Kind = { readonly path: string; readonly body: string }

function sectionOf(kind: Kind, heading: string): string | null {
  const found = sections(kind.body, SECTION_DEPTH).find((section) => section.title === heading)
  return found === undefined ? null : found.body
}

function describe(kind: Kind): string {
  const section = sectionOf(kind, "Definition")
  if (section === null) throw new Error(`${kind.path} has no Definition, and that is what a dispatcher reads to choose`)
  const first = bullets(section)[0]
  if (first === undefined) throw new Error(`${kind.path} has an empty Definition, and that is what a dispatcher reads to choose`)
  const at = first.text.indexOf(SEPARATOR)
  if (at === -1) throw new Error(`${kind.path} writes its Definition without \`${SEPARATOR.trim()}\`, so nothing separates the term from what it means`)
  const description = first.text.slice(at + SEPARATOR.length).trim()
  if (description === "") throw new Error(`${kind.path} says nothing after \`${SEPARATOR.trim()}\`, so a dispatcher is told only the term`)
  return description
}

function brief(kind: Kind): string {
  const section = sectionOf(kind, "Prompt")
  if (section === null) throw new Error(`${kind.path} has no Prompt, and a subagent boots on that alone`)
  const prompt = render(section)
  if (prompt === "") throw new Error(`${kind.path} has an empty Prompt, and a subagent boots on that alone`)
  return prompt
}

export function kindsIn(kinds: readonly Kind[]): Readonly<Record<string, Definition>> {
  const definitions: Record<string, Definition> = {}
  for (const kind of kinds) {
    const name = textField(parseFrontmatter(kind.body), "subagent-type")
    if (name === null || name === "") {
      throw new Error(`${kind.path} states no \`subagent-type\`, so nothing names it where a seat dispatches`)
    }
    if (name in definitions) {
      throw new Error(`\`${name}\` is the \`subagent-type\` of two kinds, so which briefing it carries is unsettled`)
    }
    const model = textField(parseFrontmatter(kind.body), "model")
    const description = describe(kind)
    const prompt = brief(kind)
    definitions[name] = model === null || model === "" ? { description, prompt } : { description, prompt, model }
  }
  return definitions
}

function main(): void {
  const { out } = parse(process.argv.slice(2))
  const folder = `${rootFor(resolveRoots(), AKASHA)}/${FOLDER}`
  if (!existsSync(folder)) fail(`${folder} is not there, so there is no kind to render`)
  const kinds = readdirSync(folder)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => ({ path: `${FOLDER}/${name}`, body: readFileSync(`${folder}/${name}`, "utf8") }))
  if (kinds.length === 0) fail(`${folder} holds no kind to render`)
  let definitions: Readonly<Record<string, Definition>>
  try {
    definitions = kindsIn(kinds)
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
  const json = `${JSON.stringify(definitions, null, 2)}\n`
  if (out === null) process.stdout.write(json)
  else writeFileSync(out, json)
}

if (import.meta.main) main()
