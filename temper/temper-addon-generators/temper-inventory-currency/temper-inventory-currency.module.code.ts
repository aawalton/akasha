import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const INVENTORY_CURRENCY_EAV_SCHEMA = z
  .object({
    currencyId: z.string(),
    displayOrder: z.number(),
  })
  .strict()

interface ParsedInventoryCurrency {
  currencyId: string
  title: string
  displayOrder: number
}

function parseInventoryCurrency(row: Page): ParsedInventoryCurrency {
  if (row.title === null) {
    throw new Error(`temper-inventory-currency row ${row.id} has null title`)
  }
  const eav = INVENTORY_CURRENCY_EAV_SCHEMA.parse({
    currencyId: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    currencyId: eav.currencyId,
    title: row.title,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperInventoryCurrency(currencyRows: readonly Page[]): string {
  const currencies = currencyRows.map(parseInventoryCurrency)

  const sorted = [...currencies].sort((a, b) => a.displayOrder - b.displayOrder)

  const recordLines = sorted.map(
    (c) =>
      `  ${c.currencyId}: { id: ${JSON.stringify(c.currencyId)} as const, name: ${JSON.stringify(c.title)} },`
  )

  return `\
/**
 * Temper Inventory Currencies (Generated)
 *
 * ESO inventory currencies sourced from the universal pages table
 * (page type: temper-inventory-currency).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CurrencyTemplate } from "../inventory-currency-data"

/**
 * Keyed-by-id view of the currency catalog. Preserved as a literal object
 * so the resulting Record type carries the same string-literal keys the
 * engine needs for its currency-id union, with no runtime conversion and
 * no \`as\` cast required.
 */
export const INVENTORY_CURRENCY_DATA = {
${recordLines.join("\n")}
} as const satisfies Record<string, CurrencyTemplate>
`
}
