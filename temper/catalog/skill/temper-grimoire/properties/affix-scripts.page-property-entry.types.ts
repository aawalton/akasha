import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AppliedDebuffs } from "akasha/temper/catalog/skill/temper-affix-script/properties/applied-debuffs.multi-relation-property.types.ts"
import type { GrantedBuffs } from "akasha/temper/catalog/skill/temper-affix-script/properties/granted-buffs.one-of-property.types.ts"
import type { ClassId } from "akasha/temper/catalog/skill/temper-grimoire/properties/class-id.relation-property.types.ts"
import type { ScriptId } from "akasha/temper/catalog/skill/temper-grimoire/properties/script-id.relation-property.types.ts"

export type AffixScripts = "jsonl"

export type AffixScriptsRow = {
  id: Id
  scriptId: ScriptId
  classId?: ClassId
  description: Description
  grantedBuffs?: GrantedBuffs
  appliedDebuffs?: AppliedDebuffs
}
