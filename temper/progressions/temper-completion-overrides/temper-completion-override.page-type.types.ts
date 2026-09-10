import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { Character } from "../things/properties/character.text-property.ts"
import type { CompletionCardId } from "../things/properties/completion-card-id.text-property.ts"
import type { CompletionItemPath } from "../things/properties/completion-item-path.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { Floor } from "./properties/floor.number-property.ts"
import type { OverrideReason } from "./properties/override-reason.text-property.ts"

export type TemperCompletionOverride = TemperProgressThing & {
  accountPage: AccountPage
  character: Character
  completionCardId: CompletionCardId
  completionItemPath: CompletionItemPath
  floor: Floor
  overrideReason: OverrideReason
}
