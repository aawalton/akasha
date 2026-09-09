import "@akasha/temper-eso-types/eso-enums-07"
import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-globals"

function issuePost(
  this: void,
  bag: number,
  slot: number,
  quantity: number,
  totalPrice: number
): undefined {
  RequestPostItemOnTradingHouse(bag, slot, quantity, totalPrice)
}

export function postGuildStoreItem(
  this: void,
  bag: number,
  slot: number,
  quantity: number,
  totalPrice: number
): undefined {
  issuePost(bag, slot, quantity, totalPrice)
}

interface PendingPost {
  readonly bag: number
  readonly slot: number
  readonly quantity: number
  readonly totalPrice: number
  readonly onResult: (this: void, ok: boolean) => void
  posted: boolean
}

export interface SellFlow {
  postItem: (
    this: void,
    bag: number,
    slot: number,
    quantity: number,
    totalPrice: number,
    onResult: (this: void, ok: boolean) => void
  ) => undefined
  dispose: (this: void) => undefined
}

export function createSellFlow(this: void, addonName: string): SellFlow {
  const ns = `${addonName}_SellFlow`
  let pending: PendingPost | undefined

  function settle(this: void, ok: boolean): undefined {
    const post = pending
    pending = undefined
    if (post !== undefined) post.onResult(ok)
  }

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Pending`,
    EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE,
    function (this: void, _eventCode: number, slotId: number, isPending: boolean): undefined {
      const post = pending
      if (post === undefined) return
      if (post.posted) return
      if (!isPending) return
      if (slotId !== post.slot) return
      post.posted = true
      issuePost(post.bag, post.slot, post.quantity, post.totalPrice)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Response`,
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    function (this: void, _eventCode: number, responseType: number, result: number): undefined {
      if (pending === undefined) return
      if (responseType !== TRADING_HOUSE_RESULT_POST_PENDING) return
      settle(result === TRADING_HOUSE_RESULT_SUCCESS)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Error`,
    EVENT_TRADING_HOUSE_ERROR,
    function (this: void): undefined {
      if (pending === undefined) return
      settle(false)
    }
  )

  return {
    postItem(bag, slot, quantity, totalPrice, onResult): undefined {
      if (pending !== undefined) {
        d(`[${addonName}] sell-flow: a post is already in flight; ignoring.`)
        onResult(false)
        return
      }
      if (bag !== BAG_BACKPACK) {
        d(`[${addonName}] sell-flow: item not in backpack (bag=${bag}); post skipped.`)
        onResult(false)
        return
      }
      pending = { bag, slot, quantity, totalPrice, onResult, posted: false }
      SetPendingItemPost(bag, slot, quantity)
    },
    dispose(): undefined {
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Pending`, EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE)
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Response`, EVENT_TRADING_HOUSE_RESPONSE_RECEIVED)
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Error`, EVENT_TRADING_HOUSE_ERROR)
      pending = undefined
    },
  }
}
