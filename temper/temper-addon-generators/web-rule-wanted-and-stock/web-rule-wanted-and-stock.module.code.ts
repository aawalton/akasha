export const WEB_WANTED_AND_STOCK_CONDITIONS = `  if (context) {
    // isTargetEquip — match against wanted equipment signatures
    if (conditions.isTargetEquip !== undefined) {
      const matches = context.wantedEquipment.some((sig) => signatureMatchesItem(sig, item))
      if (conditions.isTargetEquip === "is-target-equip" && !matches) return false
      if (conditions.isTargetEquip === "not-target-equip" && matches) return false
    }

    // isTargetCompanionEquip — match against wanted companion equipment signatures
    if (conditions.isTargetCompanionEquip !== undefined) {
      const matches = context.wantedCompanionEquipment.some((sig) =>
        signatureMatchesItem(sig, item)
      )
      if (conditions.isTargetCompanionEquip === "is-target-companion-equip" && !matches)
        return false
      if (conditions.isTargetCompanionEquip === "not-target-companion-equip" && matches)
        return false
    }

    // allStocked — all characters wanting this consumable have enough stock
    if (conditions.allStocked !== undefined) {
      const threshold = conditions.stockThreshold ?? 200
      const wantingChars = context.wantedConsumables.get(item.itemId)
      let allStocked: boolean
      if (!wantingChars || wantingChars.length === 0) {
        // No characters want this — treat as stocked (vacuously true)
        allStocked = true
      } else {
        const charStock = context.consumableStock.get(item.itemId)
        allStocked = wantingChars.every((charId) => (charStock?.get(charId) ?? 0) >= threshold)
      }
      if (conditions.allStocked === "all-stocked" && !allStocked) return false
      if (conditions.allStocked === "not-all-stocked" && allStocked) return false
    }

    // targetQuantity — bank already has enough of this item, no need to stock more
    if (conditions.targetQuantity !== undefined) {
      const bankCount = context.bankStock.get(item.itemId) ?? 0
      if (bankCount >= conditions.targetQuantity) return false
    }
  }`
