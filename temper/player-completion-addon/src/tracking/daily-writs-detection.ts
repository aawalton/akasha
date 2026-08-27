export function isDailyCraftingWritQuest(questIndex: number): boolean {
  const repeatType = GetJournalQuestRepeatType(questIndex)
  const questType = GetJournalQuestType(questIndex)
  if (repeatType !== QUEST_REPEAT_DAILY) return false
  if (questType !== QUEST_TYPE_CRAFTING && questType !== QUEST_TYPE_HOLIDAY_EVENT) return false
  const numConditions = GetJournalQuestNumConditions(questIndex, 1)
  for (let j = 1; j <= numConditions; j++) {
    const [, , condCraftType] = GetQuestConditionItemInfo(questIndex, 1, j)
    if (condCraftType >= 1 && condCraftType <= 7) return true
  }
  return false
}
