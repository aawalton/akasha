declare function ZO_CraftingUtils_IsCraftingWindowOpen(): boolean

declare function ZO_Store_IsShopping(): boolean

interface FcoFishingManager {
  StartInteraction(): void
}

declare const FISHING_MANAGER: FcoFishingManager | undefined

declare const INTERACTIVE_WHEEL_MANAGER: FcoFishingManager | undefined
