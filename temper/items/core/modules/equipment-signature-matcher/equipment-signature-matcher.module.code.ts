interface SignatureMatchTarget {
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
  setId?: number
}

interface MatchableItem {
  equipType?: number
  traitType?: number
  quality?: number
  armorType?: number
  weaponType?: number
  setId?: number
}

interface WornWanter extends SignatureMatchTarget {
  esoCharId: string
}

export function signatureMatchesItem(sig: SignatureMatchTarget, item: MatchableItem): boolean {
  if (item.equipType !== sig.equipType) return false
  if (item.traitType !== sig.traitType) return false
  if (item.quality !== sig.quality) return false
  if (sig.armorType !== undefined && item.armorType !== sig.armorType) return false
  if (sig.weaponType !== undefined && item.weaponType !== sig.weaponType) return false
  if (sig.setId !== undefined && item.setId !== sig.setId) return false
  return true
}

function sameWanter(a: WornWanter, b: WornWanter): boolean {
  return (
    a.esoCharId === b.esoCharId &&
    a.equipType === b.equipType &&
    a.traitType === b.traitType &&
    a.quality === b.quality &&
    a.armorType === b.armorType &&
    a.weaponType === b.weaponType &&
    a.setId === b.setId
  )
}

export function firstUnfilledWanter<S extends WornWanter>(
  wanted: readonly S[],
  item: MatchableItem,
  wornBy: (this: void, charId: string) => readonly MatchableItem[]
): S | undefined {
  for (const [i, sig] of wanted.entries()) {
    if (!signatureMatchesItem(sig, item)) continue
    const alikeBefore = wanted.slice(0, i).filter((one) => sameWanter(one, sig)).length
    const worn = wornBy(sig.esoCharId).filter((one) => signatureMatchesItem(sig, one)).length
    if (worn > alikeBefore) continue
    return sig
  }
  return undefined
}
