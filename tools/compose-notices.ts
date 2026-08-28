
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { sections } from "./lib/markdown.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots.ts"
import { fail } from "./lib/command.ts"

const DOCUMENT = "pages/notice/resume.notice.md"

const NOTICE_DEPTH = 2

const HELP = `bun tools/compose-notices.ts — render what a seat is told when it is put back to work

Every notice in \`${DOCUMENT}\`, as a JSON object of notice name to composed text. Callers
ask for them by name, so a section renamed here is a notice one of them no longer finds;
\`tools/audits/resume-notices.ts\` is what says so before a fleet meets it, for the names the
supervisor asks for.

Wrapping is the author's convenience and not part of the text: the lines of a paragraph
are joined with a space, and a blank line between paragraphs survives as one.

Usage:
  bun ~/repos/akasha/tools/compose-notices.ts [--out <path>]

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

export function render(body: string): string {
  return body
    .split(/\n[ \t]*\n/)
    .map((paragraph) =>
      paragraph
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join(" ")
    )
    .filter((paragraph) => paragraph !== "")
    .join("\n\n")
}

export function noticesIn(body: string): Readonly<Record<string, string>> {
  const notices: Record<string, string> = {}
  for (const section of sections(body, NOTICE_DEPTH)) {
    if (section.title in notices) {
      fail(`${DOCUMENT} declares \`${section.title}\` twice, so which body a seat receives is unsettled`)
    }
    notices[section.title] = render(section.body)
  }
  return notices
}

export function notices(): Readonly<Record<string, string>> {
  const absolute = `${rootFor(resolveRoots(), AKASHA)}/${DOCUMENT}`
  if (!existsSync(absolute)) {
    fail(`${absolute} is not there, so there is no notice to render`)
  }
  return noticesIn(readFileSync(absolute, "utf8"))
}

function main(): void {
  const { out } = parse(process.argv.slice(2))
  const json = `${JSON.stringify(notices(), null, 2)}\n`
  if (out === null) process.stdout.write(json)
  else writeFileSync(out, json)
}

if (import.meta.main) main()
