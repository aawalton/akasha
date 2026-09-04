export interface MasterWritSpec {
  craftType: number
  itemId: number
  templateId: number
  materialItemId: number
  targetQuality: number
  setId: number
  traitType: number
  styleId: number
  encodedAlchemyTraits: number
}

export function decodeMasterWrit(
  this: void,
  questIndex: number,
  conditionIndex: number
): MasterWritSpec | undefined {
  const [
    itemId,
    materialItemId,
    craftingType,
    itemQuality,
    itemTemplateId,
    itemSetId,
    itemTraitType,
    itemStyleId,
    encodedAlchemyTraits,
  ] = GetQuestConditionMasterWritInfo(questIndex, 1, conditionIndex)

  if (craftingType === undefined || craftingType === 0) return undefined
  if (itemQuality === undefined) return undefined

  const resolvedItemId = itemId ?? 0
  const templateId = itemTemplateId ?? 0
  if (resolvedItemId === 0 && templateId === 0) return undefined

  return {
    craftType: craftingType,
    itemId: resolvedItemId,
    templateId,
    materialItemId: materialItemId ?? 0,
    targetQuality: itemQuality,
    setId: itemSetId ?? 0,
    traitType: itemTraitType ?? 0,
    styleId: itemStyleId ?? 0,
    encodedAlchemyTraits: encodedAlchemyTraits ?? 0,
  }
}
