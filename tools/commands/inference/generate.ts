export const summary =
  "Generate an image from a text prompt (Z-Image-Turbo); writes an inference-run row"

import { writeFile } from "node:fs/promises"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { drawSeed, resolveSeed } from "@akasha/inference-clients/inference-seed"
import {
  buildGenerationBody,
  parseGenerationSize,
  runGeneration,
} from "@akasha/inference-clients/mlx-image-client"
import { getHost } from "@akasha/inference-pool/inference-hosts"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import { INFERENCE_SERVICES } from "@akasha/inference-runs/inference-run-services"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { z } from "zod"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const DEFAULT_SERVICE = "image-gen"
const FALLBACK_MODEL = "Tongyi-MAI/Z-Image-Turbo"

const DEFAULT_TIMEOUT_SEC = 600

const STEPS_MIN = 1
const STEPS_MAX = 50

const GEN_SIZE_MIN = 256
const GEN_SIZE_MAX = 4096
const GEN_SIZE_MULTIPLE = 16

function commandFlagValue(command: readonly string[], flag: string): string | undefined {
  const i = command.indexOf(flag)
  return i >= 0 ? command[i + 1] : undefined
}

async function parseGuidance(raw: string | undefined): Promise<number | undefined> {
  if (raw === undefined) return undefined
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) {
    throw inputError(`--guidance must be a non-negative number, got '${raw}'`)
  }
  return n
}

function isGenerationService(command: readonly string[]): boolean {
  const i = command.indexOf("--model-type")
  return i >= 0 && command[i + 1] === "image-generation"
}

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--prompt",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "text prompt",
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the PNG (default: ~/Pictures/Generated/generate-<ts>.png)",
      aliases: ["--out"],
    },
    {
      name: "--size",
      argLabel: "WxH",
      valueShape: "token",
      default: "1024x1024",
      description: `any WxH, each dim ${GEN_SIZE_MIN}-${GEN_SIZE_MAX} and a multiple of ${GEN_SIZE_MULTIPLE} (e.g. 1024x1024 square, 832x1216 portrait, 1216x832 landscape)`,
    },
    {
      name: "--seed",
      argLabel: "n",
      valueShape: "token",
      description:
        "sampler seed (recorded; honored best-effort by the server; a random seed is drawn and recorded when omitted)",
    },
    {
      name: "--guidance",
      argLabel: "n",
      valueShape: "token",
      description:
        "classifier-free guidance scale (recorded on the run row; the turbo distill ignores it)",
    },
    {
      name: "--steps",
      argLabel: "n",
      valueShape: "token",
      description: `denoising steps, ${STEPS_MIN}-${STEPS_MAX} (the turbo distill defaults to the server's 4)`,
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      description:
        "request budget (seconds; default 600). The macbook pool serializes requests FIFO, and this budget counts against the queue wait — raise it when firing many concurrent gens or queueing behind a slow edit",
    },
    {
      name: "--service",
      argLabel: "name",
      valueShape: "token",
      default: DEFAULT_SERVICE,
      description: "image-generation pool service to target",
    },
    {
      name: "--no-persist",
      description: "skip the durable image page + object-store copy (scratch only)",
    },
  ],
  examples: [
    "ops inference generate --prompt-file - <<'EOF'\na red maple leaf on white, studio macro\nEOF",
    "ops inference generate --size 512x512 --out ~/Pictures/forest.png --prompt-file - <<'EOF'\na misty forest at dawn\nEOF",
  ],
}

export default async function generateCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const prompt = parsed.requireString("--prompt")
  const outputPath = resolveOutputPath("generate", parsed.string("--output"), Date.now())
  const size = parsed.requireString("--size")
  const { width, height } = parseGenerationSize(size)
  const seed = resolveSeed(parsed.nonNegativeInt("--seed"), drawSeed)
  const noPersist = parsed.boolean("--no-persist")
  const rawService = parsed.requireString("--service")

  const services = INFERENCE_SERVICES
  const parsedService = z.enum(services).safeParse(rawService)
  if (!parsedService.success) {
    throw inputError(`--service must be one of ${services.join(", ")}, got '${rawService}'`)
  }
  const inferenceService = parsedService.data

  const service = SERVICES.find((s) => s.name === inferenceService)
  if (service === undefined) {
    throw operationalError(`no ${inferenceService} service is declared in the registry`)
  }
  if (!isGenerationService(service.command)) {
    throw inputError(
      `--service ${inferenceService} is not an image-generation service (does not bind --model-type image-generation)`
    )
  }
  const model = commandFlagValue(service.command, "--model-path") ?? FALLBACK_MODEL
  const steps = parsed.nonNegativeInt("--steps")
  if (steps !== undefined && (steps < STEPS_MIN || steps > STEPS_MAX)) {
    throw inputError(`--steps must be between ${STEPS_MIN} and ${STEPS_MAX}, got ${steps}`)
  }
  const guidance = await parseGuidance(parsed.string("--guidance"))
  const timeoutMs = (parsed.nonNegativeInt("--timeout") ?? DEFAULT_TIMEOUT_SEC) * 1000

  const macbookAddress = getHost(service.host).address
  const baseUrl = `http://${macbookAddress}:${service.port}`

  const record = buildInferenceRunRecord({
    service: inferenceService,
    operation: "generate",
    model,
    host: service.host,
    commandLine: formatCommandLine("generate", args),
    startedAt: new Date().toISOString(),
    prompt,
    size,
    width,
    height,
    seed,
    ...(steps !== undefined ? { steps } : {}),
    ...(guidance !== undefined ? { guidance } : {}),
  })

  await recordInferenceRun(
    record,
    async () => {
      const png = await runGeneration({
        baseUrl,
        body: buildGenerationBody({
          model,
          prompt,
          size,
          seed,
          ...(guidance !== undefined ? { guidance } : {}),
          ...(steps !== undefined ? { steps } : {}),
        }),
        timeoutMs,
      })
      await ensureOutputDir(outputPath)
      await writeFile(outputPath, png)
      process.stdout.write(`wrote ${png.byteLength} bytes to ${outputPath}\n`)
      return { outputPath, outputBytes: png }
    },
    { persist: !noPersist }
  )
}
