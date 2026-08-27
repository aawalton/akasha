import { beforeEach, describe, expect, mock, test } from "bun:test"

const BASE = "https://factory.talos.dev/image/abc123/v1.10.0"
const RAW_URL = `${BASE}/metal-amd64.raw.xz`
const KERNEL_URL = `${BASE}/kernel-amd64`
const INITRAMFS_URL = `${BASE}/initramfs-amd64.xz`
const CMDLINE_URL = `${BASE}/cmdline-metal-amd64`

interface NodeSpec {
  readonly id: string
  readonly installDisk: string | undefined
}

const NODES_BY_ID: Record<string, NodeSpec> = {
  "node-sda": { id: "node-sda", installDisk: "/dev/sda" },
  "node-nvme": { id: "node-nvme", installDisk: "/dev/nvme0n1" },
  "node-selector": { id: "node-selector", installDisk: undefined },
}

let script = ""
let waited: { readonly host: string; readonly port: number } | null = null

mock.module("@infra/talos/nodes", () => ({
  getNode: (id: string): NodeSpec => {
    const node = NODES_BY_ID[id]
    if (node === undefined) throw new Error(`unknown node ${id}`)
    return node
  },
  getClusterForNode: (): { readonly talosVersion: string } => ({ talosVersion: "v1.10.0" }),
}))

mock.module("@infra/talos/build-schematic", () => ({
  buildSchematic: (): unknown => ({}),
}))

mock.module("@infra/talos/emit-yaml", () => ({
  emitSchematicYaml: (): string => "yaml",
}))

mock.module("@infra/talos/lib/factory", () => ({
  registerSchematic: async (): Promise<string> => "abc123",
  metalRawXzUrl: (): string => RAW_URL,
  metalKernelUrl: (): string => KERNEL_URL,
  metalInitramfsUrl: (): string => INITRAMFS_URL,
  metalCmdlineUrl: (): string => CMDLINE_URL,
}))

mock.module("@infra/talos/lib/ssh", () => ({
  runSsh: async (opts: { readonly script: string }): Promise<void> => {
    script = opts.script
  },
}))

mock.module("@infra/talos/lib/wait-for-port", () => ({
  waitForPort: async (opts: {
    readonly host: string
    readonly port: number
  }): Promise<void> => {
    waited = { host: opts.host, port: opts.port }
  },
}))

const talosRemoteInstall = (await import("../commands/talos/remote-install.ts")).default

type Write = typeof process.stdout.write

async function install(node: string, extra: readonly string[]): Promise<void> {
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((): boolean => true) as Write
  try {
    await talosRemoteInstall([
      "--node",
      node,
      "--ip",
      "192.168.68.75",
      "--ssh-user",
      "walton",
      "--ssh-key",
      "/dev/null",
      ...extra,
    ])
  } finally {
    process.stdout.write = original
  }
}

async function scriptFor(node: string, method: string): Promise<string> {
  await install(node, ["--method", method, "--confirm-wipe"])
  return script
}

beforeEach(() => {
  script = ""
  waited = null
})

describe("ops talos remote-install — every method", () => {
  test("each install script opens in strict-mode bash", async () => {
    for (const method of ["auto", "kexec", "dd"]) {
      expect(await scriptFor("node-sda", method)).toContain("set -euo pipefail")
    }
  })

  test("the run waits for the Talos maintenance port on the same host", async () => {
    await install("node-sda", ["--method", "kexec", "--confirm-wipe"])
    expect(waited).toEqual({ host: "192.168.68.75", port: 50000 })
  })
})

describe("ops talos remote-install — method dd", () => {
  test("dd-pipes the raw image to the disk, syncs, then writes the UEFI entry before rebooting", async () => {
    const body = await scriptFor("node-sda", "dd")
    expect(body).toContain(`curl -fsSL ${RAW_URL} | xz -d | sudo dd of=/dev/sda`)
    expect(body).toContain("conv=fsync")
    expect(body).toContain("sudo sync")
    expect(body).toContain(
      "efibootmgr --create --disk /dev/sda --part 1 --loader '\\EFI\\BOOT\\BOOTX64.EFI' --label 'Talos'"
    )
    expect(body).toContain("nohup sudo bash -c 'sleep 5 && reboot'")
  })

  test("the dd path never mentions the kexec asset URLs", async () => {
    const body = await scriptFor("node-sda", "dd")
    expect(body).not.toContain(KERNEL_URL)
    expect(body).not.toContain(INITRAMFS_URL)
    expect(body).not.toContain(CMDLINE_URL)
  })

  test("the install disk is substituted literally, with no rewriting", async () => {
    const body = await scriptFor("node-nvme", "dd")
    expect(body).toContain("of=/dev/nvme0n1")
    expect(body).toContain("--disk /dev/nvme0n1")
    expect(body).not.toContain("/dev/sda")
  })
})

