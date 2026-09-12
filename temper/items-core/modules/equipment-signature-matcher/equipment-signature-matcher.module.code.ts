export interface SignatureMatchTarget {
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
}

export interface MatchableItem {
  equipType?: number
  traitType?: number
  quality?: number
  armorType?: number
  weaponType?: number
}

export function signatureMatchesItem(sig: SignatureMatchTarget, item: MatchableItem): boolean {
  if (item.equipType !== sig.equipType) return false
  if (item.traitType !== sig.traitType) return false
  if (item.quality !== sig.quality) return false
  if (sig.armorType !== undefined && item.armorType !== sig.armorType) return false
  if (sig.weaponType !== undefined && item.weaponType !== sig.weaponType) return false
  return true
}
