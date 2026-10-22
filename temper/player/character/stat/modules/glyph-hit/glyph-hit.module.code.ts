type GlyphHitTerms = {
  readonly tooltip: number
  readonly directDamageMonsters: number
  readonly targetDamageTaken: number
}

export function glyphHitOf(terms: GlyphHitTerms): number {
  return Math.round(
    terms.tooltip * (1 + terms.directDamageMonsters) * (1 + terms.targetDamageTaken)
  )
}
