import * as installShellModule from "@akasha/mobile-cli/install-sim-shell"
import * as pushTapScriptModule from "@akasha/mobile-cli/push-tap-script"
import * as simWwwStageModule from "@akasha/mobile-cli/sim-www-stage"
import { optionalEnv } from "@akasha/utils-narrow/require-env"
import { z } from "zod"


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
