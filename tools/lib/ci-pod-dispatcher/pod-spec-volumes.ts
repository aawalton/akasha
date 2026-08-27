interface SecretMountSpec {
  secretName: string
  key: string
  mountPath: string
  mode?: number
}

interface VolumeSpec {
  name: string
  [key: string]: unknown
}

interface VolumeMountSpec {
  name: string
  mountPath: string
  readOnly?: boolean
}

export interface PodVolumeSet {
  volumes: readonly VolumeSpec[]
  volumeMounts: readonly VolumeMountSpec[]
}

export function buildPodVolumes(secretMounts: ReadonlyArray<SecretMountSpec>): PodVolumeSet {
  const volumes: VolumeSpec[] = [
    {
      name: "ci-storage",
      hostPath: { path: "/var/lib/ci-storage", type: "DirectoryOrCreate" },
    },
    { name: "tmp", emptyDir: { sizeLimit: "2Gi" } },
  ]
  const volumeMounts: VolumeMountSpec[] = [
    { name: "ci-storage", mountPath: "/ci-storage" },
    { name: "tmp", mountPath: "/tmp" },
  ]

  for (const [i, mount] of secretMounts.entries()) {
    const lastSlash = mount.mountPath.lastIndexOf("/")
    const dir = lastSlash > 0 ? mount.mountPath.slice(0, lastSlash) : "/"
    const file = lastSlash >= 0 ? mount.mountPath.slice(lastSlash + 1) : mount.mountPath
    const volumeName = `secret-mount-${i}`
    volumes.push({
      name: volumeName,
      secret: {
        secretName: mount.secretName,
        items: [{ key: mount.key, path: file, mode: mount.mode ?? 0o400 }],
      },
    })
    volumeMounts.push({ name: volumeName, mountPath: dir, readOnly: true })
  }

  return { volumes, volumeMounts }
}
