import * as copFetchModule from "./inference/cli/cop-fetch.ts"
import * as geminiImageModule from "./inference/cli/gemini-image-client.ts"
import * as mlxImageModule from "./inference/cli/mlx-image-client.ts"
import * as mlxVlmModule from "./inference/cli/mlx-vlm-client.ts"
import * as seedModule from "./inference/cli/seed.ts"
import * as segmentModule from "./inference/cli/segment-client.ts"


export async function mlxImageClient(): Promise<typeof mlxImageModule> {
  return mlxImageModule
}

export async function mlxVlmClient(): Promise<typeof mlxVlmModule> {
  return mlxVlmModule
}

export async function segmentClient(): Promise<typeof segmentModule> {
  return segmentModule
}

export async function copFetch(): Promise<typeof copFetchModule> {
  return copFetchModule
}

export async function inferenceSeed(): Promise<typeof seedModule> {
  return seedModule
}

export async function geminiImageClient(): Promise<typeof geminiImageModule> {
  return geminiImageModule
}
