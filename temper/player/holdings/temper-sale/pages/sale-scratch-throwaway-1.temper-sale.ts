import type { TemperSale } from "akasha/temper/player/holdings/temper-sale/temper-sale.page-type.types.ts"

export const saleScratchThrowaway1 = {
  id: "01a0d8c6-ded6-75f2-ad6f-91c164f794e1",
  type: "page-type/temper-sale",
  slug: "sale-scratch-throwaway-1",
  title: "Scratch Throwaway Ore",
  accountPage: "temper-account/temper-account",
  saleId: "scratch-throwaway-1",
  salePrice: 100,
  tax: 7,
  netPayout: 93,
  name: "Scratch Throwaway Ore",
  itemId: "64489",
  quantity: 3,
  buyerName: "@nobody",
  soldAt: "2023-11-14T22:13:20.000Z",
  guild: "temper-guild/na-megaserver-scratch-throwaway-traders",
} as const satisfies TemperSale
