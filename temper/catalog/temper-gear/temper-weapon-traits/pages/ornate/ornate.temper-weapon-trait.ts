import type { TemperWeaponTrait } from "akasha/temper/catalog/temper-gear/temper-weapon-traits/temper-weapon-trait.page-type.types.ts"

export const ornate = {
  id: "019e5b8b-e54f-73ae-a237-4ba3c5b67565",
  type: "temper-weapon-trait",
  slug: "ornate",
  title: "Ornate",
  key: "ornate",
  effect: "Increases sell price",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_ORNATE",
  displayOrder: 10,
} as const satisfies TemperWeaponTrait
