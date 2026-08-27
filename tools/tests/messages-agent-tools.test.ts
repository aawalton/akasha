import { describe, expect, test } from "bun:test"
import { deliverClaimedMessage } from "../lib/messages-agent-tools.ts"

interface InboundRow {
  id: string
  content: string
  sender_agent_id: string | null
  source: string | null
}

function makeRow(overrides?: Partial<InboundRow>): InboundRow {
  return {
    id: "msg-1",
    content: "hello",
    sender_agent_id: "sender-1",
    source: "user",
    ...overrides,
  }
}

describe("deliverClaimedMessage — transactional claim + deliver", () => {
  test("lost claim: does not notify and does not release", async () => {
    const calls: string[] = []
    await deliverClaimedMessage({
      row: makeRow(),
      claim: async () => {
        calls.push("claim")
        return false
      },
      notify: async () => {
        calls.push("notify")
      },
      release: async () => {
        calls.push("release")
      },
    })
    expect(calls).toEqual(["claim"])
  })

  test("won claim + render succeeds: notifies once, never releases", async () => {
    const calls: string[] = []
    const notified: unknown[] = []
    await deliverClaimedMessage({
      row: makeRow(),
      claim: async () => {
        calls.push("claim")
        return true
      },
      notify: async (msg) => {
        calls.push("notify")
        notified.push(msg)
      },
      release: async () => {
        calls.push("release")
      },
    })
    expect(calls).toEqual(["claim", "notify"])
    expect(notified).toEqual([
      { id: "msg-1", content: "hello", sender_agent_id: "sender-1", source: "user" },
    ])
  })

  test("won claim + render throws: releases the claim, logs loudly, never re-throws", async () => {
    const calls: string[] = []
    const releasedIds: string[] = []
    const logged: { message: string; err: unknown }[] = []
    const boom = new Error("transport torn down mid-delivery")

    await deliverClaimedMessage({
      row: makeRow({ id: "swallowed-candidate" }),
      claim: async () => {
        calls.push("claim")
        return true
      },
      notify: async () => {
        calls.push("notify")
        throw boom
      },
      release: async (id) => {
        calls.push("release")
        releasedIds.push(id)
      },
      logError: (message, err) => {
        logged.push({ message, err })
      },
    })

    expect(calls).toEqual(["claim", "notify", "release"])
    expect(releasedIds).toEqual(["swallowed-candidate"])
    expect(logged).toHaveLength(1)
    expect(logged[0]?.err).toBe(boom)
  })
})

describe("deliverClaimedMessage — the hand-off to the witness", () => {
  const effects = (over: Partial<Parameters<typeof deliverClaimedMessage>[0]>) => ({
    row: makeRow(),
    claim: async () => true,
    notify: async () => {},
    release: async () => {},
    ...over,
  })

  test("a rendered message is tracked, not marked", async () => {
    const tracked: string[] = []
    await deliverClaimedMessage(effects({ witness: (id) => tracked.push(id) }))
    expect(tracked).toEqual(["msg-1"])
  })

  test("tracking is LAST — the render has to have happened first", async () => {
    const calls: string[] = []
    await deliverClaimedMessage(
      effects({
        claim: async () => {
          calls.push("claim")
          return true
        },
        notify: async () => {
          calls.push("notify")
        },
        witness: () => calls.push("witness"),
      })
    )
    expect(calls).toEqual(["claim", "notify", "witness"])
  })

  test("a lost claim tracks nothing — the row belongs to the winner", async () => {
    const tracked: string[] = []
    await deliverClaimedMessage(
      effects({ claim: async () => false, witness: (id) => tracked.push(id) })
    )
    expect(tracked).toEqual([])
  })

  test("a render that threw tracks nothing — the row went back to pending", async () => {
    const tracked: string[] = []
    await deliverClaimedMessage(
      effects({
        notify: async () => {
          throw new Error("transport torn down mid-delivery")
        },
        witness: (id) => tracked.push(id),
        logError: () => {},
      })
    )
    expect(tracked).toEqual([])
  })
})
