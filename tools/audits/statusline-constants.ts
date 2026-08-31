import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check, RepoView } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "statusline-constants"

const SCRIPT = "akasha/code-system/shell-script/shell-scripts/statusline.shell-script.shell.sh"

const READER = "tools/lib/seat-page-read.sh"

const STORE = "tools/lib/attributes.ts"

const SCRIPT_SLOTS = /^SEAT_RENDER=\(([^)]*)\)/m
const STORE_ATTRIBUTES = /export const ATTRIBUTES = \[([^\]]*)\]/
const STORE_ASSIGNMENTS = /export const ASSIGNMENTS = \[([^\]]*)\]/

const VALUED: ReadonlySet<string> = new Set(["initiative", "on-call"])

interface Pair {
  readonly spelled: string
  readonly source: string
  readonly declared: string
}

const PAGE_KEYS: readonly Pair[] = [
  { spelled: "SEAT_MODE_KEY", source: STORE, declared: "START_MODE_KEY" },
  {
    spelled: "SEAT_INITIATIVE_KEY",
    source: "tools/lib/seat-initiative.ts",
    declared: "INITIATIVE_SLUG_KEY",
  },
]

function declaration(name: string): RegExp {
  return new RegExp(`^(?:export )?const ${name} = "([^"]*)"`, "m")
}

function assignment(name: string): RegExp {
  return new RegExp(`^${name}="([^"]*)"`, "m")
}

function readOr(repo: RepoView, relPath: string): string | null {
  try {
    return repo.read(relPath)
  } catch {
    return null
  }
}

function capture(body: string, pattern: RegExp): string | null {
  return pattern.exec(body)?.[1] ?? null
}

function slugSlots(body: string): string {
  return body
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "" && !VALUED.has(word))
    .join(" ")
}

function tsSlots(body: string): string {
  return [...body.matchAll(/"([^"]*)"/g)].map((found) => found[1]).join(" ")
}

export const statuslineConstants: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const sides = [SCRIPT, READER, STORE, ...PAGE_KEYS.map((pair) => pair.source)]
  const bodies = new Map<string, string>()
  for (const relPath of sides) {
    if (bodies.has(relPath)) continue
    const body = readOr(repo, relPath)
    if (body === null) {
      return {
        ...judge(NAME, `${relPath} could not be read`, [
          refusalText("statusline-side-unreadable", { path: relPath }, root),
        ]),
        population: over(0, "constant(s)"),
      }
    }
    bodies.set(relPath, body)
  }

  const found = new Map<string, string | null>()
  found.set(`ATTRIBUTES in ${STORE}`, capture(bodies.get(STORE) as string, STORE_ATTRIBUTES))
  found.set(`ASSIGNMENTS in ${STORE}`, capture(bodies.get(STORE) as string, STORE_ASSIGNMENTS))
  found.set(`SEAT_RENDER in ${SCRIPT}`, capture(bodies.get(SCRIPT) as string, SCRIPT_SLOTS))
  for (const pair of PAGE_KEYS) {
    found.set(
      `${pair.spelled} in ${READER}`,
      capture(bodies.get(READER) as string, assignment(pair.spelled))
    )
    found.set(
      `${pair.declared} in ${pair.source}`,
      capture(bodies.get(pair.source) as string, declaration(pair.declared))
    )
  }

  const unreadable = [...found]
    .filter(([, value]) => value === null)
    .map(([where]) => refusalText("statusline-constant-unlocated", { where }, root))
  if (unreadable.length > 0) {
    return {
      ...judge(NAME, "a constant could not be located", unreadable),
      population: over(found.size - unreadable.length, "constant(s)"),
    }
  }

  const renders = slugSlots(found.get(`SEAT_RENDER in ${SCRIPT}`) as string)
  const stated = [
    tsSlots(found.get(`ATTRIBUTES in ${STORE}`) as string),
    tsSlots(found.get(`ASSIGNMENTS in ${STORE}`) as string),
  ].join(" ")
  const declares = slugSlots(stated)
  const messages: string[] = []
  if (renders !== declares) {
    messages.push(refusalText("statusline-slots-disagree", { renders, declares }, root))
  }
  for (const pair of PAGE_KEYS) {
    const spelled = found.get(`${pair.spelled} in ${READER}`) as string
    const declared = found.get(`${pair.declared} in ${pair.source}`) as string
    if (spelled === declared) continue
    messages.push(
      refusalText(
        "statusline-page-key-disagrees",
        { key: pair.spelled, spelled, source: pair.source, declared },
        root
      )
    )
  }

  return {
    ...judge(NAME, `${renders} in \`${READER}\`, over ${PAGE_KEYS.length} page key(s)`, messages),
    population: over(found.size, "constant(s)"),
  }
}
