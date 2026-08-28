
export const summary = "Build the Temper addon bundle here and publish it to the cluster registry under its content hash"

import { createHash } from "node:crypto"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { codeRoot } from "../../../../lib/code-root.ts"
import { dataError, operationalError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { ownRepoRoot } from "../../../../../repo/roots/roots"
import type { CommandHelp } from "../../../../ops/surface.ts"

const BUILD_CEILING_MS = 30 * 60 * 1000

const PUSH_CEILING_MS = 5 * 60 * 1000

const SCRATCH_ROOT = "/var/tmp"

const OPS_CLI_REL = "tools/ops/cli.ts"

const ZIP_NAME = "temper-addons.zip"

const VERSION_NAME = "version.txt"

const BASE_IMAGE = "docker.io/library/alpine:3.22"

const WORKING_CONTAINER = "temper-addon-bundle-build"

const IMAGE_PAYLOAD_DIR = "/bundle"

const IMAGE_REPO = "cluster/temper-addons"

const PULL_REGISTRY = "registry.registry.svc.cluster.local:5000"

const DEFAULT_PUSH_REGISTRY = "192.168.68.87:30500"

const TAG_FILE = "temper/web/deploy/addon-bundle-image.ts"

const SHA_PLACEHOLDER = "0".repeat(40)

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout to build from and write the tag into. Defaults to $CODE_ROOT, else this repository.",
    },
    {
      name: "--registry",
      argLabel: "<host:port>",
      valueShape: "token",
      description: "Where to push. Reachable from this workstation, not from the cluster.",
      default: DEFAULT_PUSH_REGISTRY,
    },
    {
      name: "--dry-run",
      description: "Build and hash, then stop. Push nothing and write nothing.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  exits: [
    { code: 2, meaning: "the build produced no zip, or produced one this could not read" },
    { code: 3, meaning: "the build, the image assembly or the push failed or ran past its ceiling" },
  ],
  examples: [
    "ops temper addon bundle publish --code-root ~/repos/akasha",
    "ops temper addon bundle publish --dry-run",
  ],
}

interface Ran {
  readonly ok: boolean
  readonly stdout: string
  readonly output: string
  readonly hitCeiling: boolean
}

function ran(cmd: readonly string[], timeoutMs: number, cwd?: string): Ran {
  const started = Date.now()
  const proc = Bun.spawnSync([...cmd], {
    stdout: "pipe",
    stderr: "pipe",
    timeout: timeoutMs,
    ...(cwd === undefined ? {} : { cwd }),
  })
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  return {
    ok: (proc.exitCode ?? 1) === 0,
    stdout: decode(proc.stdout).trim(),
    output: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim(),
    hitCeiling: Date.now() - started >= timeoutMs,
  }
}

function mustRun(cmd: readonly string[], timeoutMs: number, what: string, cwd?: string): string {
  const result = ran(cmd, timeoutMs, cwd)
  if (!result.ok) {
    const why = result.hitCeiling
      ? `was still running after ${String(timeoutMs / 1000)}s and was killed, so it is stuck rather than slow`
      : "failed"
    throw operationalError(
      `${what} ${why}, so nothing it would have produced stands. It ran as \`${cmd.join(" ")}\`.\n${result.output}`
    )
  }
  return result.stdout
}

function tagFileBody(contentHash: string): string {
  return [
    `export const ADDON_BUNDLE_CONTENT_HASH = "${contentHash}"`,
    "",
    `export const ADDON_BUNDLE_IMAGE = "${PULL_REGISTRY}/${IMAGE_REPO}:${contentHash}"`,
    "",
  ].join("\n")
}

export default async function temperAddonBundlePublish(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = parsed.string("--code-root") ?? codeRoot()
  const pushRegistry = parsed.string("--registry") ?? DEFAULT_PUSH_REGISTRY
  const dryRun = parsed.boolean("--dry-run")

  const scratch = mkdtempSync(join(SCRATCH_ROOT, "temper-addon-bundle-"))
  try {
    const outDir = join(scratch, "bundle")
    mustRun(
      [
        "bun",
        join(ownRepoRoot(), OPS_CLI_REL),
        "temper",
        "addon",
        "build",
        "--all",
        "--build-only",
        "--code-root",
        root,
      ],
      BUILD_CEILING_MS,
      "compiling every addon the bundle packs",
      root
    )
    mustRun(
      [
        "bun",
        join(ownRepoRoot(), OPS_CLI_REL),
        "temper",
        "addon",
        "bundle",
        "build",
        "--out",
        outDir,
        "--sha",
        SHA_PLACEHOLDER,
        "--code-root",
        root,
      ],
      BUILD_CEILING_MS,
      "the addon bundle build",
      root
    )

    const zipPath = join(outDir, ZIP_NAME)
    let zip: Uint8Array
    try {
      zip = readFileSync(zipPath)
    } catch {
      throw dataError(
        `the addon bundle build reported success but wrote no readable ${ZIP_NAME} at ${zipPath}, so there is nothing to publish`
      )
    }
    const contentHash = createHash("sha256").update(zip).digest("hex")

    writeFileSync(join(outDir, VERSION_NAME), `${contentHash}\n`)

    process.stdout.write(`zip:     ${zipPath} (${String(zip.byteLength)} bytes)\n`)
    process.stdout.write(`content: ${contentHash}\n`)
    process.stdout.write(`image:   ${PULL_REGISTRY}/${IMAGE_REPO}:${contentHash}\n`)

    if (dryRun) {
      process.stdout.write("dry run: nothing pushed, nothing written\n")
      return
    }

    const pushRef = `${pushRegistry}/${IMAGE_REPO}:${contentHash}`
    const container = WORKING_CONTAINER
    ran(["buildah", "rm", container], PUSH_CEILING_MS)
    mustRun(
      ["buildah", "from", "--name", container, BASE_IMAGE],
      PUSH_CEILING_MS,
      "standing up the image base"
    )
    try {
      mustRun(
        ["buildah", "copy", container, zipPath, `${IMAGE_PAYLOAD_DIR}/${ZIP_NAME}`],
        PUSH_CEILING_MS,
        "copying the bundle into the image"
      )
      mustRun(
        ["buildah", "copy", container, join(outDir, VERSION_NAME), `${IMAGE_PAYLOAD_DIR}/${VERSION_NAME}`],
        PUSH_CEILING_MS,
        "copying the version file into the image"
      )
      mustRun(["buildah", "commit", container, pushRef], PUSH_CEILING_MS, "committing the image")
    } finally {
      ran(["buildah", "rm", container], PUSH_CEILING_MS)
    }

    mustRun(
      ["podman", "push", "--tls-verify=false", pushRef],
      PUSH_CEILING_MS,
      `pushing ${pushRef}`
    )
    process.stdout.write(`pushed:  ${pushRef}\n`)

    const tagPath = join(root, TAG_FILE)
    writeFileSync(tagPath, tagFileBody(contentHash))
    process.stdout.write(`wrote:   ${tagPath}\n`)
    process.stdout.write(
      "The tag is written only after the push, so what it names is in the registry. Land it with `ops write`.\n"
    )
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
