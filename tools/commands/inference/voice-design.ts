export const summary =
  "Design a novel voice from a description (VoxCPM2 default, --service qwen3-tts); writes an inference-run row"

import { writeFile } from "node:fs/promises"
import { buildCopFetchInit } from "@akasha/inference-clients/cop-fetch"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { getHost } from "@akasha/inference-pool/inference-hosts"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import type { InferenceService as InferenceServiceName } from "@akasha/inference-runs/inference-run-services"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

interface VoiceDesignBackend {
  readonly service: InferenceServiceName
  readonly model: string
  readonly sendsLangCode: boolean
}

const BACKEND_NAMES = ["voxcpm2", "qwen3-tts"] as const
type BackendName = (typeof BACKEND_NAMES)[number]

const BACKENDS: Record<BackendName, VoiceDesignBackend> = {
  voxcpm2: {
    service: "voxcpm2",
    model: "mlx-community/VoxCPM2-bf16",
    sendsLangCode: false,
  },
  "qwen3-tts": {
    service: "qwen3-tts",
    model: "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16",
    sendsLangCode: true,
  },
}

const DEFAULT_BACKEND: BackendName = "voxcpm2"
const DEFAULT_LANG = "English"

function isBackendName(s: string): s is BackendName {
  return Object.hasOwn(BACKENDS, s)
}

const REQUEST_TIMEOUT_MS = 1_800_000

const SERVER_SAMPLING = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  repetitionPenalty: 1.0,
  maxTokens: 1200,
} as const

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--instruct",
      argLabel: "description",
      valueShape: "prose",
      required: true,
      description:
        "natural-language voice description (mandatory for both models — they raise without one)",
    },
    {
      name: "--text",
      argLabel: "transcript",
      valueShape: "prose",
      required: true,
      description:
        "text to speak — becomes the clip's transcript (keep to a few sentences; long text is not chunked)",
    },
    {
      name: "--service",
      argLabel: "name",
      valueShape: "token",
      default: DEFAULT_BACKEND,
      description: `voice-design backend: ${BACKEND_NAMES.join(" | ")} (default ${DEFAULT_BACKEND})`,
    },
    {
      name: "--lang",
      argLabel: "name",
      valueShape: "token",
      default: DEFAULT_LANG,
      description:
        "language name sent as lang_code — qwen3-tts only (the server default is a Kokoro-ism); ignored for voxcpm2, which takes accent/language in the instruct",
    },
    {
      name: "--output",
      argLabel: "path.wav",
      valueShape: "token",
      description: "where to write the WAV (default: ~/Pictures/Generated/voice-design-<ts>.wav)",
      aliases: ["--out"],
    },
    {
      name: "--no-persist",
      description: "skip the durable audio page + object-store copy (scratch only)",
    },
  ],
  examples: [
    "ops inference voice-design --instruct-file ./voice-description.txt --text-file ./transcript.txt",
    "ops inference voice-design --service qwen3-tts --instruct-file ./voice-description.txt --text-file ./transcript.txt --output ~/voices/cheerful.wav",
  ],
}

async function assertWavBytes(bytes: Uint8Array): Promise<void> {
  const riff =
    bytes.length > 44 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46
  if (!riff) {
    throw operationalError("voice-design response is not a RIFF/WAV payload")
  }
}

export default async function voiceDesignCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const instruct = parsed.requireString("--instruct")
  const text = parsed.requireString("--text")
  const serviceName = parsed.requireString("--service")
  if (!isBackendName(serviceName)) {
    throw operationalError(
      `unknown --service '${serviceName}'; choose one of: ${BACKEND_NAMES.join(", ")}`
    )
  }
  const backend = BACKENDS[serviceName]
  const lang = parsed.requireString("--lang")
  const outputPath = resolveOutputPath("voice-design", parsed.string("--output"), Date.now())
  const noPersist = parsed.boolean("--no-persist")

  const service = SERVICES.find((s) => s.name === backend.service)
  if (service === undefined) {
    throw operationalError(`no ${backend.service} service is declared in the registry`)
  }
  const host = getHost(service.host)
  const baseUrl = `http://${host.address}:${service.port}`

  const record = buildInferenceRunRecord({
    service: backend.service,
    operation: "voice-design",
    model: backend.model,
    host: service.host,
    commandLine: formatCommandLine("voice-design", args),
    startedAt: new Date().toISOString(),
    instruct,
    text,
    ...(backend.sendsLangCode ? { lang } : {}),
    ...SERVER_SAMPLING,
  })

  await recordInferenceRun(
    record,
    async () => {
      const init = buildCopFetchInit({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: backend.model,
          input: text,
          instruct,
          ...(backend.sendsLangCode ? { lang_code: lang } : {}),
          response_format: "wav",
        }),
        timeoutMs: REQUEST_TIMEOUT_MS,
      })
      const r = await fetch(`${baseUrl}/v1/audio/speech`, init)
      if (!r.ok) {
        throw operationalError(`voice-design failed: ${r.status} ${await r.text()}`)
      }
      const wav = new Uint8Array(await r.arrayBuffer())
      await assertWavBytes(wav)
      await ensureOutputDir(outputPath)
      await writeFile(outputPath, wav)
      process.stdout.write(`wrote ${wav.byteLength} bytes to ${outputPath}\n`)
      return { outputPath, outputBytes: wav }
    },
    { persist: !noPersist }
  )
}
