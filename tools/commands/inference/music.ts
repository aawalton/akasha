export const summary = "Generate a song from a style prompt + optional lyrics (ACE-Step 1.5, MLX); writes an inference-run row"

import { setTimeout as sleep } from "node:timers/promises"
import type { CommandHelp } from "../../ops/surface.ts"
import { operationalError } from "../../lib/exit.ts"
import { inferenceSeed } from "../../lib/inference-clients.ts"
import { runMusic } from "../../lib/inference/cli/ace-step-client.ts"
import { inferenceHosts, inferenceServices } from "../../lib/inference-registry.ts"
import {
  formatCommandLine,
  inferenceOutputPath,
  inferenceRunRecord,
  inferenceRunStore,
} from "../../lib/inference-run.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const SERVICE_NAME = "music-gen"
const DIT_MODEL = "acestep-v15-turbo"
const LM_MODEL = "acestep-5Hz-lm-1.7B"
const POLL_INTERVAL_MS = 5_000

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--prompt",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "style / caption describing the music (genre, mood, instrumentation)",
    },
    {
      name: "--lyrics",
      argLabel: "text",
      valueShape: "prose",
      description: "optional lyrics to sing; omit for an instrumental track",
    },
    {
      name: "--duration",
      argLabel: "s",
      valueShape: "token",
      default: "30",
      description: "target clip length in seconds",
    },
    {
      name: "--steps",
      argLabel: "n",
      valueShape: "token",
      default: "8",
      description: "diffusion inference steps (8 = turbo default; raise for quality)",
    },
    {
      name: "--seed",
      argLabel: "n",
      valueShape: "token",
      description: "sampler seed (recorded; a random seed is drawn and recorded when omitted)",
    },
    {
      name: "--vocal-language",
      argLabel: "code",
      valueShape: "token",
      default: "en",
      description: "vocal language code sent as vocal_language",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "1800",
      description: "total budget to wait for the task to finish (seconds)",
    },
    {
      name: "--output",
      argLabel: "path.wav",
      valueShape: "token",
      description: "where to write the WAV (default: ~/Music/Generated/music-<ts>.wav)",
      aliases: ["--out"],
    },
    {
      name: "--no-persist",
      description: "skip the durable audio page + object-store copy (scratch only)",
    },
  ],
  examples: [
    "ops inference music --prompt-file ./prompt.txt",
    "ops inference music --prompt-file ./prompt.txt --lyrics-file ./lyrics.txt --duration 45",
    "ops inference music --prompt-file ./prompt.txt --duration 60 --steps 16 --out ~/Music/ambient.wav",
  ],
}

export default async function inferenceMusic(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const prompt = parsed.requireString("--prompt")
  const lyrics = parsed.string("--lyrics")
  const durationSeconds = parsed.requireNonNegativeInt("--duration")
  const inferenceSteps = parsed.requireNonNegativeInt("--steps")
  const seedModule = await inferenceSeed()
  const seed = seedModule.resolveSeed(parsed.nonNegativeInt("--seed"), seedModule.drawSeed)
  const vocalLanguage = parsed.requireString("--vocal-language")
  const totalTimeoutMs = parsed.requireNonNegativeInt("--timeout") * 1000
  const noPersist = parsed.boolean("--no-persist")
  const { resolveOutputPath } = await inferenceOutputPath()
  const outputPath = resolveOutputPath("music", parsed.string("--output"), Date.now())

  const services = await inferenceServices()
  const service = services.find((s) => s.name === SERVICE_NAME)
  if (service === undefined) {
    throw operationalError(`no ${SERVICE_NAME} service is declared in the registry`)
  }
  const { getHost } = await inferenceHosts()
  const host = getHost(service.host)
  const baseUrl = `http://${host.address}:${service.port}`

  const { buildInferenceRunRecord } = await inferenceRunRecord()
  const record = buildInferenceRunRecord({
    service: SERVICE_NAME,
    operation: "music",
    model: DIT_MODEL,
    host: service.host,
    commandLine: formatCommandLine("music", args),
    startedAt: new Date().toISOString(),
    prompt,
    seed,
    steps: inferenceSteps,
    duration: durationSeconds,
    vocalLanguage,
    ditModel: DIT_MODEL,
    lmModel: LM_MODEL,
    ...(lyrics !== undefined ? { lyrics } : {}),
  })

  const { recordInferenceRun } = await inferenceRunStore()
  await recordInferenceRun(
    record,
    async () =>
      runMusic({
        baseUrl,
        params: {
          prompt,
          durationSeconds,
          inferenceSteps,
          seed,
          vocalLanguage,
          audioFormat: "wav",
          ...(lyrics !== undefined ? { lyrics } : {}),
        },
        outputPath,
        submitTimeoutMs: 300_000,
        pollIntervalMs: POLL_INTERVAL_MS,
        totalTimeoutMs,
        sleep: (ms) => sleep(ms),
        now: () => Date.now(),
      }),
    { persist: !noPersist }
  )
}
