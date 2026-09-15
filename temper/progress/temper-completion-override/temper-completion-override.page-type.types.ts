import type { Floor } from "akasha/temper/progress/temper-completion-override/properties/floor.number-property.types.ts"
import type { OverrideReason } from "akasha/temper/progress/temper-completion-override/properties/override-reason.text-property.types.ts"
import type { Character } from "akasha/temper/progress/thing/properties/character.text-property.types.ts"
import type { CompletionCardId } from "akasha/temper/progress/thing/properties/completion-card-id.text-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/progress/thing/properties/completion-item-path.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progress/thing/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"

export type TemperCompletionOverride = TemperProgressThing & {
  accountPage: AccountPage
  character: Character
  completionCardId: CompletionCardId
  completionItemPath: CompletionItemPath
  floor: Floor
  overrideReason: OverrideReason
}
