import { requireAt, requireFirst } from "@temper/shared-narrow"
import { ADDON_NAME } from "./constants"
import { showConfirmDialog } from "./rules-core-confirm-dialog"
import { formatItemList } from "./rules-core-report"
import {
  findAllBackpackSlotsForItem,
  type ItemGroup,
  type RepackSlot,
  scanBackpackItems,
  scanGuildBankGroups,
} from "./rules-dispatch-guild-repack-scan"
export let _repackRunning = false

export function repackGuildBank(): undefined {
  if (!IsGuildBankOpen()) {
    d("[TemperInventory] Guild bank must be open to repack")
    return
  }

  if (_repackRunning) {
    d("[TemperInventory] Repack already in progress")
    return
  }

  if (GetNumBagFreeSlots(BAG_BACKPACK) < 1) {
    d("[TemperInventory] Need at least 1 free backpack slot to repack")
    return
  }

  const guildId = GetSelectedGuildBankId()
  if (guildId === undefined) {
    d("[TemperInventory] Guild bank must be open to repack")
    return
  }

  if (!DoesPlayerHaveGuildPermission(guildId, GUILD_PERMISSION_BANK_WITHDRAW)) {
    d("[TemperInventory] You do not have permission to withdraw from this guild bank")
    return
  }
  if (!DoesPlayerHaveGuildPermission(guildId, GUILD_PERMISSION_BANK_DEPOSIT)) {
    d("[TemperInventory] You do not have permission to deposit to this guild bank")
    return
  }
  if (!DoesGuildHavePrivilege(guildId, GUILD_PRIVILEGE_BANK_DEPOSIT)) {
    d("[TemperInventory] This guild does not have bank deposit privileges")
    return
  }

  const backpackItems = scanBackpackItems()
  const { groups, skippedLinks } = scanGuildBankGroups(backpackItems)

  if (skippedLinks.length > 0) {
    d(
      `[${ADDON_NAME}] Skipped ${skippedLinks.length} ${skippedLinks.length !== 1 ? "items" : "item"} also in backpack: ${formatItemList(skippedLinks)}`
    )
  }

  let totalStacks = 0
  for (const group of groups) {
    totalStacks += group.slots.length
  }

  if (groups.length === 0) {
    if (skippedLinks.length === 0) {
      d(`[${ADDON_NAME}] Nothing to repack`)
    } else {
      d(`[${ADDON_NAME}] Clear those items from your backpack and try again`)
    }
    return
  }

  const confirmMsg = `Repack guild bank? This will consolidate ${totalStacks} partial stacks across ${groups.length} ${groups.length !== 1 ? "item types" : "item type"}.`

  showConfirmDialog(confirmMsg, function (this: void): undefined {
    executeRepack(groups, backpackItems)
  })
}

export const MAX_REPACK_PASSES = 2

