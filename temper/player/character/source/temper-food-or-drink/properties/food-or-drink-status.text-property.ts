import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const foodOrDrinkStatus = {
  id: "01a15a06-9b6c-75ac-9aeb-865a0abf2dc0",
  type: "page-type/text-property",
  slug: "food-or-drink-status",
  propertySlug: "status",
  definition: "how far temper models what a food or drink's buff does",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The status is `supported`, `partially-supported` or `unsupported`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff marked unsupported moves no metric temper counts.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T15:55:44.875Z",
  updatedAt: "2026-10-20T15:55:44.875Z",
} as const satisfies TextProperty
