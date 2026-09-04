import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const ornate = {
  id: "019e5b8b-e54f-73ae-a237-4ba3c5b67565",
  pageTypeSlug: "temper-weapon-trait",
  slug: "ornate",
  title: "Ornate",
  key: "ornate",
  effect: "Increases sell price",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_ORNATE",
  displayOrder: 10,
} as const satisfies TemperWeaponTrait
