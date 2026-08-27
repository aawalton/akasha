import { z } from "zod"
import { buildSpeechRequestBody } from "./cli/voice-clone"

export const MACBOOK_HOST = "100.64.0.2"

export const PORTS = {
  kokoro: 8083,
  csm: 8084,
  whisperStt: 8085,
  qwen3Tts: 8092,
  mossTts: 8093,
  higgsAudio: 8094,
  voxcpm2: 8095,
} as const

export const STT_MODEL = "mlx-community/whisper-tiny-asr-fp16"
export const KOKORO_MODEL = "mlx-community/Kokoro-82M-bf16"
export const CSM_MODEL = "mlx-community/csm-1b"
export const QWEN3_TTS_MODEL = "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16"
export const VOXCPM2_MODEL = "mlx-community/VoxCPM2-bf16"
export const MOSS_TTS_MODEL = "OpenMOSS-Team/MOSS-TTS-v1.5"
export const HIGGS_AUDIO_MODEL = "mlx-community/higgs-audio-v2-3B-mlx-q8"

export const CLONE_REF_TEXT = "The quick brown fox jumps over the lazy dog."
export const refAudioPath = (service: string) => `/Users/walton/inference/${service}/ref-audio.wav`
export const CSM_REF_AUDIO_PATH = refAudioPath("csm")
export const CSM_REF_TEXT = CLONE_REF_TEXT

const url = (port: number, path: string) => `http://${MACBOOK_HOST}:${port}${path}`

export async function fleetReachable(): Promise<boolean> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const socket = await Promise.race([
      Bun.connect({
        hostname: MACBOOK_HOST,
        port: PORTS.whisperStt,
        socket: { data() {} },
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("connect timeout")), 15000)
      }),
    ])
    socket.end()
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

const TRANSCRIPTION_SCHEMA = z.looseObject({ text: z.string() })

export async function transcribe(wav: Uint8Array<ArrayBuffer>): Promise<string> {
  const form = new FormData()
  form.append("file", new Blob([wav], { type: "audio/wav" }), "audio.wav")
  form.append("model", STT_MODEL)
  const res = await fetch(url(PORTS.whisperStt, "/v1/audio/transcriptions"), {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(120000),
  })
  if (!res.ok) throw new Error(`whisper-stt ${res.status}: ${await res.text()}`)
  return TRANSCRIPTION_SCHEMA.parse(await res.json()).text
}

export async function synthKokoro(
  input: string,
  voice = "af_heart"
): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(url(PORTS.kokoro, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: KOKORO_MODEL, input, voice, response_format: "wav" }),
    signal: AbortSignal.timeout(120000),
  })
  if (!res.ok) throw new Error(`kokoro ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

async function synthClone(
  port: number,
  model: string,
  service: string,
  input: string
): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(url(port, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      input,
      ref_audio: refAudioPath(service),
      ref_text: CLONE_REF_TEXT,
      response_format: "wav",
    }),
    signal: AbortSignal.timeout(300000),
  })
  if (!res.ok) throw new Error(`${service} ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function synthMossTts(input: string): Promise<Uint8Array<ArrayBuffer>> {
  return synthClone(PORTS.mossTts, MOSS_TTS_MODEL, "moss-tts", input)
}

export async function synthMossContinuation(
  input: string,
  prefixAudioRemote: string,
  prefixText: string
): Promise<Uint8Array<ArrayBuffer>> {
  const body = buildSpeechRequestBody({
    model: MOSS_TTS_MODEL,
    text: input,
    refAudioRemote: prefixAudioRemote,
    refText: prefixText,
    mode: "continuation",
  })
  const res = await fetch(url(PORTS.mossTts, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300000),
  })
  if (!res.ok) throw new Error(`moss-tts continuation ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function synthHiggsAudio(input: string): Promise<Uint8Array<ArrayBuffer>> {
  return synthClone(PORTS.higgsAudio, HIGGS_AUDIO_MODEL, "higgs-audio", input)
}

export async function synthQwen3Tts(
  input: string,
  instruct: string
): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(url(PORTS.qwen3Tts, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: QWEN3_TTS_MODEL,
      input,
      instruct,
      lang_code: "English",
      response_format: "wav",
    }),
    signal: AbortSignal.timeout(300000),
  })
  if (!res.ok) throw new Error(`qwen3-tts ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function synthVoxcpm2(
  input: string,
  instruct: string
): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(url(PORTS.voxcpm2, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: VOXCPM2_MODEL,
      input,
      instruct,
      response_format: "wav",
    }),
    signal: AbortSignal.timeout(300000),
  })
  if (!res.ok) throw new Error(`voxcpm2 ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function synthCsm(input: string): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(url(PORTS.csm, "/v1/audio/speech"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CSM_MODEL,
      input,
      ref_audio: CSM_REF_AUDIO_PATH,
      ref_text: CSM_REF_TEXT,
      response_format: "wav",
    }),
    signal: AbortSignal.timeout(300000),
  })
  if (!res.ok) throw new Error(`csm ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

const STOPWORDS: ReadonlySet<string> = new Set([
  "the",
  "a",
  "an",
  "of",
  "to",
  "in",
  "on",
  "at",
  "and",
  "or",
  "with",
  "for",
  "is",
  "was",
  "it",
  "this",
  "that",
  "over",
  "above",
  "by",
  "from",
])

export function contentWords(s: string): readonly string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
}

export function roughMatchScore(input: string, transcript: string): number {
  const want = contentWords(input)
  if (want.length === 0) return 0
  const got = new Set(contentWords(transcript))
  return want.filter((w) => got.has(w)).length / want.length
}
