export const summary = "Extract PNG frames from a generated mp4 via host ffmpeg"

import { mkdir, readdir } from "node:fs/promises"
import { basename, dirname, extname, join, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--video",
      argLabel: "mp4",
      valueShape: "token",
      required: true,
      description: "source video file",
    },
    {
      name: "--fps",
      argLabel: "n",
      valueShape: "token",
      description: "sample rate in frames per second (default: extract every frame)",
    },
    {
      name: "--out-dir",
      argLabel: "dir",
      valueShape: "token",
      description: "frame destination (default: <video-dir>/<video-stem>-frames/)",
      aliases: ["--dir"],
    },
  ],
  exits: [
    { code: 0, meaning: "frames extracted" },
    { code: 1, meaning: "input error — bad flag or missing video" },
    { code: 3, meaning: "operational error — ffmpeg missing or extraction failed" },
  ],
  examples: [
    "ops wan frames --video ~/Pictures/Generated/i2v-1760000000.mp4",
    "ops wan frames --video clip.mp4 --fps 4 --out-dir ~/frames/clip",
  ],
}

const FRAME_PATTERN = /^frame-\d{4}\.png$/

async function spawnFfmpeg(args: readonly string[]) {
  try {
    return Bun.spawn([...args], { stdout: "pipe", stderr: "pipe" })
  } catch {
    throw operationalError(
      "ffmpeg not found on PATH — install it (see dotfiles/Brewfile)"
    )
  }
}

export default async function wanFrames(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const videoPath = parsed.requireString("--video")
  const fps = parsed.nonNegativeInt("--fps")
  if (fps !== undefined && fps === 0) throw inputError("--fps must be at least 1")
  if (!(await Bun.file(videoPath).exists())) {
    throw inputError(`--video '${videoPath}' does not exist`)
  }
  const stem = basename(videoPath, extname(videoPath))
  const outDir = resolve(parsed.string("--out-dir") ?? join(dirname(videoPath), `${stem}-frames`))
  await mkdir(outDir, { recursive: true })

  const ffmpegArgs = [
    "ffmpeg",
    "-hide_banner",
    "-y",
    "-i",
    videoPath,
    ...(fps === undefined ? [] : ["-vf", `fps=${fps}`]),
    join(outDir, "frame-%04d.png"),
  ]
  const proc = await spawnFfmpeg(ffmpegArgs)
  const stderr = await new Response(proc.stderr).text()
  const exitCode = await proc.exited
  if (exitCode !== 0) {
    const lastLine = stderr.trimEnd().split("\n").at(-1)?.trim() ?? "unknown error"
    throw operationalError(`ffmpeg frame extraction failed: ${lastLine}`)
  }

  const entries = await readdir(outDir)
  const count = entries.filter((name) => FRAME_PATTERN.test(name)).length
  process.stdout.write(`frames\t${count}\ndir\t${outDir}\n`)
}
