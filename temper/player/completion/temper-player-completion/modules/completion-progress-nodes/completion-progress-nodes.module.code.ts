import type {
  ItemPickerLevel,
  ItemProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

export interface ProgressLeaf {
  key: string
  label: string
  count: number
  total: number
}

export interface ProgressBranch {
  key: string
  label: string
  children: readonly ProgressNode[]
}

export type ProgressNode = ProgressLeaf | ProgressBranch

type ItemPath = readonly (string | number)[]

export function childrenOf(node: ProgressNode): readonly ProgressNode[] {
  return "children" in node ? node.children : []
}

function sumOf(nodes: readonly ProgressNode[]): ItemProgress {
  let current = 0
  let total = 0
  for (const node of nodes) {
    const one = nodeProgress(node)
    current += one.current
    total += one.total
  }
  return { current, total }
}

function nodeProgress(node: ProgressNode): ItemProgress {
  if ("children" in node) return sumOf(node.children)
  return { current: node.count, total: node.total }
}

export function nodeAt(nodes: readonly ProgressNode[], path: ItemPath): ProgressNode | undefined {
  let level = nodes
  let found: ProgressNode | undefined
  for (const step of path) {
    const key = String(step)
    found = level.find((node) => node.key === key)
    if (found === undefined) return undefined
    level = childrenOf(found)
  }
  return found
}

export function progressAt(
  nodes: readonly ProgressNode[],
  path: ItemPath
): ItemProgress | undefined {
  if (path.length === 0) return sumOf(nodes)
  const node = nodeAt(nodes, path)
  return node === undefined ? undefined : nodeProgress(node)
}

export function isNodesComplete(nodes: readonly ProgressNode[]): boolean {
  const { current, total } = sumOf(nodes)
  return total > 0 && current >= total
}

export function pickerLevelAt(
  nodes: readonly ProgressNode[],
  path: ItemPath,
  labels: readonly string[]
): ItemPickerLevel | null {
  const label = labels[path.length]
  if (label === undefined) return null
  const node = path.length === 0 ? undefined : nodeAt(nodes, path)
  if (path.length > 0 && node === undefined) return null
  const level = node === undefined ? nodes : childrenOf(node)
  if (level.length === 0) return null
  return { label, options: level.map((one) => ({ value: one.key, label: one.label })) }
}
