import type {
  CompletionCategoryNode,
  CompletionCategoryTree,
  CompletionTab,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree-types/completion-category-tree-types.module.code.ts"
import { holdMorphRankMost } from "akasha/temper/player/skill-morph/modules/morph-ranks/morph-ranks.module.code.ts"

export const CARD_IDS = {
  account: [
    "account-achievements",
    "antiquity-leads-legendary",
    "antiquity-leads-motifs",
    "antiquity-lore",
    "bank-upgrades",
    "champion-points",
    "collectibles",
    "grand-master-stations",
    "account-recipes",
    "account-trait-research",
    "item-sets",
    "lore-library",
    "account-points-of-interest",
    "account-quests",
    "account-scribing-knowledge",
    "subclassing-skill-lines",
    "subclassing-skill-morphs",
    "tales-of-tribute",
    "account-zone-completion",
  ],
  characters: [
    "character-achievements",
    "alliance-rank",
    "cadwells-almanac",
    "character-level",
    "companion-quests",
    "daily-writs",
    "companion-rapport-character",
    "recipes",
    "trait-research",
    "lore-library-character",
    "mount-training",
    "pack-upgrades",
    "points-of-interest",
    "quests",
    "skill-lines",
    "skill-morphs",
    "skill-points",
    "scribing-knowledge",
    "zone-completion",
  ],
  companions: [
    "companion-level",
    "companion-quests-union",
    "companion-rapport",
    "companion-skill-lines",
  ],
  tasks: ["guild-sales", "hireling-mails", "active-quests", "inventory-management", "dungeon-sets"],
} as const satisfies Record<CompletionTab, readonly string[]>

interface CompletionCategoryPage {
  readonly slug?: unknown
  readonly title?: unknown
  readonly nodeId?: unknown
  readonly tab?: unknown
  readonly displayOrder?: unknown
  readonly parent?: unknown
  readonly completionMost?: unknown
  readonly morphRankMost?: unknown
}

export const COMPLETION_CATEGORY_FIELDS: readonly string[] = [
  "slug",
  "title",
  "nodeId",
  "tab",
  "displayOrder",
  "parent",
  "completionMost",
  "morphRankMost",
]

let most: ReadonlyMap<string, number> = new Map()

const TABS: readonly CompletionTab[] = ["account", "characters", "companions", "tasks"]

const UNREAD =
  "the completion tree is read from the completion category pages, and nothing has read it yet — hold the skill catalogue before the work starts"

let held: CompletionCategoryTree | null = null

function parentOf(page: CompletionCategoryPage): string | null {
  if (typeof page.parent !== "string") return null
  const named = page.parent.split("/")
  return named[named.length - 1] ?? null
}

function placeOf(page: CompletionCategoryPage): number {
  if (typeof page.displayOrder !== "number") {
    throw new Error(`the completion category ${String(page.slug)} states no place`)
  }
  return page.displayOrder
}

function nodesUnder(
  pages: readonly CompletionCategoryPage[],
  parent: unknown
): readonly CompletionCategoryNode[] {
  return pages
    .filter((page) => parentOf(page) === parent)
    .sort((one, other) => placeOf(one) - placeOf(other))
    .map((page) => {
      const node = { id: String(page.nodeId), name: String(page.title) }
      const children = nodesUnder(pages, page.slug)
      return children.length > 0 ? { ...node, children } : node
    })
}

function treeOf(pages: readonly CompletionCategoryPage[]): CompletionCategoryTree {
  const tree: Partial<Record<CompletionTab, readonly CompletionCategoryNode[]>> = {}
  for (const tab of TABS) {
    const root = pages.find((page) => parentOf(page) === null && page.tab === tab)
    const cards = root === undefined ? [] : nodesUnder(pages, root.slug)
    const named = cards.map((card) => card.id).join(",")
    if (named !== CARD_IDS[tab].join(",")) {
      throw new Error(
        `the ${tab} completion pages name the cards ${named}, and no others are drawn`
      )
    }
    tree[tab] = cards
  }
  return tree as CompletionCategoryTree
}

export function holdCompletionCategoryPages(pages: readonly CompletionCategoryPage[]): undefined {
  held = treeOf(pages)
  const found = new Map<string, number>()
  for (const page of pages) {
    if (typeof page.completionMost === "number") found.set(String(page.nodeId), page.completionMost)
    if (typeof page.morphRankMost === "number") holdMorphRankMost(page.morphRankMost)
  }
  most = found
  return undefined
}

export function completionMost(nodeId: string): number {
  const cap = most.get(nodeId)
  if (cap === undefined) throw new Error(`no completion page caps the category ${nodeId}`)
  return cap
}

export function completionCategoryTree(): CompletionCategoryTree {
  const tree = held
  if (tree === null) throw new Error(UNREAD)
  return tree
}

function leavesOf(nodes: readonly CompletionCategoryNode[]): readonly CompletionCategoryNode[] {
  return nodes.flatMap((node) => (node.children === undefined ? [node] : leavesOf(node.children)))
}

export function completionCardLeaves(
  tab: CompletionTab,
  cardId: string
): readonly CompletionCategoryNode[] {
  const card = completionCategoryTree()[tab].find((one) => one.id === cardId)
  if (card === undefined) throw new Error(`no ${tab} completion page names the card ${cardId}`)
  return leavesOf(card.children ?? [])
}

export function completionCardTitle(tab: CompletionTab, cardId: string): string {
  const card = completionCategoryTree()[tab].find((one) => one.id === cardId)
  if (card === undefined) throw new Error(`no ${tab} completion page names the card ${cardId}`)
  return card.name
}
