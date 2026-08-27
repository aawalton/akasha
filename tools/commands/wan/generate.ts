export const summary = "Submit an I2V graph, wait, copy the mp4 out; writes an inference-run row"

import { webcrypto } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { i2vGraph, wanCode } from "../../lib/wan-code.ts"

const SERVICE = "wan-i2v"
const OPERATION = "i2v"
const MODEL = "QuantStack/Wan2.2-I2V-A14B-GGUF Q5_K_M"
const HOST = "workstation"
const DEFAULT_PORT = 8676

export const help: CommandHelp = {
  flags: [
    {
      name: "--start-image",
      argLabel: "png",
      valueShape: "token",
      description: "first-frame conditioning image (at least one of --start-image / --end-image)",
      aliases: ["--start"],
    },
    {
      name: "--end-image",
      argLabel: "png",
      valueShape: "token",
      description:
        "last-frame conditioning image; with --start-image it interpolates first→last, alone it anchors only the last frame and the model generates the lead-in landing on it",
      aliases: ["--end"],
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
      default: "1280x720",
      description: "output dimensions",
    },
    {
      name: "--frames",
      argLabel: "n",
      valueShape: "token",
      default: "81",
      description: `clip length in frames (81 ≈ 5 s at 16 fps)`,
    },
    {
      name: "--output",
      argLabel: "path",
      valueShape: "token",
      description: "where to write the mp4 (default: ~/Pictures/Generated/i2v-<ts>.mp4)",
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
    { code: 1, meaning: "input error — bad flag, unreadable image, malformed size" },
    { code: 3, meaning: "operational error — ComfyUI unreachable, graph rejected, or timeout" },
  ],
  examples: [
    "ops wan generate --start-image pose-a.png --prompt-file ./prompt.txt --lightning",
    "ops wan generate --start-image pose-a.png --end-image pose-b.png --prompt-file ./prompt.txt --seed 7",
    "ops wan generate --start-image still.png --prompt-file ./prompt.txt --size 832x480 --frames 49 --output ~/clips/idle.mp4",
    "ops wan generate --end-image pose-final.png --prompt-file ./prompt.txt --lightning --size 480x720",
  ],
}

function drawSeed(): number {
  const buf = new Uint32Array(1)
  webcrypto.getRandomValues(buf)
  return (buf[0] ?? 0) & (2 ** 31 - 1)
}

function formatWanCommandLine(command: string, args: readonly string[]): string {
  const quoted = args.map((a) => (/\s/.test(a) ? `'${a}'` : a))
  return `ops wan ${command} ${quoted.join(" ")}`.trim()
}

export default async function wanGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const code = await wanCode()

  const startImagePath = parsed.string("--start-image")
  const endImagePath = parsed.string("--end-image")
  if (startImagePath === undefined && endImagePath === undefined) {
    throw inputError("at least one of --start-image / --end-image is required")
  }
  const prompt = parsed.requireString("--prompt")
  const negativePrompt = parsed.string("--negative-prompt") ?? code.WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = parsed.boolean("--lightning")
  const steps =
    parsed.nonNegativeInt("--steps") ?? (lightning ? code.WAN_LIGHTNING_STEPS : code.WAN_FULL_STEPS)
  const seed = parsed.nonNegativeInt("--seed") ?? drawSeed()
  const size = parsed.requireString("--size")
  const parsedSize = code.parseSizeOrNull(size)
  if (parsedSize === null) {
    throw inputError(
      `--size must be WxH with positive integers (e.g. 1280x720), got '${size}'`
    )
  }
  const { width, height } = parsedSize
  const frames = parsed.requireNonNegativeInt("--frames")
  const pollDeadlineMs = parsed.requireNonNegativeInt("--timeout") * 1000
  const nowMs = Date.now()
  const outputPath =
    parsed.string("--output") ??
    join(homedir(), "Pictures", "Generated", `i2v-${Math.floor(nowMs / 1000)}.mp4`)

  const port = parsed.env("WAN_PORT") ?? String(DEFAULT_PORT)
  const baseUrl = `http://127.0.0.1:${port}`
  const wanHome = parsed.env("WAN_HOME") ?? join(homedir(), ".local", "share", "wan")
  const inputsDir = join(wanHome, "inputs")

  const readImage = async (flag: string, path: string): Promise<Uint8Array> => {
    try {
      return await readFile(path)
    } catch (err) {
      throw inputError(`cannot read ${flag} '${path}': ${String(err)}`)
    }
  }

  const startBytes =
    startImagePath === undefined ? undefined : await readImage("--start-image", startImagePath)
  const startName = startImagePath === undefined ? undefined : basename(startImagePath)
  const endBytes =
    endImagePath === undefined ? undefined : await readImage("--end-image", endImagePath)
  const endName = endImagePath === undefined ? undefined : basename(endImagePath)
  if (
    startImagePath !== undefined &&
    endImagePath !== undefined &&
    endName === startName &&
    resolve(endImagePath) !== resolve(startImagePath)
  ) {
    throw inputError(
      `--start-image and --end-image are different files with the same basename '${startName}' — staging would clobber one; rename one of them`
    )
  }

  const note = (msg: string): undefined => {
    process.stdout.write(`${msg}\n`)
    return undefined
  }

  await mkdir(inputsDir, { recursive: true })
  if (startBytes !== undefined && startName !== undefined) {
    await writeFile(join(inputsDir, startName), startBytes)
  }
  if (endBytes !== undefined && endName !== undefined) {
    await writeFile(join(inputsDir, endName), endBytes)
  }
  note(`staged input image(s) into ${inputsDir}`)

  const record = code.buildInferenceRunRecord({
    service: SERVICE,
    operation: OPERATION,
    model: MODEL,
    host: HOST,
    commandLine: formatWanCommandLine("generate", args),
    startedAt: new Date(nowMs).toISOString(),
    prompt,
    negativePrompt,
    seed,
    steps,
    width,
    height,
    size,
    frames,
    fps: code.WAN_FPS,
    lightning,
    ...(startImagePath !== undefined ? { inputImagePath: startImagePath } : {}),
    ...(startBytes !== undefined ? { inputImageSha256: code.sha256Hex(startBytes) } : {}),
    ...(endImagePath !== undefined ? { endImagePath } : {}),
    ...(endBytes !== undefined ? { endImageSha256: code.sha256Hex(endBytes) } : {}),
  })

  const graphs = await i2vGraph()

  await code.recordInferenceRun(record, async () => {
    const run = await code.runComfyGraph({
      baseUrl,
      buildGraph: () =>
        graphs.buildI2vGraph({
          ...(startName !== undefined ? { startImageName: startName } : {}),
          ...(endName !== undefined ? { endImageName: endName } : {}),
          prompt,
          negativePrompt,
          width,
          height,
          frames,
          seed,
          steps,
          lightning,
          filenamePrefix: "i2v",
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
