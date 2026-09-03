import { idOfFilePage as pageId } from "@akasha/file-page-identity"
import { diskFileTree, type FileTree } from "@akasha/markdown-pages/file-tree"
import { attachmentKeysFor } from "@akasha/markdown-pages/page-attachment-keys"
import type { Rendered } from "@akasha/markdown-pages/page-property-types"
import { pageTypePathIn } from "@akasha/markdown-pages/page-types"
import { uncommittedKeysFor } from "@akasha/markdown-pages/page-uncommitted-keys"
import { bodyIn, frontOf, statedIn, textIn } from "@akasha/markdown-pages/page-write-text"
import { type Split, splitValues, type Value } from "@akasha/markdown-pages/page-write-values"
import { type Where, whereFor } from "@akasha/markdown-pages/page-write-where"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { statesNextSeq, takeSeqOf } from "./page-seq.ts"

const PAGE_ID = "id"

export function withId(
  front: Readonly<Record<string, Rendered>>,
  text: string,
  at: Where
): Record<string, Rendered> {
  const held = statedIn(text)[PAGE_ID] ?? front[PAGE_ID] ?? pageId(null, `${at.repo}:${at.relPath}`)
  const rest = { ...front }
  delete rest[PAGE_ID]
  return { [PAGE_ID]: held as Rendered, ...rest }
}

const PAGE_SEQ = "seq"

function mintedSeq(roots: Roots, pageType: string): number | undefined {
  const relPath = pageTypePathIn(rootFor(roots, AKASHA), pageType)
  if (!statesNextSeq(rootFor(roots, AKASHA), relPath)) return undefined
  return takeSeqOf({ pageTypeRelPath: relPath, noun: pageType })
}

export function withSeq(
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
