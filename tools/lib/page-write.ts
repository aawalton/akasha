import { existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname } from "node:path"
import { exclusively } from "@akasha/file-system/exclusive"
import { patchUncommitted, removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { attachmentFileOf, removeAttachment, writeAttachment } from "../../page/attachment-file.ts"
import { attachmentKeysFor } from "./page-attachment-keys.ts"
import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { rowsHoldingsFor } from "./page-property-types.ts"
import { partNumberOf, rowsFileOf, rowsPartOf, rowsPartsOf } from "../../page/rows-file.ts"
import { type Roots } from "@akasha/pages-system/markdown-page-at"
import { landOne } from "./page-write-commit.ts"
import { patchedText, withId, withSeq } from "./page-write-compose.ts"
import { frontOf, textIn } from "./page-write-text.ts"
import { type Attachment, type Value, splitValues } from "./page-write-values.ts"
import { type Where, whereFor } from "./page-write-where.ts"

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

export interface RowsPart {
  readonly path: string
  readonly at: string
}

/**
 * Every file one property's rows are in, on disk and as the commit names it.
 *
 * A property whose rows outgrow the part ceiling is divided across `<key>.jsonl` and
 * `<key>.partN.jsonl` beside the page, and `rowsPartsOf` is the one rule that says which files
 * those are — the same rule the read path finds them by. Asking `rowsFileOf` alone named the
 * first file only, so a removal left every part behind: the rows became unreachable and
 * undeleted at once, while `rm` and `mv` both said a page's files had gone with it.
 */
export function rowsPartsFor(path: string, relPath: string): readonly RowsPart[] {
  return rowsPartsOf(path).map((part) => ({
    path: part,
    at: rowsPartOf(relPath, partNumberOf(part)),
  }))
}

function clearRows(tree: FileTree, pageType: string, at: Where): readonly Taken[] {
  const took: Taken[] = []
  for (const holding of rowsHoldingsFor(tree, pageType)) {
    const path = rowsFileOf(at.path, holding.key, holding.uncommitted)
    const relPath = rowsFileOf(at.relPath, holding.key, holding.uncommitted)
    for (const part of rowsPartsFor(path, relPath)) {
      const pages = exclusively(part.path, () => {
        const stood = rowsIn(part.path)
        rmSync(part.path, { force: true })
        return stood
      })
      if (pages !== null) took.push({ at: part.at, pageType: holding.target, pages })
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
