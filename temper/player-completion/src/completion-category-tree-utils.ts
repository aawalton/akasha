import { COMPLETION_CATEGORY_TREE } from "./completion-category-tree-data"
import type { CompletionCategoryNode, CompletionTab } from "./completion-category-tree-types"

const TABS: readonly CompletionTab[] = ["account", "characters", "companions"]

const CARD_TAB_MAP = new Map<string, CompletionTab>()
for (const tab of TABS) {
  for (const node of COMPLETION_CATEGORY_TREE[tab]) {
    CARD_TAB_MAP.set(node.id, tab)
  }
}

export function getCompletionCardTab(cardId: string): CompletionTab | undefined {
  return CARD_TAB_MAP.get(cardId)
}

interface CompletionNodeRef {
  id: string
  name: string
}

export function getCompletionNodePath(nodeId: string): readonly CompletionNodeRef[] {
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
    for (const card of COMPLETION_CATEGORY_TREE[tab]) {
      const result = findInNode(card, [])
      if (result) return result
    }
  }

  return []
}

export function getCompletionNodeChildren(
  nodeId: string | undefined,
  tab: CompletionTab
): readonly CompletionNodeRef[] {
  if (nodeId === undefined) {
    return COMPLETION_CATEGORY_TREE[tab].map((n) => ({ id: n.id, name: n.name }))
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

  for (const card of COMPLETION_CATEGORY_TREE[tab]) {
    const result = findChildren(card)
    if (result !== null) return result
  }

  return []
}
