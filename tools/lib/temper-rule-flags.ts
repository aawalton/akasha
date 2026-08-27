import * as gameCode from "./temper-inventory/game-code.ts"
import * as ruleFlagsShared from "./temper-inventory/rule-flags-shared.ts"

export const ITEM_ACTION_CHOICES = [
  "nothing",
  "lock",
  "unlock",
  "move-to",
  "stock",
  "character-equip",
  "companion-equip",
  "deconstruct",
  "refine",
  "destroy",
  "fence-launder",
  "fence-sell",
  "list",
  "mail",
  "research",
  "sell",
  "use",
  "open",
] as const

export const STOCK_SCOPE_CHOICES = ["current-character", "any-character"] as const

export const BUY_SOURCE_CHOICES: readonly string[] = ["merchant"]

export type Conditions = Readonly<Record<string, unknown>>

export type DestinationChain = readonly Readonly<Record<string, unknown>>[]

interface RuleFlags {
  readonly narrowItemAction: (value: string, flagName: string) => string
  readonly narrowStockScope: (value: string, flagName: string) => string
  readonly narrowMoveToDestination: (value: string, flagName: string) => string
  readonly parseBooleanFlag: (value: string | undefined, flagName: string) => boolean | undefined
  readonly parseConditionsJson: (raw: string | undefined) => Conditions | undefined
  readonly parseDestinationChainJson: (raw: string | undefined) => DestinationChain | undefined
}

export function ruleFlags(): Promise<RuleFlags> {
  return Promise.resolve(ruleFlagsShared as unknown as RuleFlags)
}

interface DestinationParse {
  readonly narrowDestination: (value: string) => string | undefined
}

export function destinationParse(): Promise<DestinationParse> {
  return Promise.resolve(gameCode as unknown as DestinationParse)
}
