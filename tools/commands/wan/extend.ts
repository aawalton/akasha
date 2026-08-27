export const summary = "Extend an existing mp4 from a multi-frame context window; writes an inference-run row"

import { webcrypto } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { extendGraph, wanCode } from "../../lib/wan-code.ts"
import { type ExtendDirection } from "@infra/wan/cli/extend-graph"

const SERVICE = "wan-i2v"
const OPERATION = "i2v-extend"
const MODEL = "QuantStack/Wan2.2-I2V-A14B-GGUF Q5_K_M"
const HOST = "workstation"
const DEFAULT_PORT = 8676
const DEFAULT_CONTEXT_FRAMES = 24
const DEFAULT_NEW_FRAMES = 16
const NEW_FRAMES_FLOOR = 13

export const help: CommandHelp = {
  flags: [
    {
      name: "--context",
      argLabel: "mp4",
      valueShape: "token",
      required: true,
      description: "source mp4 to extend",
      aliases: ["--video", "--clip"],
    },
    {
      name: "--direction",
      argLabel: "forward|back",
      valueShape: "token",
      required: true,
      description:
        "forward continues from the clip's end; back generates a lead-in before its start",
    },
    {
      name: "--prompt",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "motion prompt",
    },
    {
      name: "--negative-prompt",
      argLabel: "text",
      valueShape: "prose",
      description:
        "negative prompt steering the sampler away from listed traits (defaults to the Wan-recommended boilerplate covering oversaturation, blur, deformed anatomy, and static frames)",
      aliases: ["--negative"],
    },
    {
      name: "--context-frames",
      argLabel: "n",
      valueShape: "token",
      default: String(DEFAULT_CONTEXT_FRAMES),
      description: "frames of the source clip to condition on (the kept window)",
      aliases: ["--context-len"],
    },
    {
      name: "--new-frames",
      argLabel: "m",
      valueShape: "token",
      default: String(DEFAULT_NEW_FRAMES),
      description: "frames to generate (snapped up so context+new is 4k+1)",
      aliases: ["--new-len"],
    },
    {
      name: "--seed",
      argLabel: "n",
      valueShape: "token",
      description: "sampler seed (a random seed is drawn and recorded when omitted)",
    },
    {
      name: "--steps",
      argLabel: "n",
      valueShape: "token",
      description: `total denoise steps across both experts (default 20, or 4 with --lightning)`,
    },
    {
      name: "--lightning",
      description: "use the 4-step Lightning LoRA pair (fast iteration; cfg drops to 1.0)",
    },
    {
      name: "--size",
      argLabel: "WxH",
      valueShape: "token",
      description: "output dimensions (default: the context clip's own dimensions via ffprobe)",
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the mp4 (default: ~/Pictures/Generated/extend-<ts>.mp4)",
      aliases: ["--out"],
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "3600",
      description: "poll budget (seconds); a full-step 720p run can take most of an hour",
    },
  ],
  envVars: [
    { name: "WAN_PORT", description: "host loopback port for ComfyUI", default: "8676" },
    { name: "WAN_HOME", description: "host data dir (default ~/.local/share/wan)", path: true },
  ],
  exits: [
    { code: 0, meaning: "clip written and run recorded" },
    { code: 1, meaning: "input error — bad flag, missing clip, malformed size, bad frame counts" },
    { code: 3, meaning: "operational error — ffprobe missing, ComfyUI unreachable, or timeout" },
  ],
  examples: [
    "ops wan extend --context ~/clips/turn.mp4 --direction forward --prompt-file ./prompt.txt --lightning",
    "ops wan extend --context idle.mp4 --direction back --prompt-file ./prompt.txt --context-frames 24 --new-frames 16",
    "ops wan extend --context loop.mp4 --direction forward --prompt-file ./prompt.txt --size 832x480 --seed 7",
  ],
}

const DIRECTIONS = ["forward", "back"] as const

function drawSeed(): number {
  const buf = new Uint32Array(1)
  webcrypto.getRandomValues(buf)
  return (buf[0] ?? 0) & (2 ** 31 - 1)
}

function spawnFfprobe(args: readonly string[]) {
  try {
    return Bun.spawn(["ffprobe", ...args], { stdout: "pipe", stderr: "pipe" })
  } catch {
    return null
  }
}

async function runFfprobe(args: readonly string[]): Promise<string> {
  const proc = spawnFfprobe(args)
  if (proc === null) {
    throw operationalError(
      "ffprobe not found on PATH — install ffmpeg (see packages/shared/dotfiles/Brewfile)"
    )
  }
  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()
  const code = await proc.exited
  if (code !== 0) {
    const last = stderr.trimEnd().split("\n").at(-1)?.trim() ?? "unknown error"
    throw operationalError(`ffprobe failed: ${last}`)
  }
  return stdout.trim()
}

async function probeFrameCount(path: string): Promise<number> {
  const out = await runFfprobe([
    "-v",
    "error",
    "-count_frames",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=nb_read_frames",
    "-of",
    "csv=p=0",
    path,
  ])
  const n = Number.parseInt(out.split(/\r?\n/)[0]?.trim() ?? "", 10)
  if (!Number.isInteger(n) || n <= 0) {
    throw operationalError(
      `ffprobe returned an unusable frame count for '${path}': '${out}'`
    )
  }
  return n
}

async function probeDimensions(path: string): Promise<{ width: number; height: number }> {
  const out = await runFfprobe([
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=p=0",
    path,
  ])
  const [w, h] = (out.split(/\r?\n/)[0]?.trim() ?? "").split(",")
  const width = Number.parseInt(w ?? "", 10)
  const height = Number.parseInt(h ?? "", 10)
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    throw operationalError(`ffprobe returned unusable dimensions for '${path}': '${out}'`)
  }
  return { width, height }
}

