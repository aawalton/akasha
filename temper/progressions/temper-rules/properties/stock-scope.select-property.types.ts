import type { stockScope } from "./stock-scope.select-property.ts"

export type StockScope = (typeof stockScope.values)[number]
