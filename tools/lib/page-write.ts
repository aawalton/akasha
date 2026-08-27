import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { commitAuthor } from "../../agent/commit-author.ts"
import { exclusively } from "../../exclusive/exclusive.ts"
import { commitPaths, whileHoldingLanding } from "../../repo/git/git.ts"
import { patchUncommitted, removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { attachmentFileOf, removeAttachment, writeAttachment } from "../../page/attachment-file.ts"
import { deferringCommits, queueCommit } from "./page-commit-queue.ts"
import { uncommittedKeysFor } from "./page-uncommitted-keys.ts"
import { attachmentKeysFor } from "./page-attachment-keys.ts"
import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { newPageNameFor, pageTypePathIn, placeDirOf, placesIn, scanIn, soleRepoOf } from "../../page/page-types.ts"
import { stemOf as slugOf } from "../../page/name/name.ts"
import {
  asDeclared,
  bodyKeyFor,
  rowsHoldingsFor,
  type Rendered,
  typesFor,
  withoutDefaults,
} from "./page-property-types.ts"
import { idOfFilePage as pageId } from "../../page/name/naming/naming.ts"
import { type Commit, type Landed, type Landings, commitNamed, landFiles } from "../../repo/land/land.ts"
import { statesNextSeq, takeSeqOf } from "./page-seq.ts"
import { rowsFileOf } from "../../page/rows-file.ts"
import { type Roots } from "../../page/page.ts"
import { isAddressable } from "../../repo/roots/roots.ts"

export type Value = string | number | boolean | readonly string[]

export interface Where {
  readonly root: string
  readonly repo: string
  readonly relPath: string
  readonly path: string
}

export function whereFor(
  roots: Roots,
  pageType: string,
  name: string,
  tree: FileTree = diskFileTree(roots)
): Where | null {
  const type = registryOf(tree).find((one) => one.slug === pageType)
  if (type === undefined) return null
  const repo = soleRepoOf(type)
  if (repo === null || !isAddressable(repo)) return null
  const root = roots[repo]
  const stands = (one: string): boolean => {
    const last = one.split("/").at(-1) ?? one
    return last === `${name}.md` || slugOf(last) === name
  }
  const held = scanIn(root, placesIn(type, repo), repo).find(stands)
  const relPath = held ?? `${placeDirOf(type.slug)}/${newPageNameFor(type, name)}`
  return { root, repo, relPath, path: join(root, relPath) }
}

function readsBackAsWritten(one: string): boolean {
  let parsed: unknown
  try {
    parsed = Bun.YAML.parse(`v: ${one}\n`)
  } catch {
    return false
  }
  if (typeof parsed !== "object" || parsed === null) return false
  return (parsed as Record<string, unknown>).v === one
}

function quoted(one: string): string {
  const bare = /^[A-Za-z0-9][A-Za-z0-9 ._@/-]*$/.test(one) && readsBackAsWritten(one)
  return bare ? one : JSON.stringify(one)
}

function shown(one: string | number | boolean): string {
  return typeof one === "string" ? quoted(one) : String(one)
}

function lineFor(key: string, value: Rendered): readonly string[] {
  if (Array.isArray(value)) {
    return value.length === 0 ? [] : [`${key}:`, ...value.map((one) => `  - ${shown(one)}`)]
  }
  return [`${key}: ${shown(value as string | number | boolean)}`]
}

export function bodyFor(pageType: string, values: Readonly<Record<string, Rendered>>): string {
  const lines = ["---", `page-type-slug: ${pageType}`]
  for (const [key, value] of Object.entries(values)) {
    if (key === "page-type-slug") continue
    lines.push(...lineFor(key, value as Rendered))
  }
  lines.push("---", "")
  return lines.join("\n")
}

export function statedIn(text: string): Record<string, unknown> {
  if (!text.startsWith("---\n")) return {}
  const closesAt = text.indexOf("\n---", 3)
  if (closesAt < 0) return {}
  const parsed: unknown = Bun.YAML.parse(text.slice(4, closesAt + 1))
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : {}
}

function bodyIn(text: string): string {
  if (!text.startsWith("---\n")) return ""
  const closesAt = text.indexOf("\n---", 3)
  return closesAt < 0 ? "" : text.slice(closesAt + 4).replace(/^\n/, "")
}

export function commitPages(
  root: string,
  relPaths: readonly string[],
  message: string
): string | null {
  if (relPaths.length === 0) return null
  const landed = whileHoldingLanding(root, () => commitPaths(root, relPaths, message, commitAuthor()))
  if (!landed.ok) return landed.reason
  return landed.value.ok ? null : landed.value.reason
}

export interface Taken {
  readonly at: string
  readonly pageType: string | null
  readonly pages: number
}

export interface Written extends Where {
  readonly commitError: string | null
  readonly absent?: string
  readonly refused?: string
  readonly took?: readonly Taken[]
}

function messageFor(pageType: string, act: string, name: string, by?: string): string {
  return `${pageType}: ${act} ${name}${by === undefined ? "" : ` for ${by}`}`
}

export function commitAll(
  at: Where,
  relPaths: readonly string[],
  pageType: string,
  act: string,
  name: string,
  by?: string
): string | null {
  if (relPaths.length === 0) return null
  if (deferringCommits()) {
    const said = `${pageType} ${act}${by === undefined ? "" : ` for ${by}`}`
    for (const relPath of relPaths) queueCommit(at.root, relPath, said)
    return null
  }
  return commitPages(at.root, relPaths, messageFor(pageType, act, name, by))
}

export function textIn(path: string): string {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return ""
  }
}