function formatWanCommandLine(command: string, args: readonly string[]): string {
  const quoted = args.map((a) => (/\s/.test(a) ? `'${a}'` : a))
  return `ops wan ${command} ${quoted.join(" ")}`.trim()
}

export default async function wanExtend(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const code = await wanCode()
  const graphs = await extendGraph()

  const contextPath = parsed.requireString("--context")
  const directionRaw = parsed.requireString("--direction")
  const direction: ExtendDirection | undefined = DIRECTIONS.find((d) => d === directionRaw)
  if (direction === undefined) {
    throw inputError(`--direction must be 'forward' or 'back', got '${directionRaw}'`)
  }
  const prompt = parsed.requireString("--prompt")
  const negativePrompt = parsed.string("--negative-prompt") ?? code.WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = parsed.boolean("--lightning")
  const steps =
    parsed.nonNegativeInt("--steps") ?? (lightning ? code.WAN_LIGHTNING_STEPS : code.WAN_FULL_STEPS)
  const seed = parsed.nonNegativeInt("--seed") ?? drawSeed()
  const contextFrames = parsed.requireNonNegativeInt("--context-frames")
  const newFramesRequested = parsed.requireNonNegativeInt("--new-frames")
  const pollDeadlineMs = parsed.requireNonNegativeInt("--timeout") * 1000
  const sizeFlag = parsed.string("--size")
  const nowMs = Date.now()
  const outputPath =
    parsed.string("--output") ??
    join(homedir(), "Pictures", "Generated", `extend-${Math.floor(nowMs / 1000)}.mp4`)

  if (contextFrames < 1) throw inputError("--context-frames must be at least 1")

  const contextBytes = await (async (): Promise<Uint8Array> => {
    try {
      return await readFile(contextPath)
    } catch (err) {
      throw inputError(`cannot read --context '${contextPath}': ${String(err)}`)
    }
  })()

  const note = (msg: string): undefined => {
    process.stdout.write(`${msg}\n`)
    return undefined
  }
  const warn = (msg: string): undefined => {
    process.stderr.write(`${msg}\n`)
    return undefined
  }

  const totalFrames = await probeFrameCount(contextPath)
  if (contextFrames >= totalFrames) {
    throw inputError(
      `--context-frames ${contextFrames} must be fewer than the clip's ${totalFrames} frames`
    )
  }
  let width: number
  let height: number
  if (sizeFlag === undefined) {
    ;({ width, height } = await probeDimensions(contextPath))
  } else {
    const parsedSize = code.parseSizeOrNull(sizeFlag)
    if (parsedSize === null) {
      throw inputError(
        `--size must be WxH with positive integers (e.g. 1280x720), got '${sizeFlag}'`
      )
    }
    ;({ width, height } = parsedSize)
  }
  if (sizeFlag === undefined) {
    note(`probed context clip: ${totalFrames} frames, ${width}x${height}`)
  } else {
    note(`probed context clip: ${totalFrames} frames (output forced to ${width}x${height})`)
  }

  const rawLength = contextFrames + newFramesRequested
  const length = graphs.snapToVaeLength(rawLength)
  const newFrames = length - contextFrames
  if (length !== rawLength) {
    note(
      `adjusted --new-frames ${newFramesRequested} → ${newFrames} so total=${length} is 4k+1 (Wan latent constraint)`
    )
  }

  if (newFrames < NEW_FRAMES_FLOOR) {
    warn(
      `warning: --new-frames ${newFrames} is below ~${NEW_FRAMES_FLOOR}; the free latent window collapses below ~1 s given WanFirstLastFrameToVideo's +3 head buffer — expect a near-static result`
    )
  }

  const skipFirstFrames = graphs.computeSkipFirstFrames(direction, totalFrames, contextFrames)

  const port = parsed.env("WAN_PORT") ?? String(DEFAULT_PORT)
  const baseUrl = `http://127.0.0.1:${port}`
  const wanHome = parsed.env("WAN_HOME") ?? join(homedir(), ".local", "share", "wan")
  const inputsDir = join(wanHome, "inputs")
  const contextName = basename(contextPath)

  await mkdir(inputsDir, { recursive: true })
  await writeFile(join(inputsDir, contextName), contextBytes)
  note(`staged context clip into ${inputsDir}`)

  const size = `${width}x${height}`
  const record = code.buildInferenceRunRecord({
    service: SERVICE,
    operation: OPERATION,
    model: MODEL,
    host: HOST,
    commandLine: formatWanCommandLine("extend", args),
    startedAt: new Date(nowMs).toISOString(),
    prompt,
    negativePrompt,
    seed,
    steps,
    width,
    height,
    size,
    frames: length,
    fps: code.WAN_FPS,
    lightning,
    inputImagePath: contextPath,
    inputImageSha256: code.sha256Hex(contextBytes),
  })

  await code.recordInferenceRun(record, async () => {
    const run = await code.runComfyGraph({
      baseUrl,
      buildGraph: () =>
        graphs.buildExtendGraph({
          contextVideoName: graphs.resolveComfyInputName(contextName),
          direction,
          skipFirstFrames,
          contextFrames,
          length,
          prompt,
          negativePrompt,
          width,
          height,
          seed,
          steps,
          lightning,
          filenamePrefix: "extend",
        }),
      pollDeadlineMs,
      onProgress: note,
    })
    const mp4 = await code.fetchImage(baseUrl, run.image)
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, mp4)
    note(`wrote ${mp4.byteLength} bytes to ${outputPath}`)
    return { outputPath, outputBytes: mp4 }
  })
}
