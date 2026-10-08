import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const telVarStones = {
  id: "01a05fcf-26bb-7724-9b33-a0679e8edcd2",
  type: "page-type/temper-inventory-currency",
  slug: "tel-var-stones",
  title: "Tel Var Stones",
  key: "telvarStones",
  displayOrder: 2,
  esoCurrencyConstant: "CURT_TELVAR_STONES",
  bankable: true,
  createdAt: "2026-09-02T01:50:06.523Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
