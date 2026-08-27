import { describe, expect, test } from "bun:test"
import {
  buildApplyScript,
  buildMfluxQueryScript,
  buildPlist,
  buildPruneScript,
  buildQueryScript,
  buildRunScript,
} from "./build-script"
import type { InferenceHost, InferenceService } from "./schema"

const host: InferenceHost = {
  name: "macbook",
  address: "100.64.0.2",
  user: "walton",
  keyPath: "~/.ssh/id_ed25519",
  home: "/Users/walton",
  condaSh: "/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh",
}

const service: InferenceService = {
  name: "moss-tts",
  host: "macbook",
  pythonVersion: "3.12",
  sourceDir: "packages/infra/inference/src/services/mlx-audio",
  workdir: ".",
  command: ["python", "-m", "mlx_audio.server", "--host", "127.0.0.1", "--port", "18093"],
  port: 8093,
  lifecycle: "pool",
  internalPort: 18093,
  publicBind: "tailnet",
  warm: true,
}

const alwaysOnService: InferenceService = {
  name: "traffic-cop",
  host: "macbook",
  pythonVersion: "3.12",
  sourceDir: "packages/infra/inference/src/services/traffic-cop",
  workdir: ".",
  command: ["bun", "run", "src/server.ts"],
  port: 8099,
  lifecycle: "always-on",
  publicBind: "tailnet",
  warm: false,
}

describe("buildQueryScript", () => {
  const q = buildQueryScript(host)
  test("scopes discovery to the managed ownership prefixes only", () => {
    expect(q).toContain("/Users/walton/inference")
    expect(q).toContain("com\\.alanwalton\\.inference\\.")
    expect(q).toContain("^inference-")
  })
  test("sources conda by absolute path (non-interactive shell)", () => {
    expect(q).toContain("source '/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh'")
  })
  test("emits the three line tags the parser expects", () => {
    expect(q).toContain('echo "DIR $name $h"')
    expect(q).toContain('echo "LAUNCHD $n"')
    expect(q).toContain('echo "CONDA $n"')
  })
  test("emits no health-probe block when no probe names are given (default)", () => {
    expect(q).not.toContain("CONDABAD")
    expect(q).not.toContain("CONDA_BASE=")
  })
})

describe("buildQueryScript health probe", () => {
  const q = buildQueryScript(host, ["image-gen", "mlx-vlm"])
  test("derives the conda base from the absolute conda.sh init path", () => {
    expect(q).toContain("CONDA_BASE='/opt/homebrew/Caskroom/miniforge/base'")
  })
  test("loops the probed service names against their inference-<name> env prefix", () => {
    expect(q).toContain("for hn in 'image-gen' 'mlx-vlm'; do")
    expect(q).toContain('ENV_PREFIX="$CONDA_BASE/envs/inference-$hn"')
    expect(q).toContain('PYBIN="$ENV_PREFIX/bin/python"')
  })
  test("runs the filesystem RECORD-integrity probe and emits CONDABAD on failure", () => {
    expect(q).toContain('"$PYBIN" - "$ENV_PREFIX"')
    expect(q).toContain("mlx_metal-*.dist-info")
    expect(q).toContain('then echo "CONDABAD $hn"; fi')
  })
  test("flags an env whose dir exists but interpreter is missing as CONDABAD (self-heals the fully-missing-python corruption)", () => {
    expect(q).not.toContain('[ -x "$PYBIN" ] || continue')
    expect(q).toContain('if [ -x "$PYBIN" ]; then')
    expect(q).toContain('elif [ -d "$ENV_PREFIX" ]; then')
  })
  test("still ends with a clean exit so the query never errors the reconcile", () => {
    expect(q.trimEnd().endsWith("exit 0")).toBe(true)
  })
})

describe("buildRunScript", () => {
  const r = buildRunScript(host, service)
  test("activates the per-service conda env and cds into the workdir", () => {
    expect(r).toContain("conda activate 'inference-moss-tts'")
    expect(r).toContain("cd '/Users/walton/inference/moss-tts/.'")
  })
  test("execs the declared command", () => {
    expect(r).toContain(
      "exec 'python' '-m' 'mlx_audio.server' '--host' '127.0.0.1' '--port' '18093'"
    )
  })
})

