interface CompanionQuestEntry {
  questId: number
  name: string
  requiredRapportLevel?: number
}

export interface CompanionQuestGroup {
  readonly companionId: string
  readonly companionName: string
  readonly quests: readonly CompanionQuestEntry[]
}

export interface CompanionQuestPage {
  readonly key?: unknown
  readonly firstName?: unknown
  readonly companionQuests?: unknown
}

type ReadGroups = (this: void) => readonly CompanionQuestGroup[]

const UNREAD =
  "the companion quests are read from the companion pages, and nothing has read them yet — hold the companion catalogue before the work starts"

let held: readonly CompanionQuestGroup[] | null = null

let reader: ReadGroups | null = null

function questOf(row: unknown): CompanionQuestEntry | null {
  if (typeof row !== "object" || row === null) return null
  const { esoQuestId, questName, requiredRapportLevel } = row as Record<string, unknown>
  if (typeof esoQuestId !== "number" || typeof questName !== "string") return null
  const quest: CompanionQuestEntry = { questId: esoQuestId, name: questName }
  if (typeof requiredRapportLevel === "number") quest.requiredRapportLevel = requiredRapportLevel
  return quest
}

export function companionQuestGroupsOf(
  pages: readonly CompanionQuestPage[]
): readonly CompanionQuestGroup[] {
  const groups: CompanionQuestGroup[] = []
  for (const page of pages) {
    if (typeof page.key !== "string" || !Array.isArray(page.companionQuests)) continue
    const quests: CompanionQuestEntry[] = []
    for (const row of page.companionQuests) {
      const quest = questOf(row)
      if (quest === null)
        throw new Error(`the companion ${page.key} states a quest with no number or name`)
      quests.push(quest)
    }
    if (quests.length === 0) continue
    const companionName = typeof page.firstName === "string" ? page.firstName : page.key
    groups.push({ companionId: page.key, companionName, quests })
  }
  groups.sort((one, other) => (one.companionId < other.companionId ? -1 : 1))
  return groups
}

export function holdCompanionQuestGroups(
  groups: readonly CompanionQuestGroup[]
): readonly CompanionQuestGroup[] {
  held = groups
  return groups
}

export function readCompanionQuestGroupsWith(read: ReadGroups): undefined {
  reader = read
  return undefined
}

export function companionQuestGroups(): readonly CompanionQuestGroup[] {
  if (held === null && reader !== null) held = reader()
  if (held === null) throw new Error(UNREAD)
  return held
}

export function isCompanionQuest(questId: number): boolean {
  for (const group of companionQuestGroups()) {
    for (const quest of group.quests) if (quest.questId === questId) return true
  }
  return false
}
