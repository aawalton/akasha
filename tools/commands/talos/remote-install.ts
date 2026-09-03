export const summary =
  "SSH to a running Linux host, then kexec into the Talos installer (default) or dd the metal image and reboot"

import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import {
  metalCmdlineUrl,
  metalInitramfsUrl,
  metalKernelUrl,
  metalRawXzUrl,
  registerSchematic,
} from "@akasha/talos/talos-factory"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import type { NodeIntent } from "@akasha/talos/talos-schema"
import { runSsh } from "@akasha/talos/talos-ssh"
import { waitForPort } from "@akasha/talos/talos-wait-for-port"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const TALOS_MAINTENANCE_PORT = 50000

const METHODS = ["auto", "kexec", "dd"] as const
type Method = (typeof METHODS)[number]

function isMethod(value: string): value is Method {
  return METHODS.some((m) => m === value)
}

export const help: CommandHelp = {
  flags: [
    {
      name: "--node",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Node id (e.g. node-03). Drives schematic + install disk.",
    },
    {
      name: "--ip",
      argLabel: "<ip>",
      valueShape: "token",
      required: true,
      description:
        "Current IP of the running Linux host. Same IP is expected to come back as Talos.",
    },
    {
      name: "--ssh-user",
      argLabel: "<user>",
      valueShape: "token",
      required: true,
      description: "SSH user on the running host (must have passwordless sudo).",
    },
    {
      name: "--ssh-key",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Private SSH key for authentication.",
    },
    {
      name: "--method",
      argLabel: "<auto|kexec|dd>",
      valueShape: "token",
      required: false,
      description:
        "Install method (default: auto). 'auto' runs pre-flight on the remote and picks kexec when eligible, else dd. 'kexec' fails loud if the host can't kexec. 'dd' wipes the disk synchronously and runs efibootmgr to create a UEFI NVRAM entry.",
    },
    {
      name: "--confirm-wipe",
      description: "Required acknowledgement that the install disk will be overwritten.",
    },
  ],
  positionals: [
    {
      name: "node",
      required: false,
      aliasOfFlag: "--node",
      description: "Node id",
    },
  ],
  examples: [
    "ops talos remote-install --node node-03 --ip 192.168.68.75 --ssh-user walton --ssh-key ~/.ssh/claude_mcp_key --confirm-wipe",
    "ops talos remote-install --node node-03 --ip 192.168.68.75 --ssh-user walton --ssh-key ~/.ssh/claude_mcp_key --method dd --confirm-wipe",
    "ops talos remote-install node-03 --ip 192.168.68.75 --ssh-user walton --ssh-key ~/.ssh/claude_mcp_key --confirm-wipe",
  ],
}

export default async function talosRemoteInstall(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const nodeId = parsed.requireString("--node")
  const ip = parsed.requireString("--ip")
  const sshUser = parsed.requireString("--ssh-user")
  const sshKey = parsed.requireString("--ssh-key")
  const confirmWipe = parsed.boolean("--confirm-wipe")
  const methodArg = parsed.string("--method") ?? "auto"
  if (!isMethod(methodArg)) {
    throw inputError(`--method must be one of ${METHODS.join(", ")} (got: ${methodArg})`)
  }
  const method: Method = methodArg

  let node: NodeIntent
  try {
    node = getNode(nodeId)
  } catch (err) {
    throw inputError(err instanceof Error ? err.message : String(err))
  }

  const installDisk = node.installDisk
  if (installDisk === undefined && method !== "kexec") {
    throw inputError(
      `node ${node.id} declares installDiskSelector (no fixed installDisk); the '${method}' path needs a device path. ` +
        `Use --method kexec (the selector is resolved at apply), or boot the Talos USB into maintenance mode and run: ops talos apply --node ${node.id} --ip ${ip}`
    )
  }

  if (!confirmWipe) {
    throw inputError(
      `refusing to wipe ${installDisk ?? "the selector-matched disk"} on ${ip} without --confirm-wipe`
    )
  }

  process.stdout.write(`registering schematic for ${node.id}…\n`)
  const schematicYaml = emitSchematicYaml(buildSchematic(node))
  const schematicId = await registerSchematic(schematicYaml)
  const talosVersion = getClusterForNode(nodeId).talosVersion
  const rawUrl = metalRawXzUrl(schematicId, talosVersion)
  const kernelUrl = metalKernelUrl(schematicId, talosVersion)
  const initramfsUrl = metalInitramfsUrl(schematicId, talosVersion)
  const cmdlineUrl = metalCmdlineUrl(schematicId, talosVersion)
  process.stdout.write(`schematic id: ${schematicId}\nmethod:       ${method}\n`)

  process.stdout.write(`provisioning Talos on ${ip} via ${method}…\n`)
  const script = buildInstallScript({
    method,
    rawUrl,
    kernelUrl,
    initramfsUrl,
    cmdlineUrl,
    installDisk,
  })
  await runSsh({ user: sshUser, host: ip, keyPath: sshKey, script })

  process.stdout.write(
    `remote handoff scheduled — waiting for Talos maintenance mode on ${ip}:${TALOS_MAINTENANCE_PORT}…\n`
  )
  await waitForPort({
    host: ip,
    port: TALOS_MAINTENANCE_PORT,
    timeoutMs: 30 * 60 * 1000,
    intervalMs: 5000,
    onTick: (elapsedMs) => {
      const secs = Math.floor(elapsedMs / 1000)
      if (secs % 30 === 0) process.stdout.write(`  …still waiting (${secs}s elapsed)\n`)
    },
  })

  process.stdout.write(`Talos is up. Next:\n  ops talos apply --node ${node.id} --ip ${ip}\n`)
}

