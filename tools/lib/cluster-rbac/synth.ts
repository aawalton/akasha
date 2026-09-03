import { relative, resolve } from "node:path"
import { discoverSynthFiles } from "@akasha/k8s-synth/synth-discovery"
import { z } from "zod"

export { discoverSynthFiles }

const SYNTH_OUTPUT_SCHEMA = z
  .array(
    z
      .object({
        name: z
          .string()
          .min(1)
          .regex(/^[a-z0-9][a-z0-9-]*$/),
        yaml: z.string().min(1),
      })
      .strict()
  )
  .readonly()

export type SynthOutput = z.infer<typeof SYNTH_OUTPUT_SCHEMA>[number]

export async function loadSynthOutputs(synthPath: string): Promise<readonly SynthOutput[]> {
  const mod: Record<string, unknown> = await import(synthPath)
  if (typeof mod.default !== "function") {
    throw new Error(`${synthPath}: default export is not a function`)
  }
  const raw: unknown = await (mod.default as () => unknown | Promise<unknown>)()
  return SYNTH_OUTPUT_SCHEMA.parse(raw)
}

export type LoadedSynths = ReadonlyMap<string, readonly SynthOutput[] | Error>

export async function loadEverySynth(codeRoot: string): Promise<LoadedSynths> {
  const loaded = new Map<string, readonly SynthOutput[] | Error>()
  for (const synthPath of discoverSynthFiles(codeRoot)) {
    try {
      loaded.set(synthPath, await loadSynthOutputs(synthPath))
    } catch (err) {
      loaded.set(synthPath, err instanceof Error ? err : new Error(String(err)))
    }
  }
  return loaded
}

export function generatedPathOf(codeRoot: string, synthDir: string, outputName: string): string {
  return relative(codeRoot, resolve(synthDir, "generated", `${outputName}.generated.yaml`))
}
