import type { Engine } from "../../types.ts"
import { registerDbFunctionTypes } from "./function/register.ts"
import { registerDbTableTypes } from "./table/register.ts"
import { registerDbTriggerTypes } from "./trigger/register.ts"

export const registerDbNodeTypes = (engine: Engine): undefined => {
  registerDbFunctionTypes(engine)
  registerDbTableTypes(engine)
  registerDbTriggerTypes(engine)
}
