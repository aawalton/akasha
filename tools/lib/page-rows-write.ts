import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { randomUUID } from "node:crypto"
import { appendFileSync, existsSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { partNumberOf, PART_CEILING_BYTES, rowsFileOf, rowsPartOf } from "../../page/rows-file.ts"
import {
  appendable,
  appendLines,
  byteLength,
  lastPartOf,
  linesIn,
  namedIn,
  NAMING,
  objectOfLine,
  type Part,
  partsHeld,
  standingAt,
  standingIn,
  writeOutParts,
} from "./page-rows-parts.ts"
import { forgetRowsPages } from "./page-rows.ts"
import { duringOneCall } from "../../during-call/during-call.ts"
import { exclusively } from "../../exclusive/exclusive.ts"
import { writeWhole } from "../../write-whole/write-whole.ts"
import { type Written } from "./page-write.ts"
import { commitAll } from "./page-write-commit.ts"
import { whereFor, type Where } from "./page-write-where.ts"
import { idOfFilePage as pageId } from "../../page/name/naming/naming.ts"
import { type FileTree, diskFileTree } from "../../page/file-tree.ts"
import { judgeRow } from "../../page/property/judge.ts"
import type { Property } from "../../page/property/property.ts"
import { declaredFor } from "../page/page-rows-home.ts"
import { RowsHomeUnresolved, rowsHomeFor } from "./page-rows-resolve.ts"
import type { RowsHome } from "../page/page-rows-home.ts"
import type { Roots } from "../../page/page.ts"


interface ResolvedHome {
  readonly at: Where
  readonly parent: Where
  readonly parentType: string
  readonly uncommitted: boolean
  readonly appendOnly: boolean
}

function rowsHome(
  roots: Roots,
  pageType: string,
  parentName: string,
  key: string | null,
  tree: FileTree
): ResolvedHome | null {
  const home = rowsHomeFor(roots, pageType, parentName, key, tree)
  if (home === null) return null
  const parent = whereFor(roots, home.parentType, parentName)
  if (parent === null) return null
  const relPath = rowsFileOf(parent.relPath, home.key, home.uncommitted)
  const at = { root: parent.root, repo: parent.repo, relPath, path: join(parent.root, relPath) }
  return {
    at,
    parent,
    parentType: home.parentType,
    uncommitted: home.uncommitted,
    appendOnly: home.appendOnly,
  }
}

export function whereRowsStand(
  roots: Roots,
  pageType: string,
  parentName: string,
  key: string | null = null
): Where | null {
  const home = rowsHome(roots, pageType, parentName, key, diskFileTree(roots))
  return home === null ? null : home.at
}

function unresolvedHome(roots: Roots, error: RowsHomeUnresolved): Written {
  return {
    root: rootFor(roots, AKASHA),
    repo: "instructions",
    relPath: "",
    path: "",
    commitError: null,
    refused: error.message,
  }
}

function homeOrRefusal(
  roots: Roots,
  pageType: string,
  parentName: string,
  key: string | null,
  tree: FileTree
): { readonly home: ResolvedHome | null; readonly refusal: Written | null } {
  try {
    return { home: rowsHome(roots, pageType, parentName, key, tree), refusal: null }
  } catch (error) {
    if (!(error instanceof RowsHomeUnresolved)) throw error
    return { home: null, refusal: unresolvedHome(roots, error) }
  }
}

function withoutParent(home: ResolvedHome, pageType: string, parentName: string): Written {
  return {
    ...home.at,
    commitError: null,
    absent:
      `no \`${home.parentType}\` page is named \`${parentName}\`: nothing stands at ${home.parent.relPath}, ` +
      `so a row of \`${pageType}\` landed here would be read by nobody. ` +
      `A row is reached by walking to its parent page and then to the sidecar beside it, and a sidecar ` +
      `whose parent is missing is never walked to. Write the \`${home.parentType}\` page \`${parentName}\` first.`,
  }
}

type Act = "write-row" | "patch-row"

function idStamped(
  values: Readonly<Record<string, unknown>>,
  home: Where
): Readonly<Record<string, unknown>> {
  const stated = values["id"]
  if (typeof stated === "string" && stated.trim() !== "") return values
  const named = namedIn(values)
  if (named === null) return { ...values, id: randomUUID() }
  return { ...values, id: pageId(null, `${home.repo}:${home.relPath}#${named}`) }
}

interface Landing {
  readonly changed: boolean
  readonly refused: string | null
  readonly paths: readonly string[]
}

function refusalsOver(
  rows: readonly Readonly<Record<string, unknown>>[],
  held: readonly string[],
  at: ReadonlyMap<string, number>,
  act: Act,
  pageType: string,
  properties: readonly Property[]
): string | null {
  const refusals: string[] = []
  for (const values of rows) {
    const named = namedIn(values)
    const standing = named === null || act !== "write-row" ? undefined : at.get(named)
    const before = standing === undefined ? null : objectOfLine(held[standing] as string)
    for (const one of judgeRow(values, pageType, properties, before).refusals) {
      if (!refusals.includes(one)) refusals.push(one)
    }
  }
  return refusals.length === 0 ? null : refusals.join("\n")
}

function landRows(
  basePath: string,
  home: Where,
  act: Act,
  rows: readonly Readonly<Record<string, unknown>>[],
  pageType: string,
  properties: readonly Property[] | null
): Landing {
  const parts = partsHeld(basePath)
  const held: string[] = []
  const sites: { readonly part: number; readonly at: number }[] = []
  for (let part = 0; part < parts.length; part += 1) {
    const lines = (parts[part] as Part).lines
    for (let index = 0; index < lines.length; index += 1) {
      held.push(lines[index] as string)
      sites.push({ part, at: index })
    }
  }
  const at = standingIn(held)
  const refused = properties === null ? null : refusalsOver(rows, held, at, act, pageType, properties)
  if (refused !== null) return { changed: false, refused, paths: [] }
  for (const values of rows) {
    const named = namedIn(values)
    const standing = named === null ? undefined : at.get(named)
    if (standing === undefined) {
      const line = JSON.stringify(idStamped(values, home))
      const into = appendable(basePath, parts, line)
      into.lines.push(line)
      into.bytes += byteLength(line) + 1
      into.grew = true
      if (named !== null) {
        held.push(line)
        sites.push({ part: parts.indexOf(into), at: into.lines.length - 1 })
        at.set(named, held.length - 1)
      }
      continue
    }
    const site = sites[standing] as { readonly part: number; readonly at: number }
    const part = parts[site.part] as Part
    const before = part.lines[site.at] as string
    const merged = act === "write-row" ? values : { ...(objectOfLine(before) ?? {}), ...values }
    const line = JSON.stringify(idStamped(merged, home))
    if (line === before) continue
    part.lines[site.at] = line
    held[standing] = line
    part.bytes += byteLength(line) - byteLength(before)
    if (site.at < part.from) part.touched = true
    else part.grew = true
  }
  const paths = writeOutParts(parts)
  return { changed: paths.length > 0, refused: null, paths }
}

function landAppended(
  basePath: string,
  home: Where,
  rows: readonly Readonly<Record<string, unknown>>[],
  pageType: string,
  properties: readonly Property[] | null
): Landing {
  const refusals: string[] = []
  if (properties !== null) {
    for (const values of rows) {
      for (const one of judgeRow(values, pageType, properties, null).refusals) {
        if (!refusals.includes(one)) refusals.push(one)
      }
    }
  }
  if (refusals.length > 0) return { changed: false, refused: refusals.join("\n"), paths: [] }
  const lines = rows.map((values) => JSON.stringify(idStamped(values, home)))
  const paths = appendLines(basePath, lines)
  return { changed: paths.length > 0, refused: null, paths }
}

function rowsWritten(
  roots: Roots,
  act: Act,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  by?: string,
  key: string | null = null
): Written | null {
  return duringOneCall(() => rowsLanded(roots, act, pageType, parentName, rows, by, key))
}

function rowsLanded(
  roots: Roots,
  act: Act,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  by?: string,
  key: string | null = null
): Written | null {
  const tree = diskFileTree(roots)
  const { home, refusal } = homeOrRefusal(roots, pageType, parentName, key, tree)
  if (refusal !== null) return refusal
  if (home === null) return null
  if (!existsSync(home.parent.path)) return withoutParent(home, pageType, parentName)
  const properties = declaredFor(tree, pageType)
  const at = home.at
  mkdirSync(dirname(at.path), { recursive: true })
  const landed = exclusively(at.path, () =>
    home.appendOnly
      ? landAppended(at.path, at, rows, pageType, properties)
      : landRows(at.path, at, act, rows, pageType, properties)
  )
  if (landed.refused !== null) return { ...at, commitError: null, refused: landed.refused }
  for (const path of landed.paths) forgetRowsPages(path)
  const relPaths = landed.paths.map((path) => path.slice(at.root.length + 1))
  return {
    ...at,
    commitError:
      landed.changed && !home.uncommitted
        ? commitAll(at, relPaths, pageType, act, parentName, by)
        : null,
  }
}

export interface RowAppender {
  readonly append: (values: Readonly<Record<string, unknown>>) => undefined
  readonly refused: () => string | null
  readonly at: () => string
}

export function rowAppender(
  roots: Roots,
  pageType: string,
  parentName: string,
  key: string | null = null
): RowAppender | null {
  const tree = diskFileTree(roots)
  const { home } = homeOrRefusal(roots, pageType, parentName, key, tree)
  if (home === null || !home.appendOnly) return null
  if (!existsSync(home.parent.path)) return null
  const where = home.at
  const properties = declaredFor(tree, pageType)
  mkdirSync(dirname(where.path), { recursive: true })
  const held = lastPartOf(where.path)
  let path = held.path
  let bytes = held.bytes
  let refused: string | null = null
  return {
    append: (values): undefined => {
      if (refused !== null) return
      if (properties !== null) {
        const said = judgeRow(values, pageType, properties, null).refusals
        if (said.length > 0) {
          refused = said.join("\n")
          return
        }
      }
      try {
        const line = JSON.stringify(idStamped(values, where))
        const size = byteLength(line) + 1
        if (bytes > 0 && bytes + size > PART_CEILING_BYTES) {
          path = rowsPartOf(where.path, partNumberOf(path) + 1)
          bytes = 0
        }
        appendFileSync(path, `${line}\n`, "utf8")
        bytes += size
      } catch (error) {
        refused =
          `no row of \`${pageType}\` reached ${path}: ` +
          `${error instanceof Error ? error.message : String(error)}`
      }
    },
    refused: () => refused,
    at: () => path,
  }
}

export function writeRow(
  roots: Roots,
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  by?: string,
  key: string | null = null
): Written | null {
  return rowsWritten(roots, "write-row", pageType, parentName, [values], by, key)
}

export function patchRow(
  roots: Roots,
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  by?: string,
  key: string | null = null
): Written | null {
  return rowsWritten(roots, "patch-row", pageType, parentName, [values], by, key)
}

export function writeRows(
  roots: Roots,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  by?: string,
  key: string | null = null
): Written | null {
  return rowsWritten(roots, "write-row", pageType, parentName, rows, by, key)
}

export function patchRows(
  roots: Roots,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  by?: string,
  key: string | null = null
): Written | null {
  return rowsWritten(roots, "patch-row", pageType, parentName, rows, by, key)
}

export function removeRow(
  roots: Roots,
  pageType: string,
  parentName: string,
  named: string,
  by?: string,
  key: string | null = null
): Written | null {
  return duringOneCall(() => rowRemoved(roots, pageType, parentName, named, by, key))
}

function rowRemoved(
  roots: Roots,
  pageType: string,
  parentName: string,
  named: string,
  by?: string,
  key: string | null = null
): Written | null {
  const { home, refusal } = homeOrRefusal(roots, pageType, parentName, key, diskFileTree(roots))
  if (refusal !== null) return refusal
  if (home === null) return null
  if (!existsSync(home.parent.path)) return withoutParent(home, pageType, parentName)
  const at = home.at
  let over = 0
  for (const part of partsHeld(at.path)) over += part.lines.length
  const taken = exclusively(at.path, (): string | null => {
    for (const part of partsHeld(at.path)) {
      const standing = standingAt(part.lines, named)
      if (standing < 0) continue
      const next = part.lines.filter((_one, index) => index !== standing)
      writeWhole(part.path, next.length === 0 ? "" : `${next.join("\n")}\n`)
      return part.path
    }
    return null
  })
  if (taken !== null) forgetRowsPages(taken)
  const commitError =
    taken === null || home.uncommitted
      ? null
      : commitAll(at, [taken.slice(at.root.length + 1)], pageType, "remove-row", parentName, by)
  if (taken !== null) return { ...at, commitError }
  return {
    ...at,
    commitError,
    absent:
      `no row of \`${pageType}\` under \`${parentName}\` is named \`${named}\`, so nothing was taken away. ` +
      `A row is named by its own ${NAMING.map((one) => `\`${one}\``).join(" or ")} and by nothing else, ` +
      `so a key that identifies the record everywhere else names no row here. ${over} row(s) stand at ${at.relPath}`,
  }
}
