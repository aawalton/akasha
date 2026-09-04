import type { PageType } from "@akasha/pages-system/page-type"
import type { AbilityId } from "../temper-companion-things/properties/ability-id.number-property.ts"
import type { AlternateAbilityIds } from "../temper-companion-things/properties/alternate-ability-ids.number-property.ts"
import type { Tags } from "../temper-companion-things/properties/tags.text-property.ts"
import type { ValidRoles } from "../temper-companion-things/properties/valid-roles.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"
import type { CastConditions } from "./properties/cast-conditions.page-property-entry.ts"
import type { SkillEffects } from "./properties/skill-effects.page-property-entry.ts"

export type TemperCompanionSkill = TemperCompanionThing & {
  abilityId: AbilityId
  validRoles?: readonly ValidRoles[]
  tags?: readonly Tags[]
  alternateAbilityIds?: readonly AlternateAbilityIds[]
  skillEffects?: SkillEffects
  castConditions?: CastConditions
}

export const temperCompanionSkill = {
  id: "01a05fcf-90fc-73a8-ad6a-e3869228a309",
  pageTypeSlug: "page-type",
  slug: "temper-companion-skill",
  definition: "an ability a companion slots",
  pluralSlug: "temper-companion-skills",
  extendsSlug: ["page-type/temper-companion-thing"],
  partSlugs: [
    "boolean-property/augment-delay",
    "boolean-property/initial-tick",
    "boolean-property/is-casting",
    "boolean-property/is-movable",
    "number-property/ability-id",
    "number-property/alternate-ability-ids",
    "number-property/conditional-multiplier",
    "number-property/delay",
    "number-property/duration",
    "number-property/duration-offset",
    "number-property/effect-amount",
    "number-property/effect-count",
    "number-property/formula-percent",
    "number-property/heal-count",
    "number-property/health-below",
    "number-property/hit-count",
    "number-property/interval",
    "number-property/max-distance",
    "number-property/max-occurrences",
    "number-property/max-targets",
    "number-property/min-distance",
    "number-property/status-distance",
    "number-property/status-magnitude",
    "number-property/target-radius",
    "number-property/target-range",
    "number-property/tick-interval",
    "page-property-entry/cast-conditions",
    "page-property-entry/skill-effects",
    "record-property/effect-buff",
    "record-property/effect-conditions",
    "record-property/effect-debuff",
    "record-property/effect-formula",
    "record-property/effect-status",
    "record-property/effect-target",
    "record-property/nested-effect",
    "text-property/buff-name",
    "text-property/cast-condition-type",
    "text-property/coefficient-type",
    "text-property/condition-kind",
    "text-property/condition-weapon-type",
    "text-property/cooldown-scope",
    "text-property/debuff-name",
    "text-property/display-mode",
    "text-property/enemy-types",
    "text-property/formula-kind",
    "text-property/hd-application",
    "text-property/modifier-type",
    "text-property/resource",
    "text-property/skill-effect-type",
    "text-property/status-name",
    "text-property/synergy-name",
    "text-property/tags",
    "text-property/target-kind",
    "text-property/target-scope",
    "text-property/target-type",
    "text-property/trigger",
    "text-property/valid-roles",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "companion-id", required: true, many: false },
    { pagePropertySlug: "ability-id", required: true, many: false },
    { pagePropertySlug: "skill-line-id", required: true, many: false },
    { pagePropertySlug: "skill-type", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "valid-roles", required: false, many: true, max: null },
    { pagePropertySlug: "tags", required: false, many: true, max: null },
    { pagePropertySlug: "alternate-ability-ids", required: false, many: true, max: null },
    { pagePropertySlug: "skill-effects", required: false, many: false },
    { pagePropertySlug: "cast-conditions", required: false, many: false },
  ],
} as const satisfies PageType
