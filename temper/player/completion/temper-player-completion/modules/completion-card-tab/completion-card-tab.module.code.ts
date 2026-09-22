import { COMPLETION_CATEGORY_TREE_STATIC } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type {
  CompletionCategoryNode,
  CompletionCategoryTree,
  CompletionTab,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree-types/completion-category-tree-types.module.code.ts"

const SHOWN_TABS: readonly CompletionTab[] = ["account", "characters", "companions"]

const UNDER_TWO_TABS = null

function noteNodes(
  nodes: readonly CompletionCategoryNode[],
  tab: CompletionTab,
  into: Map<string, CompletionTab | null>
): undefined {
  for (const node of nodes) {
    const already = into.get(node.id)
    into.set(node.id, already === undefined || already === tab ? tab : UNDER_TWO_TABS)
    if (node.children !== undefined) noteNodes(node.children, tab, into)
  }
  return
}

function buildCardTabMap(tree: CompletionCategoryTree): Map<string, CompletionTab | null> {
  const map = new Map<string, CompletionTab | null>()
  for (const tab of SHOWN_TABS) noteNodes(tree[tab], tab, map)
  return map
}

const CARD_TAB_MAPS = new WeakMap<CompletionCategoryTree, Map<string, CompletionTab | null>>()

function cardTabMap(tree: CompletionCategoryTree): Map<string, CompletionTab | null> {
  const already = CARD_TAB_MAPS.get(tree)
  if (already !== undefined) return already
  const built = buildCardTabMap(tree)
  CARD_TAB_MAPS.set(tree, built)
  return built
}

export function getCompletionCardTab(
  cardId: string,
  tree: CompletionCategoryTree = COMPLETION_CATEGORY_TREE_STATIC
): CompletionTab | undefined {
  return cardTabMap(tree).get(cardId) ?? undefined
}
