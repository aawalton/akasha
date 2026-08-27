import * as buildScriptModule from "./inference/build-script.ts"
import * as reconcileModule from "./inference/reconcile.ts"


export async function inferenceReconcile(): Promise<typeof reconcileModule> {
  return reconcileModule
}

export async function inferenceBuildScript(): Promise<typeof buildScriptModule> {
  return buildScriptModule
}