export function moveItemSecure(
  sourceBag: number,
  sourceSlot: number,
  targetBag: number,
  targetSlot: number,
  stackCount: number
): undefined {
  if (IsProtectedFunction("RequestMoveItem")) {
    CallSecureProtected("RequestMoveItem", sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  } else {
    RequestMoveItem(sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  }
}

export function executeRepack(
  initialGroups: ItemGroup[],
  backpackItems: LuaSet<number>
): undefined {
  _repackRunning = true
  const ns = `${ADDON_NAME}_GuildRepack`
  let groups = initialGroups
  let groupIndex = 0
  let withdrawIndex = 0
  let totalOpsCompleted = 0
  let passNumber = 1
  let _inDepositPhase = false
  let _transferPendingRetries = 0
  const MAX_TRANSFER_PENDING_RETRIES = 3

  let totalStacks = 0
  for (const group of groups) {
    totalStacks += group.slots.length
  }

  d(
    `[${ADDON_NAME}] Repacking ${totalStacks} partial stacks in ${groups.length} groups (pass ${passNumber})...`
  )

  function cleanup(): undefined {
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_GUILD_BANK_ITEM_REMOVED)
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_GUILD_BANK_ITEM_ADDED)
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_GUILD_BANK_TRANSFER_ERROR)
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_CLOSE_GUILD_BANK)
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
    _repackRunning = false
  }

  function startNextPass(): undefined {
    if (!_repackRunning) return
    const scan = scanGuildBankGroups(backpackItems)
    if (scan.groups.length === 0) {
      cleanup()
      d(
        `[${ADDON_NAME}] Repack complete: ${totalOpsCompleted} transfers across ${passNumber} ${passNumber !== 1 ? "passes" : "pass"}`
      )
      return
    }
    passNumber++
    groups = scan.groups
    groupIndex = 0
    withdrawIndex = 0
    let remainingStacks = 0
    for (const group of groups) {
      remainingStacks += group.slots.length
    }
    d(
      `[${ADDON_NAME}] Pass ${passNumber}: ${remainingStacks} partial stacks in ${groups.length} groups remaining...`
    )
    zo_callLater(function (this: void): undefined {
      withdrawNextInGroup()
    }, 1500)
  }

  let _mergeTrackedSlots: LuaSet<number> = new LuaSet<number>()
  let _mergeTargetSlot = -1
  let _mergeSourceIndex = 0
  let _mergeSources: number[] = []

  function startCombinePhase(): undefined {
    if (!_repackRunning) return
    const group = requireAt(groups, groupIndex, "groups")
    const itemId = requireFirst(group.slots, "group.slots").itemId
    const backpackSlots = findAllBackpackSlotsForItem(itemId)

    if (backpackSlots.length <= 1) {
      zo_callLater(function (this: void): undefined {
        startDepositPhase()
      }, 500)
      return
    }

    _mergeSources = backpackSlots
    _mergeTargetSlot = requireFirst(backpackSlots, "backpackSlots")
    _mergeSourceIndex = 1

    _mergeTrackedSlots = new LuaSet<number>()
    for (const s of backpackSlots) {
      _mergeTrackedSlots.add(s)
    }

    issueNextMerge()
  }

  function issueNextMerge(): undefined {
    if (!_repackRunning) return
    while (_mergeSourceIndex < _mergeSources.length) {
      const srcSlot = requireAt(_mergeSources, _mergeSourceIndex, "_mergeSources")
      const [srcStack] = GetSlotStackSize(BAG_BACKPACK, srcSlot)
      if (srcStack > 0) break
      _mergeSourceIndex++
    }

    if (_mergeSourceIndex >= _mergeSources.length) {
      zo_callLater(function (this: void): undefined {
        startDepositPhase()
      }, 500)
      return
    }

    const group = requireAt(groups, groupIndex, "groups")
    const maxStack = group.maxStack

    const [targetStack] = GetSlotStackSize(BAG_BACKPACK, _mergeTargetSlot)

    if (targetStack >= maxStack) {
      let newTarget: number | undefined
      for (let i = _mergeSourceIndex; i < _mergeSources.length; i++) {
        const s = requireAt(_mergeSources, i, "_mergeSources")
        const [ss] = GetSlotStackSize(BAG_BACKPACK, s)
        if (ss > 0) {
          newTarget = s
          _mergeSourceIndex = i + 1
          break
        }
      }
      if (newTarget === undefined) {
        startDepositPhase()
        return
      }
      _mergeTargetSlot = newTarget
      issueNextMerge()
      return
    }

    const srcSlot = requireAt(_mergeSources, _mergeSourceIndex, "_mergeSources")
    const [srcStack] = GetSlotStackSize(BAG_BACKPACK, srcSlot)
    const room = maxStack - targetStack
    const toMove = math.min(srcStack, room)

    moveItemSecure(BAG_BACKPACK, srcSlot, BAG_BACKPACK, _mergeTargetSlot, toMove)
  }

  function onInventorySlotUpdate(
    _event: number,
    bagId: number,
    slotIndex: number,
    _isNewItem: boolean,
    _itemSoundCategory: number,
    _inventoryUpdateReason: number,
    _stackCountChange: number,
    _triggeredByCharacterName: string | undefined,
    _triggeredByDisplayName: string | undefined,
    isLastUpdateForMessage: boolean
  ): undefined {
    if (bagId !== BAG_BACKPACK) return
    if (!_mergeTrackedSlots.has(slotIndex)) return
    if (!isLastUpdateForMessage) return

    if (_mergeSourceIndex >= _mergeSources.length) return
    const srcSlot = requireAt(_mergeSources, _mergeSourceIndex, "_mergeSources")
    const [srcStack] = GetSlotStackSize(BAG_BACKPACK, srcSlot)
    if (srcStack === 0) {
      _mergeSourceIndex++
    }

    totalOpsCompleted++
    issueNextMerge()
  }

  function startDepositPhase(): undefined {
    if (!_repackRunning) return
    _inDepositPhase = true
    _transferPendingRetries = 0
    depositFromBackpack()
  }

  function depositFromBackpack(): undefined {
    if (!_repackRunning) return
    const group = requireAt(groups, groupIndex, "groups")
    const backpackSlot = findAllBackpackSlotsForItem(
      requireFirst(group.slots, "group.slots").itemId
    )[0]
    if (backpackSlot === undefined) {
      groupIndex++
      withdrawIndex = 0
      _inDepositPhase = false
      withdrawNextInGroup()
      return
    }
    TransferToGuildBank(BAG_BACKPACK, backpackSlot)
  }

  function withdrawNextInGroup(): undefined {
    if (!_repackRunning) return
    if (groupIndex >= groups.length) {
      if (passNumber < MAX_REPACK_PASSES) {
        startNextPass()
      } else {
        cleanup()
        d(
          `[${ADDON_NAME}] Repack complete after ${MAX_REPACK_PASSES} passes: ${totalOpsCompleted} transfers`
        )
      }
      return
    }

    const group = requireAt(groups, groupIndex, "groups")

    if (withdrawIndex >= group.slots.length) {
      startCombinePhase()
      return
    }

    const slot = requireAt(group.slots, withdrawIndex, "group.slots")
    withdrawIndex++

    const [currentStack] = GetSlotStackSize(BAG_GUILDBANK, slot.slotId)
    if (currentStack === 0) {
      withdrawNextInGroup()
      return
    }
    const currentLink = GetItemLink(BAG_GUILDBANK, slot.slotId, LINK_STYLE_BRACKETS)
    if (GetItemLinkItemId(currentLink) !== slot.itemId) {
      withdrawNextInGroup()
      return
    }

    _inDepositPhase = false
    _transferPendingRetries = 0
    TransferFromGuildBank(slot.slotId)
  }

  EVENT_MANAGER.RegisterForEvent(
    ns,
    EVENT_GUILD_BANK_ITEM_REMOVED,
    function (this: void, _event: number, _slotId: number, addedByLocalPlayer: boolean): undefined {
      if (!addedByLocalPlayer) return
      zo_callLater(function (this: void): undefined {
        if (!_repackRunning) return
        withdrawNextInGroup()
      }, 500)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ns,
    EVENT_GUILD_BANK_ITEM_ADDED,
    function (this: void, _event: number, _slotId: number, addedByLocalPlayer: boolean): undefined {
      if (!addedByLocalPlayer) return
      totalOpsCompleted++
      const group = requireAt(groups, groupIndex, "groups")
      const backpackSlot = findAllBackpackSlotsForItem(
        requireFirst(group.slots, "group.slots").itemId
      )[0]
      if (backpackSlot !== undefined) {
        zo_callLater(function (this: void): undefined {
          if (!_repackRunning) return
          depositFromBackpack()
        }, 500)
      } else {
        groupIndex++
        withdrawIndex = 0
        zo_callLater(function (this: void): undefined {
          if (!_repackRunning) return
          withdrawNextInGroup()
        }, 500)
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ns,
    EVENT_GUILD_BANK_TRANSFER_ERROR,
    function (this: void, _event: number, reason: number): undefined {
      if (reason === GUILD_BANK_TRANSFER_PENDING) {
        _transferPendingRetries++
        if (_transferPendingRetries <= MAX_TRANSFER_PENDING_RETRIES) {
          d(
            `[${ADDON_NAME}] Transfer pending (retry ${_transferPendingRetries}/${MAX_TRANSFER_PENDING_RETRIES})...`
          )
          zo_callLater(function (this: void): undefined {
            if (_inDepositPhase) {
              depositFromBackpack()
            } else {
              withdrawIndex--
              withdrawNextInGroup()
            }
          }, 1000)
          return
        }
        d(`[${ADDON_NAME}] Transfer pending retries exhausted — aborting`)
      }

      cleanup()
      d(
        `[${ADDON_NAME}] Repack stopped: transfer error (reason ${reason}) after ${totalOpsCompleted} operations`
      )

      const currentGroup = groups[groupIndex]
      if (currentGroup === undefined) return
      const firstSlot: RepackSlot | undefined = currentGroup.slots[0]
      if (firstSlot === undefined) return
      const orphanedItemId = firstSlot.itemId
      const orphanedSlots = findAllBackpackSlotsForItem(orphanedItemId)
      if (orphanedSlots.length === 0) return

      const itemLink = firstSlot.itemLink
      d(
        `[${ADDON_NAME}] Attempting to return ${orphanedSlots.length} orphaned stack(s) of ${itemLink} to guild bank...`
      )

      function depositNextOrphaned(this: void): undefined {
        const slotsNow = findAllBackpackSlotsForItem(orphanedItemId)
        const next = slotsNow[0]
        if (next === undefined) {
          d(`[${ADDON_NAME}] Orphan recovery complete`)
          return
        }
        TransferToGuildBank(BAG_BACKPACK, next)
        zo_callLater(depositNextOrphaned, 500)
      }
      zo_callLater(depositNextOrphaned, 500)
    }
  )

  EVENT_MANAGER.RegisterForEvent(ns, EVENT_CLOSE_GUILD_BANK, function (this: void): undefined {
    cleanup()
    d(`[${ADDON_NAME}] Repack interrupted: guild bank closed`)
  })

  EVENT_MANAGER.RegisterForEvent(ns, EVENT_INVENTORY_SINGLE_SLOT_UPDATE, onInventorySlotUpdate)

  withdrawNextInGroup()
}
