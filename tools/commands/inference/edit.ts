export const summary =
  "Edit an image with an instruction (nano-banana / Google Gemini); writes an inference-run row"

import { readFile, writeFile } from "node:fs/promises"
import {
  type GeminiImageConfig,
  imageFormatForPath,
  runGeminiEdit,
  transcodeImage,
} from "@akasha/inference-clients/gemini-image-client"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { z } from "zod"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const EDIT_ENGINES = ["nano-banana"] as const

const NANO_BANANA_MODEL = "gemini-3-pro-image"

const EDIT_ASPECT_RATIOS = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
] as const

const EDIT_IMAGE_SIZES = ["1K", "2K", "4K"] as const

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--image",
      argLabel: "path",
      valueShape: "token",
      required: true,
      repeat: true,
      description:
        "the image to edit — pass ONE; it carries the identity to preserve. Repeatable (each later one becomes a reference), but one image renders best",
      aliases: ["--in"],
    },
    {
      name: "--refs",
      argLabel: "csv",
      valueShape: "token",
      description:
        "additional reference images as a comma-separated list, appended after the primary. Prefer omitting it: identity is already preserved from the primary image across multiple sequential edits, so chain single-image edits instead of re-referencing an anchor",
    },
    {
      name: "--prompt",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "edit instruction",
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the PNG (default: ~/Pictures/Generated/edit-<ts>.png)",
      aliases: ["--out"],
    },
    {
      name: "--engine",
      argLabel: "nano-banana",
      valueShape: "token",
      default: "nano-banana",
      description:
        "nano-banana (the sole engine: Google Gemini gemini-3-pro-image via GEMINI_API_KEY)",
    },
    {
      name: "--aspect-ratio",
      argLabel: "ratio",
      valueShape: "token",
      description:
        "fix the output aspect ratio (Gemini imageConfig): one of 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9. Omit to inherit the input image's dimensions.",
      aliases: ["--aspect"],
    },
    {
      name: "--size",
      argLabel: "1K|2K|4K",
      valueShape: "token",
      description:
        "fix the output size (Gemini imageConfig.imageSize): 1K, 2K, or 4K (uppercase K). Omit to inherit the input image's size.",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "1800",
      description: "request budget (seconds)",
    },
    {
      name: "--no-persist",
      description: "skip the durable image page + object-store copy (scratch only)",
    },
  ],
  examples: [
    "ops inference edit --image src.png --prompt-file ./prompt.txt",
    "ops inference edit --image anchor.png --prompt-file ./prompt.txt --out reward.png",
    "ops inference edit --image wp-001.png --prompt-file ./prompt.txt --out wp-002.png",
    "ops inference edit --image scene.png --aspect-ratio 16:9 --out wide.png --prompt-file ./prompt.txt",
  ],
}

interface EditInputPaths {
  readonly primaryImagePath: string
  readonly referenceImagePaths: readonly string[]
}

async function resolveEditImageConfig(
  aspectRatioRaw: string | undefined,
  imageSizeRaw: string | undefined
): Promise<GeminiImageConfig | undefined> {
  let aspectRatio: string | undefined
  if (aspectRatioRaw !== undefined) {
    if (!z.enum(EDIT_ASPECT_RATIOS).safeParse(aspectRatioRaw).success) {
      throw inputError(
        `--aspect-ratio must be one of ${EDIT_ASPECT_RATIOS.join(", ")}, got '${aspectRatioRaw}'`
      )
    }
    aspectRatio = aspectRatioRaw
  }
  let imageSize: string | undefined
  if (imageSizeRaw !== undefined) {
    if (!z.enum(EDIT_IMAGE_SIZES).safeParse(imageSizeRaw).success) {
      throw inputError(
        `--size must be one of ${EDIT_IMAGE_SIZES.join(", ")}, got '${imageSizeRaw}'`
      )
    }
    imageSize = imageSizeRaw
  }
  if (aspectRatio === undefined && imageSize === undefined) return undefined
  return {
    ...(aspectRatio !== undefined ? { aspectRatio } : {}),
    ...(imageSize !== undefined ? { imageSize } : {}),
  }
}

