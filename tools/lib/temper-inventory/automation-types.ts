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
