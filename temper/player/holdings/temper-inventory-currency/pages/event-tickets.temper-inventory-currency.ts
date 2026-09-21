import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const eventTickets = {
  id: "01a05fcf-26bb-7b3e-a71e-beefe8bbc4b3",
  type: "page-type/temper-inventory-currency",
  slug: "event-tickets",
  title: "Event Tickets",
  key: "eventTickets",
  displayOrder: 5,
} as const satisfies TemperInventoryCurrency