async function resolveEditInputPaths(
  images: readonly string[],
  refsCsv: string | undefined
): Promise<EditInputPaths> {
  const primaryImagePath = images[0]
  if (primaryImagePath === undefined) {
    throw inputError("--image: at least one source image is required")
  }
  const csvRefs = (refsCsv ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  return {
    primaryImagePath,
    referenceImagePaths: [...images.slice(1), ...csvRefs],
  }
}

async function runNanoBananaEdit(
  args: readonly string[],
  opts: {
    readonly imagePath: string
    readonly prompt: string
    readonly outputPath: string
    readonly timeoutSec: number
    readonly inputBytes: Uint8Array
    readonly referenceImagePaths: readonly string[]
    readonly referenceImageSha256s: readonly string[]
    readonly imageConfig: GeminiImageConfig | undefined
    readonly persist: boolean
  }
): Promise<void> {
  const apiKey = z.string().min(1).safeParse(process.env.GEMINI_API_KEY)
  if (!apiKey.success) {
    throw inputError("GEMINI_API_KEY is not set (add it to ~/.secrets.env)")
  }

  const hasRefs = opts.referenceImagePaths.length > 0
  const record = buildInferenceRunRecord({
    service: "image-edit-nano-banana",
    operation: "edit",
    model: NANO_BANANA_MODEL,
    host: "google",
    commandLine: formatCommandLine("edit", args),
    startedAt: new Date().toISOString(),
    prompt: opts.prompt,
    inputImagePath: opts.imagePath,
    inputImageSha256: sha256Hex(opts.inputBytes),
    ...(hasRefs
      ? {
          referenceImagePaths: opts.referenceImagePaths,
          referenceImageSha256s: opts.referenceImageSha256s,
        }
      : {}),
  })

  await recordInferenceRun(
    record,
    async () => {
      const raw = await runGeminiEdit({
        apiKey: apiKey.data,
        model: NANO_BANANA_MODEL,
        imagePath: opts.imagePath,
        prompt: opts.prompt,
        timeoutSec: opts.timeoutSec,
        ...(hasRefs ? { referenceImagePaths: opts.referenceImagePaths } : {}),
        ...(opts.imageConfig !== undefined ? { imageConfig: opts.imageConfig } : {}),
      })
      const png = await transcodeImage(raw, imageFormatForPath(opts.outputPath))
      await ensureOutputDir(opts.outputPath)
      await writeFile(opts.outputPath, png)
      process.stdout.write(`wrote ${png.byteLength} bytes to ${opts.outputPath}\n`)
      return { outputPath: opts.outputPath, outputBytes: png }
    },
    { persist: opts.persist }
  )
}

export default async function inferenceEdit(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { primaryImagePath, referenceImagePaths } = await resolveEditInputPaths(
    parsed.repeated("--image"),
    parsed.string("--refs")
  )
  const prompt = parsed.requireString("--prompt")
  const outputFlag = parsed.string("--output")
  const timeoutSec = parsed.requireNonNegativeInt("--timeout")
  const noPersist = parsed.boolean("--no-persist")
  const imageConfig = await resolveEditImageConfig(
    parsed.string("--aspect-ratio"),
    parsed.string("--size")
  )

  const rawEngine = parsed.requireString("--engine")
  if (!z.enum(EDIT_ENGINES).safeParse(rawEngine).success) {
    throw inputError(`--engine must be one of ${EDIT_ENGINES.join(", ")}, got '${rawEngine}'`)
  }

  const outputPath = resolveOutputPath("edit", outputFlag, Date.now())

  let inputBytes: Uint8Array
  try {
    inputBytes = await readFile(primaryImagePath)
  } catch (err) {
    throw inputError(`cannot read --image '${primaryImagePath}': ${String(err)}`)
  }

  const referenceImageSha256s: string[] = []
  for (const refPath of referenceImagePaths) {
    try {
      referenceImageSha256s.push(sha256Hex(await readFile(refPath)))
    } catch (err) {
      throw inputError(`cannot read reference image '${refPath}': ${String(err)}`)
    }
  }

  await runNanoBananaEdit(args, {
    imagePath: primaryImagePath,
    prompt,
    outputPath,
    timeoutSec,
    inputBytes,
    referenceImagePaths,
    referenceImageSha256s,
    imageConfig,
    persist: !noPersist,
  })
}
