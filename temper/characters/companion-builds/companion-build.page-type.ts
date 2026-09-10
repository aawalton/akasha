import type { PageType } from "@akasha/pages/page-type"
import type { BuildCorrelationId } from "../character-builds/properties/build-correlation-id.text-property.ts"
import type { BuildTargetCount } from "../character-builds/properties/build-target-count.number-property.ts"
import type { BuildVisibility } from "../character-builds/properties/build-visibility.select-property.ts"
import type { BuildHash } from "../temper-build-versions/properties/build-hash.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { BaseRoles } from "./properties/base-roles.select-property.ts"

export type CompanionBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  baseRoles?: BaseRoles
}

export const companionBuild = {
  id: "01a06835-fae8-7a27-90c7-c499c3e046cc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "companion-build",
  definition: "one saved arrangement of a companion's gear, skills and stats",
  pluralSlug: "companion-builds",
  extends: ["page-type/temper-character-thing"],
  parts: ["select-property/base-roles"],
  properties: [
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "select-property/build-visibility", required: true, many: false },
    { pageProperty: "text-property/build-correlation-id", required: false, many: false },
    { pageProperty: "number-property/build-target-count", required: false, many: false },
    { pageProperty: "select-property/base-roles", required: false, many: true, maxCount: 2 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is the arrangement itself rather than the companion wearing that build.",
    },
    {
      invariantKind: "departure",
      statement: "One companion has many builds.",
    },
    {
      invariantKind: "departure",
      statement: "One build is shared across companions.",
    },
    {
      invariantKind: "departure",
      statement: "Two builds arranged alike carry one hash.",
    },

    {
      invariantKind: "departure",
      statement: "This page type is Temper's while its slug has no temper- prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A build's name is its title rather than a second field saying the same.",
    },
  ],
} as const satisfies PageType