function commitVia(pageType: string, act: string, by?: string): Commit {
  return (root, named, message) => {
    if (named.length === 0) return null
    if (deferringCommits()) {
      const said = `${pageType} ${act}${by === undefined ? "" : ` for ${by}`}`
      for (const relPath of named) queueCommit(root, relPath, said)
      return null
    }
    return commitNamed(root, named, message)
  }
}

type Took = {
  readonly landed: Landed | null
  readonly commitError: string | null
}

function landOne(
  at: Where,
  pageType: string,
  act: string,
  name: string,
  by: string | undefined,
  more: Omit<Landings, "repo" | "root" | "message" | "commit">
): Took {
  try {
    const landed = landFiles({
      repo: at.repo,
      root: at.root,
      message: messageFor(pageType, act, name, by),
      commit: commitVia(pageType, act, by),
      ...more,
    })
    return { landed, commitError: null }
  } catch (err) {
    return { landed: null, commitError: err instanceof Error ? err.message : String(err) }
  }
}

export function rewritten(path: string, contents: string): boolean {
  if (existsSync(path) && textIn(path) === contents) return false
  writeFileSync(path, contents, "utf8")
  return true
}

export interface Attachment {
  readonly extension: string
  readonly text: string
}

export interface Split {
  readonly front: Record<string, Rendered>
  readonly uncommitted: Record<string, Value>
  readonly attachments: Record<string, Attachment>
  readonly body: string | null
}

function textOf(value: Value): string {
  if (typeof value === "string") return value
  return Array.isArray(value) ? value.join("\n") : String(value)
}

export function splitValues(
  roots: Roots,
  pageType: string,
  values: Readonly<Record<string, Value>>,
  tree: FileTree = diskFileTree(roots)
): Split {
  const uncommittedKeys = uncommittedKeysFor(tree, pageType)
  const rowsKeys = new Set(rowsHoldingsFor(tree, pageType).map((holding) => holding.key))
  const largeKeys = attachmentKeysFor(tree, pageType)
  const bodyKey = bodyKeyFor(tree, pageType)
  const types = typesFor(tree, pageType)
  const front: Record<string, Rendered> = {}
  const uncommitted: Record<string, Value> = {}
  const attachments: Record<string, Attachment> = {}
  let body: string | null = null
  for (const [key, value] of Object.entries(values)) {
    const extension = largeKeys.get(key)
    if (extension !== undefined) attachments[key] = { extension, text: textOf(value) }
    else if (uncommittedKeys.has(key) && !rowsKeys.has(key)) uncommitted[key] = value
    else if (bodyKey !== null && key === bodyKey) body = textOf(value)
    else front[key] = asDeclared(value, types.get(key))
  }
  return { front, uncommitted: uncommitted, attachments: attachments, body }
}

export function frontOf(
  tree: FileTree,
  pageType: string,
  front: Readonly<Record<string, Rendered>>
): string {
  return bodyFor(pageType, withoutDefaults(tree, pageType, front))
}

const PAGE_ID = "id"

function withId(
  front: Readonly<Record<string, Rendered>>,
  text: string,
  at: Where
): Record<string, Rendered> {
  const held =
    statedIn(text)[PAGE_ID] ?? front[PAGE_ID] ?? pageId(null, `${at.repo}:${at.relPath}`)
  const rest = { ...front }
  delete rest[PAGE_ID]
  return { [PAGE_ID]: held as Rendered, ...rest }
}

const PAGE_SEQ = "seq"

function mintedSeq(roots: Roots, pageType: string): number | undefined {
  const relPath = pageTypePathIn(roots.akasha, pageType)
  if (!statesNextSeq(roots.akasha, relPath)) return undefined
  return takeSeqOf({ pageTypeRelPath: relPath, noun: pageType })
}

function withSeq(
  roots: Roots,
  pageType: string,
  front: Readonly<Record<string, Rendered>>,
  text: string
): Record<string, Rendered> {
  const held = statedIn(text)[PAGE_SEQ] ?? front[PAGE_SEQ] ?? mintedSeq(roots, pageType)
  if (held === undefined) return { ...front }
  const rest = { ...front }
  delete rest[PAGE_SEQ]
  return { [PAGE_SEQ]: held as Rendered, ...rest }
}