describe("ops talos remote-install — method kexec", () => {
  test("downloads kernel, initramfs and cmdline, then hands off with a bare kexec fallback", async () => {
    const body = await scriptFor("node-sda", "kexec")
    expect(body).toContain(`curl -fsSL ${KERNEL_URL} -o /tmp/talos-kernel`)
    expect(body).toContain(`curl -fsSL ${INITRAMFS_URL} -o /tmp/talos-initramfs.xz`)
    expect(body).toContain(CMDLINE_URL)
    expect(body).toContain(
      "sudo kexec -l /tmp/talos-kernel --initrd=/tmp/talos-initramfs.xz --command-line="
    )
    expect(body).toContain("systemctl kexec")
    expect(body).toContain("kexec -e")
  })

  test("the kexec path writes no disk and creates no boot entry, both deferred to apply", async () => {
    const body = await scriptFor("node-sda", "kexec")
    expect(body).not.toContain("dd of=")
    expect(body).not.toContain("efibootmgr --create")
  })

  test("kexec-tools is installed when the host lacks it", async () => {
    expect(await scriptFor("node-sda", "kexec")).toContain("apt-get install -y kexec-tools")
  })

  test("a selector-only node still installs by kexec, which never writes a disk", async () => {
    const body = await scriptFor("node-selector", "kexec")
    expect(body).toContain("kexec -l /tmp/talos-kernel")
    expect(body).not.toContain("dd of=")
    expect(body).not.toContain("undefined")
  })
})

describe("ops talos remote-install — method auto", () => {
  test("pre-flight reads kexec_load_disabled, kernel lockdown and Secure Boot", async () => {
    const body = await scriptFor("node-sda", "auto")
    expect(body).toContain("/sys/kernel/kexec_load_disabled")
    expect(body).toContain("/sys/kernel/security/lockdown")
    expect(body).toContain("SecureBoot")
  })

  test("both paths are carried, so either can run once the remote has decided", async () => {
    const body = await scriptFor("node-sda", "auto")
    expect(body).toContain("kexec -l /tmp/talos-kernel")
    expect(body).toContain("dd of=/dev/sda")
  })

  test("auto keeps the efibootmgr step its dd fallback needs", async () => {
    expect(await scriptFor("node-sda", "auto")).toContain(
      "efibootmgr --create --disk /dev/sda --part 1"
    )
  })
})

describe("ops talos remote-install — what it refuses before touching the host", () => {
  test("a selector-only node is refused for dd, naming the method that needs a device path", async () => {
    await expect(
      install("node-selector", ["--method", "dd", "--confirm-wipe"])
    ).rejects.toThrow(/declares installDiskSelector .*the 'dd' path needs a device path/)
    expect(script).toBe("")
  })

  test("a selector-only node is refused for auto, whose dd fallback needs the same", async () => {
    await expect(
      install("node-selector", ["--method", "auto", "--confirm-wipe"])
    ).rejects.toThrow(/the 'auto' path needs a device path/)
    expect(script).toBe("")
  })

  test("the wipe is refused without --confirm-wipe, and nothing is sent", async () => {
    await expect(install("node-sda", ["--method", "dd"])).rejects.toThrow(/--confirm-wipe/)
    expect(script).toBe("")
  })

  test("an unknown method is refused with the three it takes", async () => {
    await expect(install("node-sda", ["--method", "sideload", "--confirm-wipe"])).rejects.toThrow(
      /--method must be one of auto, kexec, dd/
    )
  })

  test("an unknown node is an input error rather than a thrown lookup", async () => {
    await expect(install("node-absent", ["--confirm-wipe"])).rejects.toThrow(
      /unknown node node-absent/
    )
  })
})
