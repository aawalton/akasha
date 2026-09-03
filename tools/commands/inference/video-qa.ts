export const summary =
  "Read a clip with the Qwen3-VL VLM and answer a motion-artifact checklist; writes an inference-run row"

import { mkdtemp, readdir, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import * as vlm from "@akasha/inference-clients/mlx-vlm-client"
import { getHost } from "@akasha/inference-pool/inference-hosts"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { formatCommandLine } from "@akasha/inference-runs/inference-command-line"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import * as store from "@akasha/inference-runs/inference-run-store"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SERVICE_NAME = "mlx-vlm"
const DEFAULT_FRAMES = 16

async function listPngs(dir: string): Promise<string[]> {
  const names = (await readdir(dir)).filter((n) => n.toLowerCase().endsWith(".png")).sort()
  return names.map((n) => join(dir, n))
}

async function framesToDataUrls(dir: string, want: number): Promise<string[]> {
  const all = await listPngs(dir)
  if (all.length === 0) throw operationalError(`no PNG frames found in ${dir}`)
  const picked = vlm.selectFrameIndices(all.length, want).map((i) => all[i])
  const urls: string[] = []
  for (const path of picked) {
    if (path === undefined) continue
    urls.push(vlm.toPngDataUrl(await readFile(path)))
  }
  return urls
}

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--video",
      argLabel: "path",
      valueShape: "token",
      description: "clip to read (frames extracted host-side); one of --video / --frames-dir",
      aliases: ["--in"],
    },
    {
      name: "--frames-dir",
      argLabel: "dir",
      valueShape: "token",
      description: "reuse already-extracted PNG frames (e.g. from `wan frames`)",
    },
    {
      name: "--checklist",
      argLabel: "text",
      valueShape: "prose",
      required: true,
      description: "the question prompt — what to look for (artifacts, transition kind, pose)",
      aliases: ["--prompt"],
    },
    {
      name: "--frames",
      argLabel: "n",
      valueShape: "token",
      default: String(DEFAULT_FRAMES),
      description: `evenly-spaced frames to sample (default ${DEFAULT_FRAMES})`,
    },
    {
      name: "--fps",
      argLabel: "n",
      valueShape: "token",
      description: "resample to this fps before sampling frames (default: every frame)",
    },
    {
      name: "--timeout",
      argLabel: "s",
      valueShape: "token",
      default: "600",
      description: "request budget (seconds)",
    },
  ],
  examples: [
    "ops inference video-qa --video clip.mp4 --checklist-file ./checklist.md",
    "ops inference video-qa --frames-dir clip.frames --frames 24 --checklist-file ./checklist.md",
  ],
}

export default async function videoQaCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const videoPath = parsed.string("--video")
  const framesDir = parsed.string("--frames-dir")
  const checklist = parsed.requireString("--checklist")
  const frames = parsed.requireNonNegativeInt("--frames")
  const fps = parsed.nonNegativeInt("--fps")
  const timeoutMs = parsed.requireNonNegativeInt("--timeout") * 1000

  if ((videoPath === undefined) === (framesDir === undefined)) {
    throw inputError("provide exactly one of --video or --frames-dir")
  }
  if (frames <= 0) throw inputError(`--frames must be positive, got ${frames}`)

  const service = SERVICES.find((s) => s.name === SERVICE_NAME)
  if (service === undefined) {
    throw operationalError(`no ${SERVICE_NAME} service is declared in the registry`)
  }
  const host = getHost(service.host)
  const baseUrl = `http://${host.address}:${service.port}`

  let imageDataUrls: string[]
  let inputVideoFields: { inputVideoPath: string; inputVideoSha256: string } | undefined
  let tempDir: string | undefined
  try {
    if (videoPath !== undefined) {
      let clipBytes: Uint8Array
      try {
        clipBytes = await readFile(videoPath)
      } catch (err) {
        throw inputError(`cannot read --video '${videoPath}': ${String(err)}`)
      }
      inputVideoFields = {
        inputVideoPath: videoPath,
        inputVideoSha256: sha256Hex(clipBytes),
      }
      tempDir = await mkdtemp(join(tmpdir(), "inference-video-qa-"))
      await vlm.runFfmpeg(
        vlm.buildFrameExtractArgs({
          videoPath,
          outDir: tempDir,
          ...(fps !== undefined ? { fps } : {}),
        })
      )
      imageDataUrls = await framesToDataUrls(tempDir, frames)
    } else if (framesDir !== undefined) {
      imageDataUrls = await framesToDataUrls(framesDir, frames)
    } else {
      throw inputError("provide exactly one of --video or --frames-dir")
    }

    const record = buildInferenceRunRecord({
      service: SERVICE_NAME,
      operation: "video-qa",
      model: vlm.MLX_VLM_MODEL,
      host: service.host,
      commandLine: formatCommandLine("video-qa", args),
      startedAt: new Date().toISOString(),
      prompt: checklist,
      frames: imageDataUrls.length,
      ...(fps !== undefined ? { fps } : {}),
      ...(inputVideoFields ?? {}),
    })

    const pageId = await store.startInferenceRun(record)
    const startMs = Date.now()
    try {
      const answer = await vlm.runVideoQa({
        baseUrl,
        body: vlm.buildVideoQaRequest({
          model: vlm.MLX_VLM_MODEL,
          checklist,
          imageDataUrls,
        }),
        timeoutMs,
      })
      await store.finishInferenceRun(pageId, {
        status: "completed",
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - startMs,
        outputText: answer,
      })
      process.stdout.write(`${answer}\n`)
    } catch (err) {
      await store.finishInferenceRun(pageId, {
        status: "failed",
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - startMs,
        errorMessage: err instanceof Error ? err.message : String(err),
      })
      throw err
    }
  } finally {
    if (tempDir !== undefined) await rm(tempDir, { recursive: true, force: true })
  }
}
