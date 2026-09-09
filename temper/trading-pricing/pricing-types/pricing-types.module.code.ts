export interface TTCPriceEntry {
  A?: number
  X?: number
  N?: number
  S?: number
  EC?: number
  AC?: number
  SA?: number
  SE?: number
  SAC?: number
}

export interface PricingData {
  Data: Record<
    string,
    Record<string, Record<string, Record<string, TTCPriceEntry | Record<string, TTCPriceEntry>>>>
  >
  TimeStamp: number
}
