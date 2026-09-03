export const summary =
  "Clone a voice from a reference clip (MOSS-TTS-8B zero-shot); writes an inference-run row"

import { access, writeFile } from "node:fs/promises"
import { buildCopFetchInit } from "@akasha/inference-clients/cop-fetch"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import {
  buildSpeechRequestBody,
  copPriorityHeaders,
} from "@akasha/inference-clients/voice-clone-client"
import { getHost } from "@akasha/inference-pool/inference-hosts"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { scpUpload } from "@akasha/inference-pool/inference-ssh"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SERVICE = "moss-tts"
const MODEL = "OpenMOSS-Team/MOSS-TTS-v1.5"
const DEFAULT_REF_AUDIO = "/Users/walton/inference/moss-tts/ref-audio.wav"
const DEFAULT_REF_TEXT = "The quick brown fox jumps over the lazy dog."

const COP_PRIORITIES = ["normal", "high"] as const
type CopPriority = (typeof COP_PRIORITIES)[number]

const CLONE_MODES = ["generation", "continuation"] as const
type CloneMode = (typeof CLONE_MODES)[number]

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--text",
      argLabel: "utterance",
      valueShape: "prose",
      required: true,
      description:
        "text to speak in the cloned voice (keep to a few sentences; long text is not chunked)",
    },
    {
      name: "--ref-audio",
      argLabel: "path.wav",
      valueShape: "token",
      description:
        "local reference WAV to clone (scp-uploaded to the macbook); default: the deploy-provisioned reference",
      aliases: ["--ref"],
    },
    {
      name: "--ref-text",
      argLabel: "transcript",
      valueShape: "prose",
      description: "transcript of --ref-audio (required when --ref-audio is supplied)",
    },
    {
      name: "--output",
      argLabel: "path.wav",
      valueShape: "token",
      description: "where to write the WAV (default: ~/Pictures/Generated/voice-clone-<ts>.wav)",
      aliases: ["--out"],
    },
    {
      name: "--priority",
      argLabel: "normal|high",
      valueShape: "token",
      default: "normal",
      description:
        "traffic-cop lane. 'high' drains this request ahead of queued batch work (image-gen / voice-design), non-preemptively, so a latency-sensitive clone is not starved behind a long run; 'normal' (default) is FIFO",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "1800",
      description:
        "request budget (seconds), default 1800 (the cop's `mlx-openai-server --queue-timeout` cap). Sized to absorb the ~10.5 GB moss-tts cold-load (~9m20s measured); the macbook pool serializes requests, so this budget also counts against the queue wait behind a slow in-flight inference",
    },
    {
      name: "--mode",
      argLabel: "generation|continuation",
      valueShape: "token",
      description:
        "MOSS-TTS generation mode. 'generation' (default when omitted) is zero-shot cloning (ref_audio = timbre target). 'continuation' seeds the model with ref_audio as a PREFIX (a previously rendered tail) and prepends ref_text to the input, continuing prosody across a chunk boundary — used by the long-form continuous render loop",
    },
    {
      name: "--no-persist",
      description: "skip the durable audio page + object-store copy (scratch only)",
    },
  ],
  examples: [
    "ops inference voice-clone --text-file ./text.txt",
    "ops inference voice-clone --ref-audio ~/voices/abby.wav --ref-text-file ./ref-text.txt --text-file ./text.txt --output ~/voices/abby-welcome.wav",
  ],
}

function isCopPriority(value: string): value is CopPriority {
  return (COP_PRIORITIES as readonly string[]).includes(value)
}

function isCloneMode(value: string): value is CloneMode {
  return (CLONE_MODES as readonly string[]).includes(value)
}

async function assertWavBytes(bytes: Uint8Array): Promise<void> {
  const riff =
    bytes.length > 44 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46
  if (!riff) {
    throw operationalError("voice-clone response is not a RIFF/WAV payload")
  }
}

export default async function inferenceVoiceClone(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const text = parsed.requireString("--text")
  const refAudioLocal = parsed.string("--ref-audio")
  const refTextArg = parsed.string("--ref-text")
  const outputPath = resolveOutputPath("voice-clone", parsed.string("--output"), Date.now())
  const timeoutMs = parsed.requireNonNegativeInt("--timeout") * 1000
  const rawPriority = parsed.requireString("--priority")
  if (!isCopPriority(rawPriority)) {
    throw inputError(`--priority must be one of ${COP_PRIORITIES.join(", ")}, got '${rawPriority}'`)
  }
  const priority: CopPriority = rawPriority
  const noPersist = parsed.boolean("--no-persist")

  const rawMode = parsed.string("--mode")
  let mode: CloneMode | undefined
  if (rawMode !== undefined) {
    if (!isCloneMode(rawMode)) {
      throw inputError(`--mode must be one of ${CLONE_MODES.join(", ")}, got '${rawMode}'`)
    }
    mode = rawMode
  }

  if (refAudioLocal !== undefined && refTextArg === undefined) {
    throw inputError("--ref-text is required when --ref-audio is supplied (the clip's transcript)")
  }
  if (refAudioLocal !== undefined) {
    try {
      await access(refAudioLocal)
    } catch {
      throw inputError(`cannot read --ref-audio '${refAudioLocal}'`)
    }
  }

  const service = SERVICES.find((s) => s.name === SERVICE)
  if (service === undefined) {
    throw operationalError(`no ${SERVICE} service is declared in the registry`)
  }
  const host = getHost(service.host)
  const baseUrl = `http://${host.address}:${service.port}`

  const target = { user: host.user, host: host.address, keyPath: host.keyPath }
  const stamp = `${process.pid}-${Date.now()}`
  const refAudioRemote =
    refAudioLocal !== undefined ? `/tmp/inference-voice-clone-ref-${stamp}.wav` : DEFAULT_REF_AUDIO
  const refText = refTextArg ?? DEFAULT_REF_TEXT

  const record = buildInferenceRunRecord({
    service: SERVICE,
    operation: "voice-clone",
    model: MODEL,
    host: service.host,
    commandLine: formatCommandLine("voice-clone", args),
    startedAt: new Date().toISOString(),
    text,
    refAudioPath: refAudioLocal ?? DEFAULT_REF_AUDIO,
    refText,
  })

  await recordInferenceRun(
    record,
    async () => {
      if (refAudioLocal !== undefined) {
        await scpUpload(target, refAudioLocal, refAudioRemote)
      }
      const init = buildCopFetchInit({
        method: "POST",
        headers: { "Content-Type": "application/json", ...copPriorityHeaders(priority) },
        body: JSON.stringify(
          buildSpeechRequestBody({ model: MODEL, text, refAudioRemote, refText, mode })
        ),
        timeoutMs,
      })
      const r = await fetch(`${baseUrl}/v1/audio/speech`, init)
      if (!r.ok) {
        throw operationalError(`voice-clone failed: ${r.status} ${await r.text()}`)
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
