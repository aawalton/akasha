import {
  type ActionVerbContext,
  type ActionVerbHandler,
  registerActionVerb,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { DECLARED_EFFECTS_VERB_ID } from "akasha/pages/core/schema/action-button-config/action-button-config.module.code.ts"

const declaredEffectsHandler: ActionVerbHandler = (_ctx: ActionVerbContext) => {}

registerActionVerb(DECLARED_EFFECTS_VERB_ID, declaredEffectsHandler)
