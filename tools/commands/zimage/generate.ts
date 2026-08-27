export const summary = "Generate one Z-Image-Turbo image (optionally with a staged LoRA checkpoint); mflux-flag-compatible eval drop-in"

import { createHash, webcrypto } from "node:crypto"
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { zimageCode } from "../../lib/zimage-code.ts"

const DEFAULT_PORT = 8678

export const help: CommandHelp = {
  flags: [
    {
      name: "--prompt",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "positive prompt",
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      required: true,
      description: "exact path to write the PNG (the eval rig supplies this)",
      aliases: ["--out"],
    },
    {
      name: "--model",
      argLabel: "id",
      valueShape: "token",
      default: "z-image-turbo",
      description:
        "registered model to render with; an unregistered id is refused with the live list. --steps/--guidance default to the selected model's own profile",
    },
    {
      name: "--base-model",
      argLabel: "name",
      valueShape: "token",
      description:
        "mflux base-model selector, accepted for drop-in compatibility and otherwise ignored — select the served checkpoint with --model instead",
    },
    {
      name: "--negative-prompt",
      argLabel: "text",
      valueShape: "prose",
      description:
        "negative prompt (default empty; a real branch only when the model's cfg > 1 — turbo distills ignore it)",
      aliases: ["--negative"],
    },
    {
      name: "--width",
      argLabel: "n",
      valueShape: "token",
      default: "1024",
      description: "output width",
    },
    {
      name: "--height",
      argLabel: "n",
      valueShape: "token",
      default: "1024",
      description: "output height",
    },
    {
      name: "--steps",
      argLabel: "n",
      valueShape: "token",
      description:
        "denoise steps (defaults to the selected model's profile, e.g. turbo 8)",
    },
    {
      name: "--guidance",
      argLabel: "f",
      valueShape: "token",
      description:
        "CFG scale (mflux --guidance → KSampler cfg; defaults to the selected model's profile)",
    },
    {
      name: "--lora-paths",
      argLabel: "path",
      valueShape: "token",
      description:
        "a single LoRA checkpoint .safetensors to evaluate (absolute host path; staged into the loras/ volume). Multiple comma-separated paths are rejected — the eval rig passes one",
    },
    {
      name: "--lora-scales",
      argLabel: "f",
      valueShape: "token",
      default: "1.0",
      description: "LoRA strength (mflux --lora-scales → strength_model)",
    },
    {
      name: "--seed",
      argLabel: "n",
      valueShape: "token",
      description: "sampler seed (a random seed is drawn when omitted)",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "900",
      description: "poll budget (seconds); a cold container load plus a 1024² gen",
    },
  ],
  envVars: [
    { name: "ZIMAGE_PORT", description: "host loopback port for ComfyUI", default: "8678" },
    {
      name: "ZIMAGE_HOME",
      description: "host data dir",
      default: "~/.local/share/zimage",
      path: true,
    },
  ],
  exits: [
    { code: 0, meaning: "image written to --output" },
    { code: 1, meaning: "input error — bad flag, unreadable checkpoint, malformed number" },
    { code: 3, meaning: "operational error — ComfyUI unreachable, graph rejected, or timeout" },
  ],
  examples: [
    "ops zimage generate --prompt-file ./prompt.txt --output /tmp/base.png",
    "ops zimage generate --model z-image-turbo --prompt-file ./prompt.txt --seed 7 --output /tmp/turbo.png",
    "ops zimage generate --prompt-file ./prompt.txt --lora-paths ~/ckpts/my-lora/checkpoint-000500.safetensors --lora-scales 1.0 --seed 11 --output /tmp/eval.png",
  ],
}

function drawSeed(): number {
  const buf = new Uint32Array(1)
  webcrypto.getRandomValues(buf)
  return (buf[0] ?? 0) & (2 ** 31 - 1)
}

async function parseFloatFlag(raw: string, flag: string): Promise<number> {
  const n = Number(raw)
  if (!Number.isFinite(n)) throw inputError(`${flag} must be a number, got '${raw}'`)
  return n
}

