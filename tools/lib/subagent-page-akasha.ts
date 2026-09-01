import { readdirSync } from "node:fs"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { landInAkasha } from "./akasha-landing.ts"
import { type Outcome } from "./gated-write.ts"

const DIR = "akasha/seat-system/subagent/subagents"

const SUFFIX = ".subagent.ts"

const WRITER = "subagent-page-writer"

// A slug holds no empty word and neither opens nor closes with a hyphen, so the `--` that marks a
// subagent's own id off from its seat's in an agent id is one hyphen here. The seat is stated on
// the page as well, so nothing has to take the slug apart to find it.
export function akashaSubagentSlug(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function akashaSubagentRelPath(slug: string): string {
  return `${DIR}/${slug}${SUFFIX}`
}

export function akashaSubagentsDirIn(root: string): string {
  return `${root}/${DIR}`
}

function taking(root: string, paths: readonly string[], why: string): Outcome {
  if (paths.length === 0) return { kind: "unchanged" }
  const taken = landInAkasha(WRITER, root, [
    "write",
    ...paths.flatMap((one) => ["--remove", one]),
    "--message",
    why,
  ])
  return taken.kind === "written" ? { kind: "removed" } : taken
}

export function akashaSubagentPathsOf(
  seatName: string,
  roots: Roots = resolveRoots()
): readonly string[] {
  const dir = akashaSubagentsDirIn(rootFor(roots, AKASHA))
  const mark = `${seatName}-`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  return names
    .filter((name) => name.startsWith(mark) && name.endsWith(SUFFIX))
    .map((name) => `${dir}/${name}`)
}

export function removeAkashaSubagentPagesOf(
  seatName: string,
  why: string,
  roots: Roots = resolveRoots()
): Outcome {
  const paths = akashaSubagentPathsOf(seatName, roots)
  return taking(
    rootFor(roots, AKASHA),
    paths,
    `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) standing under it go`
  )
}
