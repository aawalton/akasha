import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const guildId = {
  id: "01a0d8a0-61b3-7d84-8f2b-b3ddab5ccb09",
  type: "page-type/number-property",
  slug: "guild-id",
  propertySlug: "guild-id",
  definition: "the number The Elder Scrolls Online gives a guild on its megaserver",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two megaservers may give two guilds the same number.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
