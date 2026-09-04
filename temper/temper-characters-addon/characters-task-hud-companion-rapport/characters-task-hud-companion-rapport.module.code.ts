import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "@akasha/temper-player-completion/companion-rapport"

interface CompanionRapportSource {
  defId: number
  name: string
  sources: readonly string[]
}

const COMPANION_RAPPORT_SOURCES: readonly CompanionRapportSource[] = [
  {
    defId: 9,
    name: "Azandar",
    sources: ["Enchanting Writ Daily", "Necrom Delve Daily"],
  },
  { defId: 1, name: "Bastian", sources: ["Mages Guild Daily"] },
  {
    defId: 5,
    name: "Ember",
    sources: ["Mages Guild Daily", "Thieves Guild Heist Daily", "High Isle Delve Daily"],
  },
  {
    defId: 6,
    name: "Isobel",
    sources: ["High Isle Delve Daily", "High Isle World Boss Daily"],
  },
  {
    defId: 2,
    name: "Mirri",
    sources: ["Fighters Guild Daily", "Ashlander Daily (Numani-Rasi)"],
  },
  {
    defId: 8,
    name: "Sharp-as-Night",
    sources: ["Ashlander Hunt Daily", "Necrom World Boss Daily"],
  },
  {
    defId: 12,
    name: "Tanlorin",
    sources: ["Fighters Guild Daily", "Alchemy Writ Daily"],
  },
  {
    defId: 13,
    name: "Zerith-var",
    sources: ["Northern Elsweyr Defense Force Daily", "Tales of Tribute Daily"],
  },
]

export interface CompanionRapportEnrichment {
  companionName: string
  sources: readonly string[]
  currentPoints: number
}

export function pickFirstIncompleteCompanionRapport(
  rapport: Record<number, number> | undefined
): CompanionRapportEnrichment | undefined {
  for (const entry of COMPANION_RAPPORT_SOURCES) {
    const raw = rapport?.[entry.defId]
    const currentPoints = raw === undefined ? 0 : clampRapportProgress(raw)
    if (currentPoints < MAX_COMPANION_RAPPORT) {
      return { companionName: entry.name, sources: entry.sources, currentPoints }
    }
  }
  return undefined
}
