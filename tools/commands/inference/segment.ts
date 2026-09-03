export const summary =
  "Matte an image's foreground from its background (BiRefNet/rembg) -> 8-bit alpha matte (+ optional cutout / flatten); writes an inference-run row"

import { readFile, writeFile } from "node:fs/promises"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import {
  buildSegmentFields,
  deriveSiblingPath,
  runSegment,
} from "@akasha/inference-clients/segment-client"
import { getHost } from "@akasha/inference-pool/inference-hosts"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import "../../lib/command-entry.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SERVICE_NAME = "segment-rembg"
const DEFAULT_MODEL = "birefnet-portrait"

export const help: CommandHelp = {
  positionals: [
    {
      name: "image",
      required: false,
      description: "source image to matte (positional alias for --image)",
      aliasOfFlag: "--image",
    },
  ],
  flags: [
    {
      name: "--image",
      argLabel: "path",
      valueShape: "token",
      required: true,
      description: "source image to matte",
      aliases: ["--in"],
    },
    {
      name: "--matte-out",
      argLabel: "path",
      valueShape: "token",
      description:
        "where to write the 8-bit alpha matte PNG (default: ~/Pictures/Generated/segment-<ts>.png)",
      aliases: ["--out", "--output"],
    },
    {
      name: "--model",
      argLabel: "name",
      valueShape: "token",
      default: DEFAULT_MODEL,
      description:
        "rembg BiRefNet session: birefnet-portrait (default, human subjects) or birefnet-general, …",
    },
    { name: "--cutout", description: "also emit an RGBA cutout (foreground on transparency)" },
    {
      name: "--cutout-out",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the cutout (default: <matte>-cutout.png); implies --cutout",
    },
    {
      name: "--flatten",
      argLabel: "color",
      valueShape: "token",
      description:
        "also emit a flatten-to-color (foreground on a solid background), e.g. '#000000' or '0,0,0'",
    },
    {
      name: "--flatten-out",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the flattened image (default: <matte>-flat.png)",
    },
    {
      name: "--alpha-matting",
      description: "apply rembg alpha-matting edge refinement (extra cost; off by default)",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "300",
      description: "request budget in seconds (counts the cop swap + cold model load)",
    },
  ],
  examples: [
    "ops inference segment ~/Personas/Erin/erin-anchor.png",
    "ops inference segment --image render.png --flatten '#000000' --flatten-out flat.png",
    "ops inference segment render.png --cutout --matte-out matte.png",
  ],
}

export default async function segmentCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const imagePath = parsed.requireString("--image")
  const mattePath = resolveOutputPath("segment", parsed.string("--matte-out"), Date.now())
  const model = parsed.requireString("--model")
  const alphaMatting = parsed.boolean("--alpha-matting")
  const flatten = parsed.string("--flatten")
  const cutoutOutExplicit = parsed.string("--cutout-out")
  const wantCutout = parsed.boolean("--cutout") || cutoutOutExplicit !== undefined
  const cutoutPath = cutoutOutExplicit ?? deriveSiblingPath(mattePath, "cutout")
  const flattenPath = parsed.string("--flatten-out") ?? deriveSiblingPath(mattePath, "flat")
  const timeoutMs = parsed.requireNonNegativeInt("--timeout") * 1000

  let inputBytes: Uint8Array
  try {
    inputBytes = await readFile(imagePath)
  } catch (err) {
    throw inputError(`cannot read --image '${imagePath}': ${String(err)}`)
  }

  const service = SERVICES.find((s) => s.name === SERVICE_NAME)
  if (service === undefined) {
    throw operationalError(`no ${SERVICE_NAME} service is declared in the registry`)
  }
  const baseUrl = `http://${getHost(service.host).address}:${service.port}`

  const record = buildInferenceRunRecord({
    service: SERVICE_NAME,
    operation: "segment",
    model,
    host: service.host,
    commandLine: formatCommandLine("segment", args),
    startedAt: new Date().toISOString(),
    inputImagePath: imagePath,
    inputImageSha256: sha256Hex(inputBytes),
    ...(flatten !== undefined ? { flattenColor: flatten } : {}),
  })

  await recordInferenceRun(record, async () => {
    const matte = await runSegment({
      baseUrl,
      imageBytes: inputBytes,
      fields: buildSegmentFields({ output: "matte", model, alphaMatting }),
      timeoutMs,
    })
    await ensureOutputDir(mattePath)
    await writeFile(mattePath, matte)
    process.stdout.write(`wrote ${matte.byteLength} bytes (alpha matte) to ${mattePath}\n`)

    if (wantCutout) {
      const cutout = await runSegment({
        baseUrl,
        imageBytes: inputBytes,
        fields: buildSegmentFields({ output: "cutout", model, alphaMatting }),
        timeoutMs,
      })
      await ensureOutputDir(cutoutPath)
      await writeFile(cutoutPath, cutout)
      process.stdout.write(`wrote ${cutout.byteLength} bytes (RGBA cutout) to ${cutoutPath}\n`)
    }

    if (flatten !== undefined) {
      const flat = await runSegment({
        baseUrl,
        imageBytes: inputBytes,
        fields: buildSegmentFields({
          output: "flatten",
          model,
          alphaMatting,
          bgColor: flatten,
        }),
        timeoutMs,
      })
      await ensureOutputDir(flattenPath)
      await writeFile(flattenPath, flat)
      process.stdout.write(
        `wrote ${flat.byteLength} bytes (flattened to ${flatten}) to ${flattenPath}\n`
      )
    }

    return { outputPath: mattePath, outputBytes: matte }
  })
}
