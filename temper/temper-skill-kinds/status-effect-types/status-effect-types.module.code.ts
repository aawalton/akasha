import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface StatusEffectTypeTemplate {
  id: string
  name: string
}

const STATUS_EFFECT_TYPE_DATA = {
  "stun": { id: "stun", name: "Stun" },
  "fear": { id: "fear", name: "Fear" },
  "immobilize": { id: "immobilize", name: "Immobilize" },
  "knockback": { id: "knockback", name: "Knockback" },
  "knockup": { id: "knockup", name: "Knockup" },
  "off-balance": { id: "off-balance", name: "Off Balance" },
  "snare": { id: "snare", name: "Snare" },
  "burning": { id: "burning", name: "Burning" },
  "chilled": { id: "chilled", name: "Chilled" },
  "concussed": { id: "concussed", name: "Concussed" },
  "taunt": { id: "taunt", name: "Taunt" },
  "invisible": { id: "invisible", name: "Invisible" },
} as const satisfies Record<string, StatusEffectTypeTemplate>

export const statusEffectTypes = createDataFile<StatusEffectTypeTemplate>()(STATUS_EFFECT_TYPE_DATA)
