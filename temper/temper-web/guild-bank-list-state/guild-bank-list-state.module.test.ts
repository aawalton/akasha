import { describe, expect, it } from "bun:test"
import { resolveGuildBankListState } from "./guild-bank-list-state.module.code.ts"

const SETTLED_WITH_GUILD_BANKS = {
  isLoading: false,
  isError: false,
  hasSnapshot: true,
  hasInventory: true,
  guildBankCount: 2,
}

describe("resolveGuildBankListState", () => {
  it("reports loading while the read is in flight, whatever the counts look like", () => {
    expect(
      resolveGuildBankListState({
        isLoading: true,
        isError: false,
        hasSnapshot: false,
        hasInventory: false,
        guildBankCount: 0,
      })
    ).toBe("loading")
  })

  it("never reports an empty guild-bank list while loading", () => {
    for (const hasInventory of [true, false]) {
      expect(
        resolveGuildBankListState({
          isLoading: true,
          isError: false,
          hasSnapshot: false,
          hasInventory,
          guildBankCount: 0,
        })
      ).not.toBe("no-guild-banks")
    }
  })

  it("reports a failed read as a failure rather than as an absence", () => {
    expect(
      resolveGuildBankListState({
        isLoading: false,
        isError: true,
        hasSnapshot: false,
        hasInventory: false,
        guildBankCount: 0,
      })
    ).toBe("load-failed")
  })

  it("separates no-inventory-at-all from inventory-with-no-guild-banks", () => {
    expect(
      resolveGuildBankListState({
        isLoading: false,
        isError: false,
        hasSnapshot: false,
        hasInventory: false,
        guildBankCount: 0,
      })
    ).toBe("no-inventory-data")

    expect(
      resolveGuildBankListState({
        isLoading: false,
        isError: false,
        hasSnapshot: true,
        hasInventory: true,
        guildBankCount: 0,
      })
    ).toBe("no-guild-banks")
  })

  it("never claims nothing was received when a snapshot exists but would not reassemble", () => {
    expect(
      resolveGuildBankListState({
        isLoading: false,
        isError: false,
        hasSnapshot: true,
        hasInventory: false,
        guildBankCount: 0,
      })
    ).toBe("data-unreadable")
  })

  it("reports ready once guild banks are present", () => {
    expect(resolveGuildBankListState(SETTLED_WITH_GUILD_BANKS)).toBe("ready")
  })
})
