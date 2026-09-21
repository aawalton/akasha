export interface CharacterAutomationToggles {
  lockWornGear?: boolean
  equipment?: boolean
  food?: boolean
  potions?: boolean
  skills?: boolean
  championPoints?: boolean
  attributes?: boolean
  soulGems?: boolean
  repairKits?: boolean
  recharge?: boolean
  repair?: boolean
  lockpicks?: boolean
  experienceScrolls?: boolean
  dailyWrits?: boolean
  dailyWritBlacksmithing?: boolean
  dailyWritClothier?: boolean
  dailyWritWoodworking?: boolean
  dailyWritJewelrycrafting?: boolean
  dailyWritEnchanting?: boolean
  dailyWritAlchemy?: boolean
  dailyWritProvisioning?: boolean
  dailyWritAutoCraft?: boolean
  masterWrits?: boolean
  masterWritBlacksmithing?: boolean
  masterWritClothier?: boolean
  masterWritWoodworking?: boolean
  masterWritJewelrycrafting?: boolean
  masterWritEnchanting?: boolean
  masterWritAlchemy?: boolean
  masterWritProvisioning?: boolean
}

export interface CompanionAutomationToggles {
  equipment?: boolean
  skills?: boolean
}

export interface AutomationSettings {
  global?: {
    characters?: CharacterAutomationToggles
    companions?: CompanionAutomationToggles
  }
  characters: Record<string, CharacterAutomationToggles>
  companions: Record<string, CompanionAutomationToggles>
}

export function resolveToggle(
  perEntityValue: boolean | undefined,
  globalValue: boolean | undefined
): boolean {
  if (typeof perEntityValue === "boolean") return perEntityValue
  return globalValue ?? false
}

export function resolveCharacterToggles(
  perEntity: CharacterAutomationToggles | undefined,
  global: CharacterAutomationToggles | undefined
): {
  equipment: boolean
  food: boolean
  potions: boolean
  skills: boolean
  championPoints: boolean
  attributes: boolean
  soulGems: boolean
  repairKits: boolean
  recharge: boolean
  repair: boolean
  lockpicks: boolean
  experienceScrolls: boolean
  dailyWrits: boolean
  dailyWritBlacksmithing: boolean
  dailyWritClothier: boolean
  dailyWritWoodworking: boolean
  dailyWritJewelrycrafting: boolean
  dailyWritEnchanting: boolean
  dailyWritAlchemy: boolean
  dailyWritProvisioning: boolean
  dailyWritAutoCraft: boolean
  masterWrits: boolean
  masterWritBlacksmithing: boolean
  masterWritClothier: boolean
  masterWritWoodworking: boolean
  masterWritJewelrycrafting: boolean
  masterWritEnchanting: boolean
  masterWritAlchemy: boolean
  masterWritProvisioning: boolean
} {
  return {
    equipment: resolveToggle(perEntity?.equipment, global?.equipment),
    food: resolveToggle(perEntity?.food, global?.food),
    potions: resolveToggle(perEntity?.potions, global?.potions),
    skills: resolveToggle(perEntity?.skills, global?.skills),
    championPoints: resolveToggle(perEntity?.championPoints, global?.championPoints),
    attributes: resolveToggle(perEntity?.attributes, global?.attributes),
    soulGems: resolveToggle(perEntity?.soulGems, global?.soulGems),
    repairKits: resolveToggle(perEntity?.repairKits, global?.repairKits),
    recharge: resolveToggle(perEntity?.recharge, global?.recharge),
    repair: resolveToggle(perEntity?.repair, global?.repair),
    lockpicks: resolveToggle(perEntity?.lockpicks, global?.lockpicks),
    experienceScrolls: resolveToggle(perEntity?.experienceScrolls, global?.experienceScrolls),
    dailyWrits: resolveToggle(perEntity?.dailyWrits, global?.dailyWrits),
    dailyWritBlacksmithing: resolveToggle(
      perEntity?.dailyWritBlacksmithing,
      global?.dailyWritBlacksmithing
    ),
    dailyWritClothier: resolveToggle(perEntity?.dailyWritClothier, global?.dailyWritClothier),
    dailyWritWoodworking: resolveToggle(
      perEntity?.dailyWritWoodworking,
      global?.dailyWritWoodworking
    ),
    dailyWritJewelrycrafting: resolveToggle(
      perEntity?.dailyWritJewelrycrafting,
      global?.dailyWritJewelrycrafting
    ),
    dailyWritEnchanting: resolveToggle(perEntity?.dailyWritEnchanting, global?.dailyWritEnchanting),
    dailyWritAlchemy: resolveToggle(perEntity?.dailyWritAlchemy, global?.dailyWritAlchemy),
    dailyWritProvisioning: resolveToggle(
      perEntity?.dailyWritProvisioning,
      global?.dailyWritProvisioning
    ),
    dailyWritAutoCraft: resolveToggle(perEntity?.dailyWritAutoCraft, global?.dailyWritAutoCraft),
    masterWrits: resolveToggle(perEntity?.masterWrits, global?.masterWrits),
    masterWritBlacksmithing: resolveToggle(
      perEntity?.masterWritBlacksmithing,
      global?.masterWritBlacksmithing
    ),
    masterWritClothier: resolveToggle(perEntity?.masterWritClothier, global?.masterWritClothier),
    masterWritWoodworking: resolveToggle(
      perEntity?.masterWritWoodworking,
      global?.masterWritWoodworking
    ),
    masterWritJewelrycrafting: resolveToggle(
      perEntity?.masterWritJewelrycrafting,
      global?.masterWritJewelrycrafting
    ),
    masterWritEnchanting: resolveToggle(
      perEntity?.masterWritEnchanting,
      global?.masterWritEnchanting
    ),
    masterWritAlchemy: resolveToggle(perEntity?.masterWritAlchemy, global?.masterWritAlchemy),
    masterWritProvisioning: resolveToggle(
      perEntity?.masterWritProvisioning,
      global?.masterWritProvisioning
    ),
  }
}

export function resolveCompanionToggles(
  perEntity: CompanionAutomationToggles | undefined,
  global: CompanionAutomationToggles | undefined
): { equipment: boolean; skills: boolean } {
  return {
    equipment: resolveToggle(perEntity?.equipment, global?.equipment),
    skills: resolveToggle(perEntity?.skills, global?.skills),
  }
}