export function patchedText(
  roots: Roots,
  pageType: string,
  text: string,
  split: Split,
  at: Where,
  clear: readonly string[] = [],
  tree: FileTree = diskFileTree(roots)
): string {
  const standing = statedIn(text)
  delete standing["page-type-slug"]
  for (const key of uncommittedKeysFor(tree, pageType)) delete standing[key]
  for (const key of attachmentKeysFor(tree, pageType).keys()) delete standing[key]
  const merged: Record<string, unknown> = { ...standing, ...split.front }
  for (const key of clear) delete merged[key]
  const front = frontOf(tree, pageType, withId(merged as Record<string, Rendered>, text, at))
  return `${front}${split.body ?? bodyIn(text)}`
}

export function landingTextFor(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  act: "write" | "patch",
  clear: readonly string[] = []
): { readonly at: Where; readonly text: string } | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  if (act === "write") {
    const front = withId(split.front, textIn(at.path), at)
    return { at, text: `${frontOf(tree, pageType, front)}${split.body ?? ""}` }
  }
  return { at, text: patchedText(roots, pageType, textIn(at.path), split, at, clear, tree) }
}

export function landAttachments(at: Where, attachments: Readonly<Record<string, Attachment>>): readonly string[] {
  const landed: string[] = []
  for (const [key, one] of Object.entries(attachments)) {
    const changed = exclusively(attachmentFileOf(at.path, key, one.extension), () =>
      writeAttachment(at.path, key, one.extension, one.text)
    )
    if (changed) landed.push(attachmentFileOf(at.relPath, key, one.extension))
  }
  return landed
}

function rowsIn(path: string): number | null {
  if (!existsSync(path)) return null
  return textIn(path)
    .split("\n")
    .filter((one) => one.trim() !== "").length
}

function clearRows(tree: FileTree, pageType: string, at: Where): readonly Taken[] {
  const took: Taken[] = []
  for (const holding of rowsHoldingsFor(tree, pageType)) {
    const path = rowsFileOf(at.path, holding.key, holding.uncommitted)
    const pages = exclusively(path, () => {
      const stood = rowsIn(path)
      rmSync(path, { force: true })
      return stood
    })
    if (pages !== null) {
      took.push({
        at: rowsFileOf(at.relPath, holding.key, holding.uncommitted),
        pageType: holding.target,
        pages,
      })
    }
  }
  return took
}

function clearAttachments(tree: FileTree, pageType: string, at: Where): readonly string[] {
  const gone: string[] = []
  for (const [key, extension] of attachmentKeysFor(tree, pageType)) {
    const changed = exclusively(attachmentFileOf(at.path, key, extension), () =>
      removeAttachment(at.path, key, extension)
    )
    if (changed) gone.push(attachmentFileOf(at.relPath, key, extension))
  }
  return gone
}

export function writePage(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  by?: string
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  const alongside = landAttachments(at, split.attachments)
  const took = landOne(at, pageType, "write", name, by, {
    composing: [
      {
        relPath: at.relPath,
        compose: (standing) => {
          const held = standing ?? ""
          const front = withId(withSeq(roots, pageType, split.front, held), held, at)
          return `${frontOf(tree, pageType, front)}${split.body ?? ""}`
        },
      },
    ],
    alongside,
  })
  if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)
  return { ...at, commitError: took.commitError }
}

export function patchPage(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  by?: string,
  clear: readonly string[] = []
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  const split = splitValues(roots, pageType, values, tree)
  const alongside = landAttachments(at, split.attachments)
  const took = landOne(at, pageType, "patch", name, by, {
    composing: [
      {
        relPath: at.relPath,
        compose: (standing) =>
          patchedText(roots, pageType, standing ?? "", split, at, clear, tree),
      },
    ],
    alongside,
  })
  if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)
  return { ...at, commitError: took.commitError }
}

export function patchState(
  roots: Roots,
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>
): Where | null {
  const at = whereFor(roots, pageType, name)
  if (at === null) return null
  mkdirSync(dirname(at.path), { recursive: true })
  patchUncommitted(at.path, { ...values })
  return at
}

export function removePage(
  roots: Roots,
  pageType: string,
  name: string,
  by?: string
): Written | null {
  const tree = diskFileTree(roots)
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return null
  removeUncommitted(at.path)
  const cleared = clearAttachments(tree, pageType, at)
  const rows = clearRows(tree, pageType, at)
  const landing = landOne(at, pageType, "remove", name, by, {
    removing: [at.relPath],
    alongside: [...cleared, ...rows.map((one) => one.at)],
  })
  const changed = landing.landed !== null && landing.landed.gone.includes(at.relPath)
  const gone = [...(changed ? [at.relPath] : []), ...cleared, ...rows.map((one) => one.at)]
  const commitError = landing.commitError
  const took: readonly Taken[] = [
    ...(changed ? [{ at: at.relPath, pageType, pages: 1 }] : []),
    ...cleared.map((one) => ({ at: one, pageType: null, pages: 0 })),
    ...rows,
  ]
  if (gone.length > 0) return { ...at, commitError, took }
  return {
    ...at,
    commitError,
    absent: `\`${pageType}\` has no page \`${name}\`: nothing stood at ${at.relPath}, so nothing was taken away`,
  }
}
