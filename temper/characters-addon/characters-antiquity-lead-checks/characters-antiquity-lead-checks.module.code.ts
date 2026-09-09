export function isMotifAntiquity(name: string): boolean {
  const [a] = string.find(name, "Ancestral", 1, true)
  if (a === 1) return true
  const [b] = string.find(name, "Ancient Daedric", 1, true)
  return b === 1
}

export interface ActiveAntiquityLead {
  readonly antiquityId: number
  readonly name: string
  readonly quality: number
  readonly loreRemaining: number
}

export function collectActiveAntiquityLeads(): ActiveAntiquityLead[] {
  const leads: ActiveAntiquityLead[] = []
  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    if (DoesAntiquityHaveLead(antiquityId)) {
      const total = GetNumAntiquityLoreEntries(antiquityId)
      const loreRemaining =
        total > 0 ? math.max(0, total - GetNumAntiquityLoreEntriesAcquired(antiquityId)) : 0
      leads.push({
        antiquityId,
        name: zo_strformat("<<1>>", GetAntiquityName(antiquityId)),
        quality: GetAntiquityQuality(antiquityId),
        loreRemaining,
      })
    }
    antiquityId = GetNextAntiquityId(antiquityId)
  }
  return leads
}

export function isMotifLead(lead: ActiveAntiquityLead): boolean {
  return isMotifAntiquity(lead.name)
}

export function isLegendaryLead(lead: ActiveAntiquityLead): boolean {
  return lead.quality === ANTIQUITY_QUALITY_GOLD || lead.quality === ANTIQUITY_QUALITY_ORANGE
}

export function isActionableLead(lead: ActiveAntiquityLead): boolean {
  return lead.loreRemaining > 0
}

export function hasNoAntiquityLeadMatching(
  predicate: (this: void, lead: ActiveAntiquityLead) => boolean
): boolean {
  return !collectActiveAntiquityLeads().some(predicate)
}
