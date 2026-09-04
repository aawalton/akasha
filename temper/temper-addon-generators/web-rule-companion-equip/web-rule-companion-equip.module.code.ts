export const WEB_COMPANION_EQUIP_CONDITION = `  // canCompanionEquip — pure trait range check, no context needed
  if (conditions.canCompanionEquip !== undefined) {
    const isCompanionEquippable = item.traitType >= 34 && item.traitType <= 60
    if (conditions.canCompanionEquip === "can-companion-equip" && !isCompanionEquippable)
      return false
    if (conditions.canCompanionEquip === "cannot-companion-equip" && isCompanionEquippable)
      return false
  }`
