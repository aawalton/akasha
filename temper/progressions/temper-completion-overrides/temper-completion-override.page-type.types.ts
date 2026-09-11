import type { Floor } from "akasha/temper/progressions/temper-completion-overrides/properties/floor.number-property.types.ts"
import type { OverrideReason } from "akasha/temper/progressions/temper-completion-overrides/properties/override-reason.text-property.types.ts"
import type { Character } from "akasha/temper/progressions/things/properties/character.text-property.types.ts"
import type { CompletionCardId } from "akasha/temper/progressions/things/properties/completion-card-id.text-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/progressions/things/properties/completion-item-path.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"

export type TemperCompletionOverride = TemperProgressThing & {
  accountPage: AccountPage
  character: Character
  completionCardId: CompletionCardId
  completionItemPath: CompletionItemPath
  floor: Floor
  overrideReason: OverrideReason
}
