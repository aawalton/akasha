export type RepackSlot = { slotId: number; stackSize: number; itemId: number; itemLink: string }
export type ItemGroup = { slots: RepackSlot[]; totalQuantity: number; maxStack: number }

export function scanGuildBankGroups(backpackItems: LuaSet<number>): {
  groups: ItemGroup[]
  skippedLinks: string[]
} {
  const groupMap = new LuaMap<number, ItemGroup>()

  let slotIndex: number | undefined = ZO_GetNextBagSlotIndex(BAG_GUILDBANK, undefined)
  while (slotIndex !== undefined) {
    const [stackSize, maxStack] = GetSlotStackSize(BAG_GUILDBANK, slotIndex)
    if (stackSize > 0 && stackSize < maxStack) {
      const itemLink = GetItemLink(BAG_GUILDBANK, slotIndex, LINK_STYLE_BRACKETS)
      const itemId = GetItemLinkItemId(itemLink)
      if (itemId > 0) {
        let group = groupMap.get(itemId)
        if (group === undefined) {
          group = { slots: [], totalQuantity: 0, maxStack }
          groupMap.set(itemId, group)
        }
        group.slots.push({ slotId: slotIndex, stackSize, itemId, itemLink })
        group.totalQuantity += stackSize
      }
    }
    slotIndex = ZO_GetNextBagSlotIndex(BAG_GUILDBANK, slotIndex)
  }

  const groups: ItemGroup[] = []
  const skippedLinks: string[] = []

  for (const [itemId, group] of groupMap) {
    if (group.slots.length < 2) continue
    const firstSlot = group.slots[0]
    if (firstSlot === undefined) continue
    if (backpackItems.has(itemId)) {
      skippedLinks.push(firstSlot.itemLink)
      continue
    }
    groups.push(group)
  }

  return { groups, skippedLinks }
}

export function scanBackpackItems(): LuaSet<number> {
  const backpackItems = new LuaSet<number>()
  let slotIndex: number | undefined = ZO_GetNextBagSlotIndex(BAG_BACKPACK, undefined)
  while (slotIndex !== undefined) {
    const [stackSize] = GetSlotStackSize(BAG_BACKPACK, slotIndex)
    if (stackSize > 0) {
      const itemLink = GetItemLink(BAG_BACKPACK, slotIndex, LINK_STYLE_BRACKETS)
      const itemId = GetItemLinkItemId(itemLink)
      if (itemId > 0) {
        backpackItems.add(itemId)
      }
    }
    slotIndex = ZO_GetNextBagSlotIndex(BAG_BACKPACK, slotIndex)
  }
  return backpackItems
}

export function findAllBackpackSlotsForItem(itemId: number): number[] {
  const slots: number[] = []
  let slotIdx: number | undefined = ZO_GetNextBagSlotIndex(BAG_BACKPACK, undefined)
  while (slotIdx !== undefined) {
    const [ss] = GetSlotStackSize(BAG_BACKPACK, slotIdx)
    if (ss > 0) {
      const link = GetItemLink(BAG_BACKPACK, slotIdx, LINK_STYLE_BRACKETS)
      if (GetItemLinkItemId(link) === itemId) {
        slots.push(slotIdx)
      }
    }
    slotIdx = ZO_GetNextBagSlotIndex(BAG_BACKPACK, slotIdx)
  }
  return slots
}
