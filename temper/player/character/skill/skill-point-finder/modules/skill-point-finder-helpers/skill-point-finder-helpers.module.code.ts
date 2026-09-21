import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

export function questCompleted(this: void, questId: number): boolean {
  const [name] = GetCompletedQuestInfo(questId)
  return name !== ""
}

export function getSV(this: void, value: number | undefined): number {
  return value ?? 0
}
