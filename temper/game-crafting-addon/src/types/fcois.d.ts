interface FcoisAddonVars {
  gPlayerActivated: boolean
}

interface Fcois {
  addonVars: FcoisAddonVars
  IsEnchantingLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsJewelryResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsMarked(this: void, ...args: unknown[]): boolean
  IsAlchemyDestroyLocked?: (this: void, bagId: number, slotIndex: number) => boolean
}

declare const FCOIS: Fcois | undefined
