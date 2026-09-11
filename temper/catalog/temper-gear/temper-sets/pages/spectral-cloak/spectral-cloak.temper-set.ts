import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const spectralCloak = {
  id: "019e6484-5fd4-7840-884d-84b28a30a91c",
  type: "temper-set",
  slug: "spectral-cloak",
  title: "Spectral Cloak",
  key: "spectral-cloak",
  esoSetId: 413,
  subcategoryId: "arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
