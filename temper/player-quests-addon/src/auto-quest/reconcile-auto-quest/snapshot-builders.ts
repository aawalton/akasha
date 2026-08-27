import {
  type AutoQuestMemory,
  type AutoQuestSnapshot,
  type ChatterOptionKind,
  type ClassifiedChatterOption,
  INITIAL_AUTO_QUEST_MEMORY,
} from "../decide"

export function opt(
  index: number,
  kind: ChatterOptionKind,
  chosenBefore?: boolean
): ClassifiedChatterOption {
  return { index, kind, chosenBefore }
}

export function snap(overrides?: Partial<AutoQuestSnapshot>): AutoQuestSnapshot {
  return {
    inChatter: true,
    offerPending: false,
    options: [],
    menuFingerprint: "menu",
    ...overrides,
  }
}

export function mem(overrides?: Partial<AutoQuestMemory>): AutoQuestMemory {
  return { ...INITIAL_AUTO_QUEST_MEMORY, ...overrides }
}