async function stageLora(sourcePath: string, lorasDir: string): Promise<string> {
  let sourceStat: Awaited<ReturnType<typeof stat>>
  try {
    sourceStat = await stat(sourcePath)
  } catch (err) {
    throw inputError(`cannot read --lora-paths '${sourcePath}': ${String(err)}`)
  }
  const digest = createHash("sha256").update(sourcePath).digest("hex").slice(0, 8)
  const stagedName = `${digest}-${basename(sourcePath)}`
  const dest = join(lorasDir, stagedName)
  const existing = await stat(dest).catch(() => undefined)
  if (existing !== undefined && existing.size === sourceStat.size) return stagedName
  await mkdir(lorasDir, { recursive: true })
  const tmp = `${dest}.staging-${process.pid}`
  await copyFile(sourcePath, tmp)
  await rename(tmp, dest)
  return stagedName
}

export default async function zimageGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const code = await zimageCode()

  const prompt = parsed.requireString("--prompt")
  const outputPath = parsed.requireString("--output")
  const modelRaw = parsed.requireString("--model")
  const modelId = code.toModelId(modelRaw)
  if (modelId === undefined) {
    throw inputError(
      `--model '${modelRaw}' is not registered (one of: ${code.MODEL_IDS.join(", ")})`
    )
  }
  const spec = code.MODELS[modelId]
  const negativePrompt = parsed.string("--negative-prompt") ?? spec.defaultNegative
  const width = parsed.requireNonNegativeInt("--width")
  const height = parsed.requireNonNegativeInt("--height")
  const steps = parsed.nonNegativeInt("--steps") ?? spec.defaultSteps
  const guidanceRaw = parsed.string("--guidance")
  const guidance =
    guidanceRaw !== undefined
      ? await parseFloatFlag(guidanceRaw, "--guidance")
      : spec.defaultGuidance
  const loraStrength = await parseFloatFlag(
    parsed.requireString("--lora-scales"),
    "--lora-scales"
  )
  const seed = parsed.nonNegativeInt("--seed") ?? drawSeed()
  const pollDeadlineMs = parsed.requireNonNegativeInt("--timeout") * 1000

  const baseModel = parsed.string("--base-model")
  const loraPathsRaw = parsed.string("--lora-paths")

  const port = parsed.env("ZIMAGE_PORT") ?? String(DEFAULT_PORT)
  const baseUrl = `http://127.0.0.1:${port}`
  const zimageHome = parsed.env("ZIMAGE_HOME") ?? join(homedir(), ".local", "share", "zimage")
  const lorasDir = join(zimageHome, "models", "loras")

  const note = (msg: string): undefined => {
    process.stdout.write(`${msg}\n`)
    return undefined
  }

  if (baseModel !== undefined) {
    note(
      `note: --base-model '${baseModel}' accepted for compatibility and ignored; rendering with --model '${modelId}'`
    )
  }

  let loraName: string | undefined
  if (loraPathsRaw !== undefined && loraPathsRaw !== "") {
    if (loraPathsRaw.includes(",")) {
      throw inputError(
        `--lora-paths takes a single checkpoint for eval, got a comma-list: '${loraPathsRaw}'`
      )
    }
    loraName = await stageLora(loraPathsRaw, lorasDir)
    note(`staged LoRA checkpoint as loras/${loraName} (strength ${loraStrength})`)
  }

  const run = await code.runComfyGraph({
    baseUrl,
    buildGraph: () =>
      code.buildModelGraph(spec, {
        prompt,
        negativePrompt,
        width,
        height,
        steps,
        guidance,
        seed,
        ...(loraName !== undefined ? { loraName } : {}),
        loraStrength,
        filenamePrefix: "zimage",
      }),
    pollDeadlineMs,
    onProgress: note,
  })

  const png = await code.fetchImage(baseUrl, run.image)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, png)
  note(`wrote ${png.byteLength} bytes to ${outputPath}`)
}
