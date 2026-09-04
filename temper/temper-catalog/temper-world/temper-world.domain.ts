import type { Domain } from "../../../domains/domain.page-type.ts"

export const temperWorld = {
  id: "01a05fba-ce3d-792d-9f9f-937d79f8f4d9",
  pageTypeSlug: "domain",
  slug: "temper-world",
  definition: "the places of Tamriel and the people who live in them",
  pluralSlug: "temper-worlds",
  partSlugs: [
    "instant-property/captured-at",
    "page-type/temper-alliance",
    "page-type/temper-catalog-domain",
    "page-type/temper-dungeon",
    "page-type/temper-location-type",
    "page-type/temper-quest-giver",
    "page-type/temper-race",
    "page-type/temper-source-category",
    "page-type/temper-world-zone",
    "page-type/temper-zone",
  ],
} as const satisfies Domain