describe("buildPlist", () => {
  const p = buildPlist(host, service)
  test("labels the job under the ownership prefix and runs run.sh", () => {
    expect(p).toContain("<string>com.alanwalton.inference.moss-tts</string>")
    expect(p).toContain("<string>/Users/walton/inference/moss-tts/run.sh</string>")
  })
  test("a pool service is registered but not started (RunAtLoad=false, KeepAlive=false)", () => {
    expect(p).toContain("<key>RunAtLoad</key>\n  <false/>")
    expect(p).toContain("<key>KeepAlive</key>\n  <false/>")
  })
  test("an always-on service is started and crash-restarted (RunAtLoad=true, KeepAlive=true)", () => {
    const ao = buildPlist(host, alwaysOnService)
    expect(ao).toContain("<key>RunAtLoad</key>\n  <true/>")
    expect(ao).toContain("<key>KeepAlive</key>\n  <true/>")
  })
})

describe("buildApplyScript", () => {
  const a = buildApplyScript({ host, service, inputsHash: "abc123abc123" })
  test("runs the per-service deploy.sh with name, python, dir, conda.sh", () => {
    expect(a).toContain(
      `bash "$SVC_DIR/src/deploy.sh" 'moss-tts' '3.12' "$SVC_DIR" '/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh'`
    )
  })
  test("reloads launchd via bootout then bootstrap (RunAtLoad starts it)", () => {
    expect(a).toContain("launchctl bootout")
    expect(a).toContain("launchctl bootstrap")
    const bootoutIdx = a.indexOf("launchctl bootout")
    const bootstrapIdx = a.indexOf("launchctl bootstrap")
    expect(bootstrapIdx).toBeGreaterThan(bootoutIdx)
  })
  test("does not kickstart — bootout+bootstrap(RunAtLoad) is the sole (re)start, no kill-restart race", () => {
    expect(a).not.toContain("launchctl kickstart")
  })
  test("retries bootstrap on the transient EIO / in-progress race, failing fast otherwise", () => {
    expect(a).toContain("for attempt in 1 2 3 4 5 6; do")
    expect(a).toContain('*"Input/output error"* | *"in progress"*)')
    expect(a).toContain('if [ -z "$bootstrapped" ]; then')
    const loopIdx = a.indexOf("for attempt in")
    const bootstrapIdx = a.indexOf("launchctl bootstrap")
    expect(bootstrapIdx).toBeGreaterThan(loopIdx)
  })
  test("stamps the content hash only after the (set -e) steps", () => {
    expect(a).toContain("set -euo pipefail")
    const stampIdx = a.indexOf("echo 'abc123abc123' > \"$SVC_DIR/.inputs-hash\"")
    const applyIdx = a.indexOf("launchctl bootstrap")
    expect(stampIdx).toBeGreaterThan(applyIdx)
  })
})

describe("buildPruneScript", () => {
  const p = buildPruneScript({ host, name: "moss-tts" })
  test("fully tears down launchd job, plist, dir, and conda env", () => {
    expect(p).toContain('launchctl bootout "gui/$uid/com.alanwalton.inference.moss-tts"')
    expect(p).toContain(
      "rm -f '/Users/walton/Library/LaunchAgents/com.alanwalton.inference.moss-tts.plist'"
    )
    expect(p).toContain("rm -rf '/Users/walton/inference/moss-tts'")
    expect(p).toContain("conda env remove -n 'inference-moss-tts' -y")
  })
})

describe("buildMfluxQueryScript", () => {
  const q = buildMfluxQueryScript(host, "image-gen")
  test("sources the host conda init and activates the service's image env", () => {
    expect(q).toContain("source '/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh'")
    expect(q).toContain("conda activate 'inference-image-gen'")
  })
  test("emits the ENV_MISSING sentinel when activation fails (env not provisioned)", () => {
    expect(q).toContain("ENV_MISSING")
  })
  test("lists only mflux-* entry points from the activated env's bin", () => {
    expect(q).toContain('"$CONDA_PREFIX"/bin')
    expect(q).toContain("grep -E '^mflux-'")
  })
  test("ends with a clean exit so an absent env never errors the verb", () => {
    expect(q.trimEnd().endsWith("exit 0")).toBe(true)
  })
})
