import { createHash } from "node:crypto"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { ran } from "@akasha/utils-run/running"
import { temperAddonBuild } from "../temper-addon-build/temper-addon-build.command.code.ts"
import { temperAddonBundleBuild } from "../temper-addon-bundle-build/temper-addon-bundle-build.command.code.ts"

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const REGISTRY_FLAG = "--registry"

const PUSH_CEILING_MS = 5 * 60 * 1000

const A_SECOND = 1000

const SCRATCH_ROOT = "/var/tmp"

const SCRATCH_PREFIX = "temper-addon-bundle-"

const ZIP_NAME = "temper-addons.zip"

const VERSION_NAME = "version.txt"

const BASE_IMAGE = "docker.io/library/alpine:3.22"

const WORKING_CONTAINER = "temper-addon-bundle-build"

const PAYLOAD_UNDER = "/bundle"

const IMAGE_REPO = "cluster/temper-addons"

const PULL_REGISTRY = "registry.registry.svc.cluster.local:5000"

const DEFAULT_PUSH_REGISTRY = "192.168.68.87:30500"

const TAG_FILE = "temper/temper-web/deploy/addon-bundle-image.ts"

const SHA_PLACEHOLDER = "0".repeat(40)

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function mustRun(argv: readonly string[], what: string): string | null {
  const started = Date.now()
  const done = ran([...argv], { timeout: PUSH_CEILING_MS })
  if (done.code === 0) return null
  const why =
    Date.now() - started >= PUSH_CEILING_MS
      ? `was still running after ${String(PUSH_CEILING_MS / A_SECOND)}s and was killed, so it is stuck rather than slow`
      : "failed"
  return `${what} ${why}, so nothing it would have produced stands. It ran as \`${argv.join(" ")}\`.\n${done.err.trim()}`
}

function tagBody(contentHash: string): string {
  return [
    `export const ADDON_BUNDLE_CONTENT_HASH = "${contentHash}"`,
    "",
    `export const ADDON_BUNDLE_IMAGE = "${PULL_REGISTRY}/${IMAGE_REPO}:${contentHash}"`,
    "",
  ].join("\n")
}

function saidBy(answer: Answer, what: string): string | null {
  if (answer.code === 0) return null
  return `${what} refused, so there is nothing to publish: ${answer.refusals.join("; ")}`
}

export async function temperAddonBundlePublish(argv: readonly string[] = []): Promise<Answer> {
  const root = resolve(valuesOf(argv, CODE_ROOT_FLAG)[0] ?? codeRoot())
  const pushRegistry = valuesOf(argv, REGISTRY_FLAG)[0] ?? DEFAULT_PUSH_REGISTRY

  const scratch = mkdtempSync(join(SCRATCH_ROOT, SCRATCH_PREFIX))
  try {
    const outDir = join(scratch, "bundle")

    const compiled = await temperAddonBuild(["--all", "--build-only", CODE_ROOT_FLAG, root])
    const compileWrong = saidBy(compiled, "compiling every addon the bundle packs")
    if (compileWrong !== null) return refused(compileWrong, FAILED)

    const packedAnswer = temperAddonBundleBuild([
      "--out",
      outDir,
      "--sha",
      SHA_PLACEHOLDER,
      CODE_ROOT_FLAG,
      root,
    ])
    const packWrong = saidBy(packedAnswer, "the addon bundle build")
    if (packWrong !== null) return refused(packWrong, FAILED)

    const zipPath = join(outDir, ZIP_NAME)
    let zip: Uint8Array
    try {
      zip = readFileSync(zipPath)
    } catch {
      return refused(
        `the bundle build reported a pack and left no readable ${ZIP_NAME} at ${zipPath}, so there is nothing to publish`,
        DATA
      )
    }

    const contentHash = createHash("sha256").update(zip).digest("hex")
    const versionPath = join(outDir, VERSION_NAME)
    writeFileSync(versionPath, `${contentHash}\n`)

    const pushRef = `${pushRegistry}/${IMAGE_REPO}:${contentHash}`

    ran(["buildah", "rm", WORKING_CONTAINER], { timeout: PUSH_CEILING_MS })
    const stood = mustRun(
      ["buildah", "from", "--name", WORKING_CONTAINER, BASE_IMAGE],
      "standing up the image base"
    )
    if (stood !== null) return refused(stood, FAILED)

    let assembled: string | null
    try {
      assembled =
        mustRun(
          ["buildah", "copy", WORKING_CONTAINER, zipPath, `${PAYLOAD_UNDER}/${ZIP_NAME}`],
          "copying the bundle into the image"
        ) ??
        mustRun(
          ["buildah", "copy", WORKING_CONTAINER, versionPath, `${PAYLOAD_UNDER}/${VERSION_NAME}`],
          "copying the version file into the image"
        ) ??
        mustRun(["buildah", "commit", WORKING_CONTAINER, pushRef], "committing the image")
    } finally {
      ran(["buildah", "rm", WORKING_CONTAINER], { timeout: PUSH_CEILING_MS })
    }
    if (assembled !== null) return refused(assembled, FAILED)

    const pushed = mustRun(["podman", "push", "--tls-verify=false", pushRef], `pushing ${pushRef}`)
    if (pushed !== null) return refused(pushed, FAILED)

    const tagPath = join(root, TAG_FILE)
    writeFileSync(tagPath, tagBody(contentHash))

    return {
      report: [
        `zip ${zipPath} (${String(zip.byteLength)} bytes)`,
        `content ${contentHash}`,
        `image ${PULL_REGISTRY}/${IMAGE_REPO}:${contentHash}`,
        `pushed ${pushRef}`,
        `wrote ${tagPath} after the push, so what the tag names is already in the registry`,
      ],
      refusals: [],
      code: 0,
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
