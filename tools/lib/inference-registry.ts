import * as hostsModule from "./inference/hosts.ts"
import { SERVICES } from "./inference/registry.ts"


export async function inferenceHosts(): Promise<typeof hostsModule> {
  return hostsModule
}

export async function inferenceServices(): Promise<typeof SERVICES> {
  return SERVICES
}