function buildInstallScript(opts: {
  readonly method: Method
  readonly rawUrl: string
  readonly kernelUrl: string
  readonly initramfsUrl: string
  readonly cmdlineUrl: string
  readonly installDisk: string | undefined
}): string {
  const kexec = renderKexecBody(opts.kernelUrl, opts.initramfsUrl, opts.cmdlineUrl)
  const preflight = renderPreflight()

  switch (opts.method) {
    case "kexec":
      return `set -euo pipefail\n\n${preflight}\nif ! can_kexec; then\n  echo "[remote] --method=kexec but host is not eligible — refusing to fall back" >&2\n  exit 1\nfi\n${kexec}\nexit 0\n`
    case "dd": {
      if (opts.installDisk === undefined) {
        throw inputError("method 'dd' requires a fixed installDisk (device path)")
      }
      const dd = renderDdBody(opts.rawUrl, opts.installDisk)
      return `set -euo pipefail\n\n${dd}\nexit 0\n`
    }
    case "auto": {
      if (opts.installDisk === undefined) {
        throw inputError("method 'auto' requires a fixed installDisk for its dd fallback")
      }
      const dd = renderDdBody(opts.rawUrl, opts.installDisk)
      return `set -euo pipefail\n\n${preflight}\nif can_kexec; then\n  echo "[remote] auto: kexec eligible — using kexec"\n${kexec}else\n  echo "[remote] auto: kexec ineligible — falling back to dd"\n${dd}fi\nexit 0\n`
    }
    default:
      return assertNever(opts.method)
  }
}

function renderDdBody(rawUrl: string, installDisk: string): string {
  return `echo "[remote] dd: writing ${rawUrl} to ${installDisk}"
curl -fsSL ${rawUrl} | xz -d | sudo dd of=${installDisk} bs=4M oflag=direct conv=fsync status=progress
sudo sync
echo "[remote] dd: creating UEFI NVRAM entry via efibootmgr (belt-and-suspenders for #11447 UEFI gap)"
sudo efibootmgr --create --disk ${installDisk} --part 1 --loader '\\EFI\\BOOT\\BOOTX64.EFI' --label 'Talos' \\
  || echo "[remote] WARN: efibootmgr --create failed; first boot may need manual UEFI fix"
echo "[remote] dd: scheduling reboot in 5s"
nohup sudo bash -c 'sleep 5 && reboot' >/dev/null 2>&1 &
`
}

function renderKexecBody(kernelUrl: string, initramfsUrl: string, cmdlineUrl: string): string {
  return `echo "[remote] kexec: downloading installer kernel + initramfs from factory.talos.dev"
if ! command -v kexec >/dev/null; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y kexec-tools
fi
curl -fsSL ${kernelUrl} -o /tmp/talos-kernel
curl -fsSL ${initramfsUrl} -o /tmp/talos-initramfs.xz
TALOS_CMDLINE=$(curl -fsSL ${cmdlineUrl})
echo "[remote] kexec: loading kernel with cmdline=$TALOS_CMDLINE"
sudo kexec -l /tmp/talos-kernel --initrd=/tmp/talos-initramfs.xz --command-line="$TALOS_CMDLINE"
echo "[remote] kexec: handoff in 3s (systemctl kexec, fallback bare kexec -e)"
nohup sudo bash -c 'sleep 3 && (systemctl kexec || kexec -e)' >/dev/null 2>&1 &
`
}

function renderPreflight(): string {
  return `can_kexec() {
  if [ -r /sys/kernel/kexec_load_disabled ] && [ "$(cat /sys/kernel/kexec_load_disabled)" != "0" ]; then
    echo "[remote] kexec disabled: /sys/kernel/kexec_load_disabled=1" >&2
    return 1
  fi
  if [ -r /sys/kernel/security/lockdown ]; then
    if ! grep -q '\\[none\\]' /sys/kernel/security/lockdown; then
      echo "[remote] kexec blocked: kernel lockdown is active ($(cat /sys/kernel/security/lockdown))" >&2
      return 1
    fi
  fi
  local sb_var
  sb_var=$(ls /sys/firmware/efi/efivars/SecureBoot-* 2>/dev/null | head -n1 || true)
  if [ -n "$sb_var" ] && [ -s "$sb_var" ]; then
    if [ "$(od -An -t u1 "$sb_var" | awk '{print $5}')" = "1" ]; then
      echo "[remote] kexec blocked: UEFI Secure Boot is enforcing" >&2
      return 1
    fi
  fi
  if ! command -v kexec >/dev/null; then
    echo "[remote] kexec binary missing — attempting apt-get install kexec-tools"
    if ! sudo DEBIAN_FRONTEND=noninteractive apt-get install -y kexec-tools; then
      echo "[remote] apt-get install kexec-tools failed" >&2
      return 1
    fi
  fi
  return 0
}
`
}
