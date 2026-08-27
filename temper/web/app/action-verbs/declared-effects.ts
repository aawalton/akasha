import { DECLARED_EFFECTS_VERB_ID } from "@shared/pages-core/schema/action-button-config"
import { type ActionVerbContext, type ActionVerbHandler, registerActionVerb } from "@shared/pages-ui/action-verbs/action-verb-registry"

const declaredEffectsHandler: ActionVerbHandler = (_ctx: ActionVerbContext) => {}

registerActionVerb(DECLARED_EFFECTS_VERB_ID, declaredEffectsHandler)
