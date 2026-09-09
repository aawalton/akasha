import type { PageType } from "@akasha/pages/page-type"
import type { FocusScriptId } from "../properties/focus-script-id.text-property.ts"
import type { GrimoireId } from "../properties/grimoire-id.text-property.ts"
import type { TemperSkill } from "../skills/temper-skill.page-type.ts"

export type TemperScribedSkill = TemperSkill & {
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}

export const temperScribedSkill = {
  id: "01a05fca-cb8a-72ce-84c1-1585368027e5",
  pageTypeSlug: "page-type",
  slug: "temper-scribed-skill",
  definition: "a skill written out of a grimoire and its scripts",
  pluralSlug: "temper-scribed-skills",
  extends: ["page-type/temper-skill"],
  partSlugs: ["text-property/focus-script-id", "text-property/grimoire-id"],
  properties: [
    { pagePropertySlug: "text-property/icon", required: true, many: false },
    { pagePropertySlug: "text-property/focus-script-id", required: true, many: false },
    { pagePropertySlug: "text-property/grimoire-id", required: true, many: false },
  ],
} as const satisfies PageType
