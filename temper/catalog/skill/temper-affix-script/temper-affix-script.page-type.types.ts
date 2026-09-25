import type { AppliedDebuffs } from "akasha/temper/catalog/skill/temper-affix-script/properties/applied-debuffs.multi-relation-property.types.ts"
import type { GrantedBuffs } from "akasha/temper/catalog/skill/temper-affix-script/properties/granted-buffs.one-of-property.types.ts"
import type { TemperScript } from "akasha/temper/catalog/skill/temper-script/temper-script.page-type.types.ts"

export type TemperAffixScript = TemperScript & {
  grantedBuffs?: GrantedBuffs
  appliedDebuffs?: AppliedDebuffs
}
