import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { identityOf } from "../identity-of-key/identity-of-key.module.code.ts"
import { nodeUnder, type TreeNode } from "../tree-node-under/tree-node-under.module.code.ts"

const ITEM_CATEGORY_TREE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    parent: z.string().nullable().optional(),
    priorityOrder: z.number().int().nonnegative().nullable().optional(),
    sortOrder: z.number().int().nonnegative(),
    filterTypes: z.array(z.coerce.number().int()).optional(),
    itemTypes: z.array(z.coerce.number().int()).optional(),
    specializedItemTypes: z.array(z.coerce.number().int()).optional(),
    equipTypes: z.array(z.coerce.number().int()).optional(),
    weaponTypes: z.array(z.coerce.number().int()).optional(),
    armorTypes: z.array(z.coerce.number().int()).optional(),
    furnitureCategoryIds: z.array(z.coerce.number().int()).optional(),
    furnitureSubcategoryIds: z.array(z.coerce.number().int()).optional(),
    traitTypeRange: z.tuple([z.coerce.number().int(), z.coerce.number().int()]).optional(),
    itemNameContains: z.string().optional(),
  })
  .strict()

interface ParsedNode {
  id: string
  key: string
  name: string
  parentId: string | null
  priorityOrder: number | null
  sortOrder: number
  filterTypes?: readonly number[]
  itemTypes?: readonly number[]
  specializedItemTypes?: readonly number[]
  equipTypes?: readonly number[]
  weaponTypes?: readonly number[]
  armorTypes?: readonly number[]
  furnitureCategoryIds?: readonly number[]
  furnitureSubcategoryIds?: readonly number[]
  traitTypeRange?: readonly [number, number]
  itemNameContains?: string
}

function parseRow(row: Page): ParsedNode {
  if (typeof row.id !== "string") {
    throw new Error(`temper-item-category-tree row missing id: ${JSON.stringify(row)}`)
  }
  if (typeof row.title !== "string") {
    throw new Error(`temper-item-category-tree row ${row.id} has non-string title`)
  }
  const eav = ITEM_CATEGORY_TREE_EAV_SCHEMA.parse({
    key: row.slug,
    parent: row.parent ?? null,
    priorityOrder: row.priorityOrder ?? null,
    sortOrder: row.displayOrder,
    filterTypes: row.filterTypes,
    itemTypes: row.itemTypes,
    specializedItemTypes: row.specializedItemTypes,
    equipTypes: row.equipTypes,
    weaponTypes: row.weaponTypes,
    armorTypes: row.armorTypes,
    furnitureCategoryIds: row.furnitureCategoryIds,
    furnitureSubcategoryIds: row.furnitureSubcategoryIds,
    traitTypeRange: row.traitTypeRange,
    itemNameContains: row.itemNameContains,
  })
  return {
    id: identityOf(eav.key),
    key: eav.key,
    name: row.title,
    parentId: eav.parent == null ? null : identityOf(eav.parent),
    priorityOrder: eav.priorityOrder ?? null,
    sortOrder: eav.sortOrder,
    filterTypes: eav.filterTypes,
    itemTypes: eav.itemTypes,
    specializedItemTypes: eav.specializedItemTypes,
    equipTypes: eav.equipTypes,
    weaponTypes: eav.weaponTypes,
    armorTypes: eav.armorTypes,
    furnitureCategoryIds: eav.furnitureCategoryIds,
    furnitureSubcategoryIds: eav.furnitureSubcategoryIds,
    traitTypeRange: eav.traitTypeRange,
    itemNameContains: eav.itemNameContains,
  }
}

type BuilderNode = TreeNode<ParsedNode>

