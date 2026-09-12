export function isWritCraftType(craftType: number): boolean {
  return craftType >= 1 && craftType <= 7
}

export function isDailyCraftingQuest(questIndex: number): boolean {
  if (GetJournalQuestRepeatType(questIndex) !== QUEST_REPEAT_DAILY) return false
  const questType = GetJournalQuestType(questIndex)
  return questType === QUEST_TYPE_CRAFTING || questType === QUEST_TYPE_HOLIDAY_EVENT
}

export function isDailyCraftingWritQuest(questIndex: number): boolean {
  if (!isDailyCraftingQuest(questIndex)) return false

  const numConditions = GetJournalQuestNumConditions(questIndex, 1)
  for (let j = 1; j <= numConditions; j++) {
    const [, , condCraftType] = GetQuestConditionItemInfo(questIndex, 1, j)
    if (isWritCraftType(condCraftType)) return true
  }
  return false
}
