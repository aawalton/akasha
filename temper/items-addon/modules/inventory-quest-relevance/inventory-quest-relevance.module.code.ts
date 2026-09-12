export function isItemLinkQuestRelevant(itemLink: string): boolean {
  if (itemLink === "") return false
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex++) {
    if (IsValidQuestIndex(questIndex)) {
      const numSteps = GetJournalQuestNumSteps(questIndex)
      for (let stepIndex = 1; stepIndex <= numSteps; stepIndex++) {
        const numConditions = GetJournalQuestNumConditions(questIndex, stepIndex)
        for (let conditionIndex = 1; conditionIndex <= numConditions; conditionIndex++) {
          if (
            DoesItemLinkFulfillJournalQuestCondition(
              itemLink,
              questIndex,
              stepIndex,
              conditionIndex,
              false
            )
          ) {
            return true
          }
        }
      }
    }
  }
  return false
}
