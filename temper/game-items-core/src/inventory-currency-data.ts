import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { INVENTORY_CURRENCY_DATA } from "./generated/temper-inventory-currency.generated"

export interface CurrencyTemplate {
  id: string
  name: string
}

export const currencies = createDataFile<CurrencyTemplate>()(INVENTORY_CURRENCY_DATA)
