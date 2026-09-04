import type {
  CompletionCategoryNode,
  CompletionCategoryTree,
  CompletionTab,
} from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"

const TABS: readonly CompletionTab[] = ["account", "characters", "companions"]

export interface CompletionNodeRef {
  id: string
  name: string
}

export function getCompletionNodePath(
  nodeId: string,
  tree: CompletionCategoryTree
): readonly CompletionNodeRef[] {
  function findInNode(
    node: CompletionCategoryNode,
    ancestors: readonly CompletionNodeRef[]
  ): readonly CompletionNodeRef[] | null {
    const current = [...ancestors, { id: node.id, name: node.name }]
    if (node.id === nodeId) return current
    if (node.children) {
      for (const child of node.children) {
        const result = findInNode(child, current)
        if (result) return result
      }
    }
    return null
  }

  for (const tab of TABS) {
    for (const card of tree[tab]) {
      const result = findInNode(card, [])
      if (result) return result
    }
  }

  return []
}

export function getCompletionNodeChildren(
  nodeId: string | undefined,
  tab: CompletionTab,
  tree: CompletionCategoryTree
): readonly CompletionNodeRef[] {
  if (nodeId === undefined) {
    return tree[tab].map((node) => ({ id: node.id, name: node.name }))
  }

  function findChildren(node: CompletionCategoryNode): readonly CompletionNodeRef[] | null {
    if (node.id === nodeId) {
      return node.children ? node.children.map((c) => ({ id: c.id, name: c.name })) : []
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findChildren(child)
        if (result !== null) return result
      }
    }
    return null
  }

  for (const card of tree[tab]) {
    const result = findChildren(card)
    if (result !== null) return result
  }

  return []
}
