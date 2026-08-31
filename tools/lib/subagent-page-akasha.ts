import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import type { Roots } from "../../page/page.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { landInAkasha } from "./akasha-landing.ts"
import { type Outcome } from "./gated-write.ts"

const DIR = "akasha/seat-system/subagent/subagents"

const SUFFIX = ".subagent.ts"

const SCRATCH = "/var/tmp"

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

function said(value: string): string {
  return JSON.stringify(value)
}

export function akashaSubagentBody(
  id: string,
  slug: string,
  seatName: string,
  dispatchedAs: string
): string {
  return [
    'import type { Subagent } from "../subagent.page-type.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    `  id: ${said(id)},`,
    '  pageTypeSlug: "subagent",',
    `  slug: ${said(slug)},`,
    `  principalSeatName: ${said(seatName)},`,
    `  dispatchedAs: ${said(dispatchedAs)},`,
    "} as const satisfies Subagent",
    "",
  ].join("\n")
}

export function writeAkashaSubagentPage(
  id: string,
  seatName: string,
  own: string,
  dispatchedAs: string,
  roots: Roots = resolveRoots()
): Outcome {
  const root = rootFor(roots, AKASHA)
  const slug = akashaSubagentSlug(seatName, own)
  const body = akashaSubagentBody(id, slug, seatName, dispatchedAs)
  const absolute = `${root}/${akashaSubagentRelPath(slug)}`
  if (existsSync(absolute) && readFileSync(absolute, "utf8") === body) return { kind: "unchanged" }
  const dir = mkdtempSync(join(SCRATCH, "akasha-subagent-body-"))
  try {
    const bodyPath = join(dir, "body.ts")
    writeFileSync(bodyPath, body, "utf8")
    return landInAkasha(WRITER, root, [
      "write",
      "--file-path",
      absolute,
      "--content-file",
      bodyPath,
      "--message",
      `${slug}: a subagent states the kind it was dispatched as`,
    ])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
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

export function removeAkashaSubagentPage(
  seatName: string,
  own: string,
  roots: Roots = resolveRoots()
): Outcome {
  const root = rootFor(roots, AKASHA)
  const slug = akashaSubagentSlug(seatName, own)
  const absolute = `${root}/${akashaSubagentRelPath(slug)}`
  if (!existsSync(absolute)) return { kind: "unchanged" }
  return taking(
    root,
    [absolute],
    `${slug} returned, so its page goes; what it was stands in this repo's history`
  )
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
