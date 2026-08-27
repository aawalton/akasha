export const tool = {
  summary: "Answer which of the needles asked for appear in which of the paths asked about",
  repos: ["instructions"],
} as const

import { readFileSync } from "node:fs"
import { outOfBounds } from "../repo/path/path"
import { resolveRoots } from "../repo/roots/roots"
import { fail } from "./lib/command.ts"

const HELP = `bun tools/holds.ts — which of the needles asked for appear in which of the paths asked about

Takes one JSON request on stdin and answers one JSON object on stdout. It knows nothing
about what is being looked for: it deletes what the request tells it to delete, looks for
the strings the request hands it, and reports which ones survived.

That is the whole of the contract, and it is why the caller can hold the predicate. A
consumer in the code repository may not open a file in this tree by path, and a second
spelling of its predicate here would be a second binding statement of one rule. So the
question arrives whole and this answers it.

Request:

  {"views":   {"<name>": [{"pattern": "<regex>", "flags": "gm"}]},
   "needles": [{"id": "<id>", "view": "<name>", "text": "<literal>"}],
   "paths":   ["tools/commands/branch/start.ts"]}

Each view is applied to a file's text in order, every match of every pattern replaced with
nothing. A needle is then looked for as a plain substring in the view it names.

Answer:

  {"paths": [{"path": "tools/commands/branch/start.ts", "found": ["<id>", ...]}]}

Every path asked about comes back, in the order it was asked about, spelled exactly as it
was asked about. \`found\` holds the ids of the needles present, in request order.

Paths are taken against this repository's root and refused where they leave it. A path
that cannot be read exits 1 naming it, and so does a needle naming a view the request does
not define — never an empty \`found\`, which would say the file holds none of them.

Usage:
  bun tools/holds.ts --json < request.json
  ops instructions holds --json < request.json

Environment:
  INSTRUCTIONS_ROOT  Which checkout the paths are taken against. Defaults to this file's own repo.

Exit codes:
  0  every path was read and answered for
  1  the request was not the shape above, or a path could not be read
`

interface ViewStep {
  readonly pattern: string
  readonly flags: string
}

interface Needle {
  readonly id: string
  readonly view: string
  readonly text: string
}

interface Request {
  readonly views: Readonly<Record<string, readonly ViewStep[]>>
  readonly needles: readonly Needle[]
  readonly paths: readonly string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function stringField(holder: Record<string, unknown>, key: string, where: string): string {
  const value = holder[key]
  if (typeof value !== "string") fail(`${where} needs a string \`${key}\``)
  return value
}

function parseViews(raw: unknown): Readonly<Record<string, readonly ViewStep[]>> {
  if (!isRecord(raw)) fail("`views` must be an object of view name to steps")
  const views: Record<string, readonly ViewStep[]> = {}
  for (const [name, steps] of Object.entries(raw)) {
    if (!Array.isArray(steps)) fail(`view \`${name}\` must be an array of steps`)
    views[name] = steps.map((step: unknown) => {
      if (!isRecord(step)) fail(`view \`${name}\` holds a step that is not an object`)
      return {
        pattern: stringField(step, "pattern", `a step of view \`${name}\``),
        flags: stringField(step, "flags", `a step of view \`${name}\``),
      }
    })
  }
  return views
}

function parseNeedles(raw: unknown): readonly Needle[] {
  if (!Array.isArray(raw)) fail("`needles` must be an array")
  return raw.map((one: unknown) => {
    if (!isRecord(one)) fail("`needles` holds an entry that is not an object")
    return {
      id: stringField(one, "id", "a needle"),
      view: stringField(one, "view", "a needle"),
      text: stringField(one, "text", "a needle"),
    }
  })
}

function parsePaths(raw: unknown): readonly string[] {
  if (!Array.isArray(raw)) fail("`paths` must be an array")
  return raw.map((one: unknown) => {
    if (typeof one !== "string") fail("`paths` holds an entry that is not a string")
    const bad = outOfBounds(one)
    if (bad !== null) fail(bad)
    return one
  })
}

function parseRequest(text: string): Request {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch (err) {
    fail(`the request was not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
  if (!isRecord(raw)) fail("the request must be a JSON object")
  return {
    views: parseViews(raw.views),
    needles: parseNeedles(raw.needles),
    paths: parsePaths(raw.paths),
  }
}

function render(body: string, request: Request): ReadonlyMap<string, string> {
  const rendered = new Map<string, string>()
  for (const [name, steps] of Object.entries(request.views)) {
    let text = body
    for (const step of steps) {
      let pattern: RegExp
      try {
        pattern = new RegExp(step.pattern, step.flags)
      } catch (err) {
        fail(
          `view \`${name}\` holds a step that is not a regular expression: ` +
            `${err instanceof Error ? err.message : String(err)}`
        )
      }
      text = text.replace(pattern, "")
    }
    rendered.set(name, text)
  }
  return rendered
}

function foundIn(body: string, request: Request): readonly string[] {
  const rendered = render(body, request)
  const found: string[] = []
  for (const needle of request.needles) {
    const text = rendered.get(needle.view)
    if (text === undefined) fail(`needle \`${needle.id}\` names view \`${needle.view}\`, undefined here`)
    if (text.includes(needle.text)) found.push(needle.id)
  }
  return found
}

export function answer(request: Request, read: (relPath: string) => string): string {
  const paths = request.paths.map((relPath) => ({
    path: relPath,
    found: foundIn(read(relPath), request),
  }))
  return `${JSON.stringify({ paths })}\n`
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  const root = resolveRoots().instructions
  const request = parseRequest(await Bun.stdin.text())
  process.stdout.write(
    answer(request, (relPath) => {
      try {
        return readFileSync(`${root}/${relPath}`, "utf8")
      } catch (err) {
        fail(`${relPath} could not be read under ${root}: ${err instanceof Error ? err.message : String(err)}`)
      }
    })
  )
}
