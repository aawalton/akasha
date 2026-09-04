import type { PageType } from "@akasha/pages-system/page-type"
import type { AbilityIcon } from "../properties/ability-icon.text-property.ts"
import type { AffixScripts } from "../properties/affix-scripts.page-property-entry.ts"
import type { FocusScripts } from "../properties/focus-scripts.text-property.ts"
import type { SignatureScripts } from "../properties/signature-scripts.page-property-entry.ts"
import type { TemperScribingThing } from "../scribing-things/temper-scribing-thing.page-type.ts"

export type TemperGrimoire = TemperScribingThing & {
  abilityIcon: AbilityIcon
  focusScripts: FocusScripts
  affixScripts: AffixScripts
  signatureScripts: SignatureScripts
}

export const temperGrimoire = {
  id: "01a05fca-cb89-7d99-aa9d-e89e410a0f89",
  pageTypeSlug: "page-type",
  slug: "temper-grimoire",
  definition: "a book a character scribes a skill from",
  pluralSlug: "temper-grimoires",
  extendsSlug: "page-type/temper-scribing-thing",
  partSlugs: [
    "page-property-entry/affix-scripts",
    "page-property-entry/signature-scripts",
    "text-property/ability-icon",
    "text-property/class-id",
    "text-property/focus-scripts",
    "text-property/script-id",
  ],
  properties: [
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "ability-icon", required: true, many: false },
    { pagePropertySlug: "skill-line-id", required: true, many: false },
    { pagePropertySlug: "focus-scripts", required: true, many: true, max: null },
    { pagePropertySlug: "affix-scripts", required: true, many: false },
    { pagePropertySlug: "signature-scripts", required: true, many: false },
  ],
} as const satisfies PageType
