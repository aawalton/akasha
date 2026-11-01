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
  buildId?: string
  backpack?: boolean
}

export interface WantedHolder {
  readonly esoCharId: string
  readonly worn: boolean
}

export interface CharacterPieces {
  readonly wornBy: (this: void, charId: string) => readonly MatchableItem[]
  readonly heldBy: (this: void, charId: string) => readonly MatchableItem[]
  readonly chosenBuildOf?: (this: void, charId: string) => string | undefined
  readonly holder?: string
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

function isSetUp(sig: WornWanter, pieces: CharacterPieces): boolean {
  const chosen = pieces.chosenBuildOf?.(sig.esoCharId)
  if (chosen !== undefined && sig.buildId !== undefined) return sig.buildId === chosen
  return sig.backpack !== true
}

function alikeBefore(
  wanted: readonly WornWanter[],
  i: number,
  keep: (this: void, one: WornWanter) => boolean
): number {
  const sig = wanted[i]
  if (sig === undefined) return 0
  return wanted.slice(0, i).filter((one) => keep(one) && sameWanter(one, sig)).length
}

function countAlike(sig: WornWanter, items: readonly MatchableItem[]): number {
  return items.filter((one) => signatureMatchesItem(sig, one)).length
}

export function wantedHolderOf(
  wanted: readonly WornWanter[],
  item: MatchableItem,
  pieces: CharacterPieces
): WantedHolder | undefined {
  const setUp = (one: WornWanter): boolean => isSetUp(one, pieces)
  for (const [i, sig] of wanted.entries()) {
    if (!setUp(sig) || !signatureMatchesItem(sig, item)) continue
    if (countAlike(sig, pieces.wornBy(sig.esoCharId)) > alikeBefore(wanted, i, setUp)) continue
    return { esoCharId: sig.esoCharId, worn: true }
  }
  for (const [i, sig] of wanted.entries()) {
    if (setUp(sig) || !signatureMatchesItem(sig, item)) continue
    if (sig.esoCharId === pieces.holder) return { esoCharId: sig.esoCharId, worn: false }
    const sameBuild = (one: WornWanter): boolean => one.buildId === sig.buildId
    if (countAlike(sig, pieces.heldBy(sig.esoCharId)) > alikeBefore(wanted, i, sameBuild)) continue
    return { esoCharId: sig.esoCharId, worn: false }
  }
  return undefined
}
