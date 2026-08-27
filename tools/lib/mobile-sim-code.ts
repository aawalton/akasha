import { optionalEnv } from "@shared/utils-narrow/require-env"
import { z } from "zod"
import * as simWwwStageModule from "../../alanwalton/mobile-cli/src/lib/sim-www-stage.ts"
import * as installShellModule from "../../alanwalton/mobile-cli/src/mobile/sim/install-shell.ts"
import * as pushTapScriptModule from "../../alanwalton/mobile-cli/src/mobile/sim/push-tap-script.ts"


export type SimWwwStage = typeof simWwwStageModule
export type PushTapScript = typeof pushTapScriptModule
export type InstallSimShell = typeof installShellModule

export interface Validate {
  readonly optionalEnv: typeof optionalEnv
}

export interface Zod {
  readonly z: typeof z
}

export async function installSimShellModule(): Promise<InstallSimShell> {
  return installShellModule
}

export async function simWwwStage(): Promise<SimWwwStage> {
  return simWwwStageModule
}

export async function pushTapScript(): Promise<PushTapScript> {
  return pushTapScriptModule
}

export async function validate(): Promise<Validate> {
  return { optionalEnv }
}

export async function zod(): Promise<Zod> {
  return { z }
}
