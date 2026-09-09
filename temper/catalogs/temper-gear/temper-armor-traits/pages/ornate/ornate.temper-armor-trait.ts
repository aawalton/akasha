import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const ornate = {
  id: "01a05fb2-1bd0-7720-9436-969891f3e40f",
  pageTypeSlug: "temper-armor-trait",
  slug: "ornate",
  title: "Ornate",
  key: "ornate",
  effect: "Increases sell price",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_ORNATE",
  displayOrder: 10,
} as const satisfies TemperArmorTrait
