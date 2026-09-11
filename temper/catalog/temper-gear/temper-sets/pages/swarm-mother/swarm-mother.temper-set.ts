import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const swarmMother = {
  id: "019e6484-601c-71ec-9044-25babff6b440",
  type: "temper-set",
  slug: "swarm-mother",
  title: "Swarm Mother",
  key: "swarm-mother",
  esoSetId: 267,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
