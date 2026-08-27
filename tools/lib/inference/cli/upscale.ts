import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "@shared/errors-core/exit"
import { akashaRoot } from "../../../../repo/roots/roots"

function upscaleBinPath(scriptName: string): string {
  return join(akashaRoot(), "infra", "upscale", "bin", scriptName)
}

async function runUpscaleBin(scriptName: string, args: readonly string[]): Promise<void> {
  const path = upscaleBinPath(scriptName)
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn(["bash", path, ...args], { stdout: "inherit", stderr: "inherit" })
  } catch (err) {
    throw new OperationalError(`failed to spawn ${scriptName}: ${String(err)}`)
  }
  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new OperationalError(`${scriptName} exited with code ${exitCode}`)
  }
}

export async function runWorkstationUpscale(params: {
  readonly inputBytes: Uint8Array
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
  readonly upscaleHome: string
}): Promise<Uint8Array> {
  const inputsDir = join(params.upscaleHome, "inputs")
  const outputsDir = join(params.upscaleHome, "outputs")

  await runUpscaleBin("upscale-up.sh", [])

  await mkdir(inputsDir, { recursive: true })
  await writeFile(join(inputsDir, params.inName), params.inputBytes)
  await runUpscaleBin(
    "upscale-seedvr2.sh",
    buildUpscaleScriptArgs({
      inName: params.inName,
      outName: params.outName,
      resolution: params.resolution,
      seed: params.seed,
    })
  )

  const producedPath = join(outputsDir, params.outName)
  try {
    return await readFile(producedPath)
  } catch (err) {
    throw new OperationalError(
      `SeedVR2 reported success but ${producedPath} is unreadable: ${String(err)}`
    )
  }
}

export function buildUpscaleScriptArgs(input: {
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
}): readonly string[] {
  return [input.inName, input.outName, String(input.resolution), String(input.seed)]
}
