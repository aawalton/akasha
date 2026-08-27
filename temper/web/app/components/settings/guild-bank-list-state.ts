export type GuildBankListState =
  | "loading"
  | "load-failed"
  | "data-unreadable"
  | "no-inventory-data"
  | "no-guild-banks"
  | "ready"

export function resolveGuildBankListState(args: {
  isLoading: boolean
  isError: boolean
  hasSnapshot: boolean
  hasInventory: boolean
  guildBankCount: number
}): GuildBankListState {
  if (args.isLoading) return "loading"
  if (args.isError) return "load-failed"
  if (!args.hasInventory) {
    return args.hasSnapshot ? "data-unreadable" : "no-inventory-data"
  }
  if (args.guildBankCount === 0) return "no-guild-banks"
  return "ready"
}
