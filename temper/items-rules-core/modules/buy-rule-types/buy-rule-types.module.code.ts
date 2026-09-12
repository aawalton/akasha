export type BuySource = "merchant"

export interface BuyRule {
  id: string
  itemId: number
  itemName: string
  targetQuantity: number
  source: BuySource
  active?: boolean
  locked?: boolean
  goal?: string | null
  title?: string | null
  notes?: string | null
  updatedAt?: number
}
