export const summary =
  "Upscale an image with SeedVR2 v2.5 on the workstation GPU; writes an inference-run row"

import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { runClusterUpscale } from "@akasha/upscale/upscale-cluster"
import { runWorkstationUpscale } from "@akasha/upscale/upscale-workstation"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SERVICE = "seedvr2-upscale"
const OPERATION = "upscale"
const MODEL = "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16"
const DEFAULT_SEED = 12345

interface UpscaleHost {
  readonly host: "cluster" | "workstation"
  readonly label: string
}

async function resolveUpscaleHost(value: string | undefined): Promise<UpscaleHost> {
  switch (value) {
    case undefined:
    case "cluster":
      return { host: "cluster", label: "cluster-3080ti" }
    case "workstation":
      return { host: "workstation", label: "workstation" }
    default:
      throw inputError(`--host must be 'cluster' or 'workstation', got '${value}'`)
  }
}

function resolveUpscaleHome(envValue: string | undefined): string {
  const raw = envValue ?? join(homedir(), ".local", "share", "upscale")
  if (raw === "~") return homedir()
  if (raw.startsWith("~/")) return join(homedir(), raw.slice(2))
  return raw
}

export const help: CommandHelp = {
  positionals: [
    {
      name: "image",
      required: false,
      aliasOfFlag: "--image",
      description: "source image to upscale",
    },
  ],
  flags: [
    {
      name: "--image",
      argLabel: "path",
      valueShape: "token",
      required: true,
      description: "source image to upscale",
      aliases: ["--in"],
    },
    {
      name: "--host",
      argLabel: "cluster|workstation",
      valueShape: "token",
      description:
        "where to run (default: cluster — RTX 3080 Ti on node-06; 'workstation' opts into the local RTX 5080)",
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      description:
        "where to write the upscaled PNG (default: ~/Pictures/Generated/upscale-<ts>.png)",
      aliases: ["--out"],
    },
    {
      name: "--resolution",
      argLabel: "px",
      valueShape: "token",
      required: true,
      description:
        "target shortest edge in px (SeedVR2 short-side; for a scale factor, compute px = factor × the source's short side first)",
      aliases: ["-r"],
    },
    {
      name: "--seed",
      argLabel: "n",
      valueShape: "token",
      description: "seed (default 12345 — the recipe's own seed)",
    },
    {
      name: "--no-persist",
      description: "skip the durable image page + object-store copy (scratch only)",
    },
  ],
  envVars: [
    {
      name: "UPSCALE_HOME",
      description: "host data dir for the upscale container",
      default: "~/.local/share/upscale",
      path: true,
    },
  ],
  exits: [
    { code: 0, meaning: "upscaled image written and run recorded" },
    {
      code: 1,
      meaning: "input error — bad flag, unknown --host, unreadable image, non-positive resolution",
    },
    {
      code: 3,
      meaning:
        "operational error — cluster Job failed/timed out or missing SeaweedFS creds (cluster); container/GPU unavailable, weights missing, or SeedVR2 OOM (workstation)",
    },
  ],
  examples: [
    "ops inference upscale --image x.png --resolution 1460",
    "ops inference upscale --in x.png -r 1440 --out x-up.png",
    "ops inference upscale --image x.png -r 1460 --host workstation",
  ],
}

export default async function inferenceUpscale(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const imagePath = parsed.requireString("--image")
  const nowMs = Date.now()
  const outputPath = resolveOutputPath("upscale", parsed.string("--output"), nowMs)
  const resolution = parsed.requireNonNegativeInt("--resolution")
  if (resolution <= 0) {
    throw inputError(`--resolution must be a positive integer (px), got '${resolution}'`)
  }
  const seed = parsed.nonNegativeInt("--seed") ?? DEFAULT_SEED
  const noPersist = parsed.boolean("--no-persist")
  const target = await resolveUpscaleHost(parsed.string("--host"))

  let inputBytes: Uint8Array
  try {
    inputBytes = await readFile(imagePath)
  } catch (err) {
    throw inputError(`cannot read --image '${imagePath}': ${String(err)}`)
  }

  const stamp = `${process.pid}-${nowMs}`
  const inName = `upscale-in-${stamp}.png`
  const outName = `upscale-out-${stamp}.png`

  const record = buildInferenceRunRecord({
    service: SERVICE,
    operation: OPERATION,
    model: MODEL,
    host: target.label,
    commandLine: formatCommandLine("upscale", args),
    startedAt: new Date(nowMs).toISOString(),
    resolution: String(resolution),
    seed,
    inputImagePath: imagePath,
    inputImageSha256: sha256Hex(inputBytes),
  })

  await recordInferenceRun(
    record,
    async () => {
      const outputBytes =
        target.host === "cluster"
          ? await runClusterUpscale({
              inputBytes,
              inName,
              outName,
              resolution,
              seed,
              jobName: `upscale-serving-${stamp}`,
            })
          : await runWorkstationUpscale({
              inputBytes,
              inName,
              outName,
              resolution,
              seed,
              upscaleHome: resolveUpscaleHome(parsed.env("UPSCALE_HOME")),
            })
      await ensureOutputDir(outputPath)
      await writeFile(outputPath, outputBytes)
      process.stdout.write(`wrote ${outputBytes.byteLength} bytes to ${outputPath}\n`)
      return { outputPath, outputBytes }
    },
    { persist: !noPersist }
  )
}
