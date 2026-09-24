import type { Floor } from "akasha/temper/player/progress/temper-completion-override/properties/floor.number-property.types.ts"
import type { OverrideReason } from "akasha/temper/player/progress/temper-completion-override/properties/override-reason.text-property.types.ts"
import type { Character } from "akasha/temper/player/progress/thing/properties/character.relation-property.types.ts"
import type { CompletionCard } from "akasha/temper/player/progress/thing/properties/completion-card.relation-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/player/progress/thing/properties/completion-item-path.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type TemperCompletionOverride = TemperProgressThing & {
  accountPage: AccountPage
  character: Character
  completionCard: CompletionCard
  completionItemPath: CompletionItemPath
  floor: Floor
  overrideReason: OverrideReason
}