function buildTree(parsed: readonly ParsedNode[]): {
  priorityRoots: readonly BuilderNode[]
  priorityIds: readonly string[]
} {
  const childrenByParentId = new Map<string | null, ParsedNode[]>()
  for (const node of parsed) {
    const bucket = childrenByParentId.get(node.parentId)
    if (bucket === undefined) {
      childrenByParentId.set(node.parentId, [node])
    } else {
      bucket.push(node)
    }
  }

  const allIds = new Set(parsed.map((p) => p.id))
  for (const parentId of childrenByParentId.keys()) {
    if (parentId !== null && !allIds.has(parentId)) {
      const orphan = childrenByParentId.get(parentId)?.[0]
      throw new Error(
        `temper-item-category-tree: node '${orphan?.key ?? "<unknown>"}' has unknown parent id '${parentId}'`
      )
    }
  }

  const rootRows = childrenByParentId.get(null) ?? []
  for (const root of rootRows) {
    if (root.priorityOrder === null) {
      throw new Error(`temper-item-category-tree: root node '${root.key}' is missing priorityOrder`)
    }
  }
  const sortedRoots = [...rootRows].sort((a, b) => {
    const ap = a.priorityOrder
    const bp = b.priorityOrder
    if (ap === null || bp === null) {
      throw new Error("unreachable: priorityOrder enforced above")
    }
    return ap - bp
  })
  const priorityRoots = sortedRoots.map((one) => nodeUnder(childrenByParentId, one))

  return {
    priorityRoots,
    priorityIds: priorityRoots.map((r) => r.parsed.key),
  }
}

function renderNumberArray(values: readonly number[]): string {
  return `[${values.join(", ")}]`
}

function renderNode(builder: BuilderNode, indent: string): string {
  const parts: string[] = []
  parts.push(`${indent}{`)
  const inner = `${indent}  `
  parts.push(`${inner}id: ${JSON.stringify(builder.parsed.key)},`)
  parts.push(`${inner}name: ${JSON.stringify(builder.parsed.name)},`)
  const p = builder.parsed
  if (p.filterTypes !== undefined) {
    parts.push(`${inner}filterTypes: ${renderNumberArray(p.filterTypes)},`)
  }
  if (p.itemTypes !== undefined) parts.push(`${inner}itemTypes: ${renderNumberArray(p.itemTypes)},`)
  if (p.specializedItemTypes !== undefined) {
    parts.push(`${inner}specializedItemTypes: ${renderNumberArray(p.specializedItemTypes)},`)
  }
  if (p.traitTypeRange !== undefined) {
    parts.push(`${inner}traitTypeRange: [${p.traitTypeRange[0]}, ${p.traitTypeRange[1]}] as const,`)
  }
  if (p.equipTypes !== undefined) {
    parts.push(`${inner}equipTypes: ${renderNumberArray(p.equipTypes)},`)
  }
  if (p.weaponTypes !== undefined) {
    parts.push(`${inner}weaponTypes: ${renderNumberArray(p.weaponTypes)},`)
  }
  if (p.armorTypes !== undefined) {
    parts.push(`${inner}armorTypes: ${renderNumberArray(p.armorTypes)},`)
  }
  if (p.furnitureCategoryIds !== undefined) {
    parts.push(`${inner}furnitureCategoryIds: ${renderNumberArray(p.furnitureCategoryIds)},`)
  }
  if (p.furnitureSubcategoryIds !== undefined) {
    parts.push(`${inner}furnitureSubcategoryIds: ${renderNumberArray(p.furnitureSubcategoryIds)},`)
  }
  if (p.itemNameContains !== undefined) {
    parts.push(`${inner}itemNameContains: ${JSON.stringify(p.itemNameContains)},`)
  }
  if (builder.children.length > 0) {
    parts.push(`${inner}children: [`)
    for (const child of builder.children) {
      parts.push(renderNode(child, `${inner}  `) + ",")
    }
    parts.push(`${inner}],`)
  }
  parts.push(`${indent}}`)
  return parts.join("\n")
}

export function generateTemperItemCategoryTree(rows: readonly Page[]): string {
  const parsed = rows.map(parseRow)
  const { priorityRoots, priorityIds } = buildTree(parsed)

  const priorityArrayBody = priorityIds.map((id) => `  ${JSON.stringify(id)},`).join("\n")

  const treeEntries: string[] = []
  for (const root of priorityRoots) {
    const rendered = renderNode(root, "  ")
    treeEntries.push(`  ${JSON.stringify(root.parsed.key)}: ${rendered.trimStart()},`)
  }

  return `\
/**
 * Temper Item Category Tree (Generated)
 *
 * ESO item category hierarchy used by the inventory classifier, sourced
 * from the universal pages table (page type: temper-item-category-tree).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ItemCategoryTree } from "../item-category-tree-types"

export const ITEM_CATEGORY_PRIORITY = [
${priorityArrayBody}
] as const

export const ITEM_CATEGORY_TREE = {
${treeEntries.join("\n")}
} as const satisfies ItemCategoryTree
`
}
