import { expect, test } from "bun:test"
import {
  computePricingTables,
  emptyPricingTables,
  NO_PRICE_EXTRACT,
} from "./watcher-pricing-tables.module.code.ts"

test("both tables come back empty", async () => {
  const said: string[] = []
  const tables = await computePricingTables((message) => {
    said.push(message)
    return undefined
  })
  expect(tables).toEqual(emptyPricingTables())
  expect(Object.keys(tables.currencyRates)).toEqual([])
  expect(Object.keys(tables.crownReplacementCosts)).toEqual([])
})

test("every run says the tables are empty", async () => {
  const said: string[] = []
  const say = (message: string): undefined => {
    said.push(message)
    return undefined
  }
  await computePricingTables(say)
  await computePricingTables(say)
  expect(said).toEqual([NO_PRICE_EXTRACT, NO_PRICE_EXTRACT])
})

test("what is said names both kinds of value left at nothing", () => {
  expect(NO_PRICE_EXTRACT).toContain("crown consumable")
  expect(NO_PRICE_EXTRACT).toContain("currency item")
})
