export const summary = "ArcFace cosine per frame vs a reference identity (in-container, CPU)"

import { homedir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--frames-dir",
      argLabel: "dir",
      valueShape: "token",
      required: true,
      description: "directory of frames to score",
      aliases: ["--frames"],
    },
    {
      name: "--reference",
      argLabel: "png",
      valueShape: "token",
      required: true,
      description: "reference identity image",
      aliases: ["--ref"],
    },
    {
      name: "--floor",
      argLabel: "f",
      valueShape: "token",
      default: "0.45",
      description: "same-identity cosine floor (the persona-pipeline default)",
    },
  ],
  envVars: [
    { name: "WAN_IMAGE", description: "container image name", default: "wan:local" },
    { name: "WAN_HOME", description: "host data dir (default ~/.local/share/wan)", path: true },
  ],
  exits: [
    { code: 0, meaning: "frames scored (TSV on stdout)" },
    { code: 1, meaning: "input error — bad flag or malformed floor" },
    { code: 2, meaning: "data error — no detectable face in the reference, or frames dir missing" },
    { code: 3, meaning: "operational error — podman/image missing or the scorer crashed" },
  ],
  examples: [
    "ops wan score --frames-dir ~/clips/i2v-frames --reference identity.png",
    "ops wan score --frames-dir frames/ --reference ref.png --floor 0.5 | awk -F'\\t' '$3 == 1'",
  ],
}

const REJECTED_INPUTS = 2

export default async function wanScore(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const framesDir = resolve(parsed.requireString("--frames-dir"))
  const referencePath = resolve(parsed.requireString("--reference"))
  const floorRaw = parsed.requireString("--floor")
  const floor = Number(floorRaw)
  if (floorRaw.trim() === "" || !Number.isFinite(floor)) {
    throw inputError(`--floor must be a finite number, got '${floorRaw}'`)
  }

  const image = parsed.env("WAN_IMAGE") ?? "wan:local"
  const wanHome = parsed.env("WAN_HOME") ?? join(homedir(), ".local", "share", "wan")

  const podmanArgs = [
    "podman",
    "run",
    "--rm",
    "--entrypoint",
    "python",
    "-v",
    `${framesDir}:/scoring/frames:Z`,
    "-v",
    `${dirname(referencePath)}:/scoring/ref:Z`,
    "-v",
    `${join(wanHome, "cache")}:/root/.cache:Z`,
    image,
    "/app/bin/score-frames.py",
    "--reference",
    `/scoring/ref/${basename(referencePath)}`,
    "--frames-dir",
    "/scoring/frames",
    "--floor",
    String(floor),
  ]
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn(podmanArgs, { stdout: "inherit", stderr: "inherit" })
  } catch {
    throw operationalError("podman not found on PATH")
  }
  const exitCode = await proc.exited
  if (exitCode === REJECTED_INPUTS) {
    throw dataError(
      "scoring rejected the inputs — no detectable face in the reference, or the frames dir is missing (see stderr)"
    )
  }
  if (exitCode !== 0) {
    throw operationalError(`score-frames.py exited with code ${exitCode}`)
  }
}
