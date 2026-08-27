import { describe, expect, test } from "bun:test"

import { gpuVramUsableMinKey, gpuVramUsableMinSelector } from "@infra/k8s-types/hostnames"
import {
  buildUpscaleServingJob,
  UPSCALE_JOB_MEMORY,
  UPSCALE_SERVING_BUCKET,
  UPSCALE_SERVING_IMAGE,
  UPSCALE_SERVING_NAMESPACE,
  UPSCALE_WEIGHT_CACHE_HOSTPATH,
  UPSCALE_WEIGHT_CACHE_MOUNT,
} from "./upscale-serving-job.ts"

describe("buildUpscaleServingJob", () => {
  const job = buildUpscaleServingJob({
    jobName: "upscale-serving-42-1000",
    inName: "upscale-in-42.png",
    outName: "upscale-out-42.png",
    resolution: 1460,
    seed: 12345,
  })
  const podSpec = job.spec.template.spec
  const container = podSpec.containers[0]
  const env = new Map(container.env.map((e) => [e.name, e]))

  test("is a batch/v1 Job in the seaweedfs namespace with the given name", () => {
    expect(job.apiVersion).toBe("batch/v1")
    expect(job.kind).toBe("Job")
    expect(job.metadata.name).toBe("upscale-serving-42-1000")
    expect(job.metadata.namespace).toBe(UPSCALE_SERVING_NAMESPACE)
    expect(UPSCALE_SERVING_NAMESPACE).toBe("seaweedfs")
  })

  test("is one-shot: backoffLimit 0, restartPolicy Never, self-reaps via TTL, hard deadline", () => {
    expect(job.spec.backoffLimit).toBe(0)
    expect(podSpec.restartPolicy).toBe("Never")
    expect(job.spec.ttlSecondsAfterFinished).toBeGreaterThan(0)
    expect(job.spec.activeDeadlineSeconds).toBeGreaterThan(0)
  })

  test("states its VRAM requirement as a nodeSelector, and never names a node (#16049)", () => {
    expect("nodeName" in podSpec).toBe(false)
    expect(podSpec.nodeSelector).toEqual(gpuVramUsableMinSelector("8gi"))
    expect(podSpec.runtimeClassName).toBe("nvidia")
  })

  test("selects on usable-VRAM capacity, not on a card's identity", () => {
    const keys = Object.keys(podSpec.nodeSelector)
    expect(keys).toEqual([gpuVramUsableMinKey("8gi")])
    for (const key of keys) {
      expect(key).not.toContain("hostname")
      expect(key).not.toContain("model")
    }
  })

  test("claims exactly 1 GPU on both requests and limits", () => {
    expect(container.resources.requests["nvidia.com/gpu"]).toBe("1")
    expect(container.resources.limits["nvidia.com/gpu"]).toBe("1")
  })

  test("memory is Guaranteed at 16Gi (request == limit) and admits alongside CI on node-06", () => {
    expect(container.resources.requests.memory).toBe(UPSCALE_JOB_MEMORY)
    expect(container.resources.limits.memory).toBe(UPSCALE_JOB_MEMORY)
    expect(UPSCALE_JOB_MEMORY).toBe("16Gi")
  })

  test("runs the baked runner directly — no ConfigMap (self-contained image)", () => {
    expect(container.command).toEqual(["bash", "/runner/bench-runner.sh"])
    const volumes = podSpec.volumes ?? []
    expect(volumes.some((v) => "configMap" in v)).toBe(false)
  })

  test("mounts the per-node hostPath weight cache onto the runner's model dir (#14658)", () => {
    const cacheVolume = (podSpec.volumes ?? []).find((v) => v.name === "weight-cache")
    expect(cacheVolume).toBeDefined()
    expect(cacheVolume?.hostPath?.path).toBe(UPSCALE_WEIGHT_CACHE_HOSTPATH)
    expect(UPSCALE_WEIGHT_CACHE_HOSTPATH).toBe("/var/lib/upscale-weights")
    expect(cacheVolume?.hostPath?.type).toBe("DirectoryOrCreate")

    const cacheMount = (container.volumeMounts ?? []).find((m) => m.name === "weight-cache")
    expect(cacheMount).toBeDefined()
    expect(cacheMount?.mountPath).toBe(UPSCALE_WEIGHT_CACHE_MOUNT)
    expect(UPSCALE_WEIGHT_CACHE_MOUNT).toBe("/app/ComfyUI/models/SEEDVR2")
  })

  test("references the :serving image and always pulls it", () => {
    expect(container.image).toBe(UPSCALE_SERVING_IMAGE)
    expect(UPSCALE_SERVING_IMAGE).toContain("cluster/upscale-cu121:serving")
    expect(container.imagePullPolicy).toBe("Always")
  })

  test("wires the recipe knobs + S3 bucket through env", () => {
    expect(env.get("UPSCALE_IN")?.value).toBe("upscale-in-42.png")
    expect(env.get("UPSCALE_OUT")?.value).toBe("upscale-out-42.png")
    expect(env.get("UPSCALE_RES")?.value).toBe("1460")
    expect(env.get("UPSCALE_SEED")?.value).toBe("12345")
    expect(env.get("UPSCALE_BLOCKS_TO_SWAP")?.value).toBe("24")
    expect(env.get("S3_BUCKET")?.value).toBe(UPSCALE_SERVING_BUCKET)
    expect(UPSCALE_SERVING_BUCKET).toBe("upscale")
  })

  test("injects SeaweedFS creds from the in-namespace seaweedfs-creds Secret (no literal secrets)", () => {
    expect(env.get("SEAWEEDFS_S3_ENDPOINT")?.value).toContain(
      "s3-gateway.seaweedfs.svc.cluster.local"
    )
    const accessKeyRef = env.get("SEAWEEDFS_ACCESS_KEY")?.valueFrom?.secretKeyRef
    expect(accessKeyRef?.name).toBe("seaweedfs-creds")
    expect(accessKeyRef?.key).toBe("access_key")
    const secretKeyRef = env.get("SEAWEEDFS_SECRET_KEY")?.valueFrom?.secretKeyRef
    expect(secretKeyRef?.name).toBe("seaweedfs-creds")
    expect(secretKeyRef?.key).toBe("secret_key")
    expect(env.get("SEAWEEDFS_ACCESS_KEY")?.value).toBeUndefined()
    expect(env.get("SEAWEEDFS_SECRET_KEY")?.value).toBeUndefined()
  })

  test("seed 0 is carried through env (no truthiness foot-gun)", () => {
    const zero = buildUpscaleServingJob({
      jobName: "j",
      inName: "i.png",
      outName: "o.png",
      resolution: 1440,
      seed: 0,
    })
    const zeroEnv = new Map(zero.spec.template.spec.containers[0].env.map((e) => [e.name, e]))
    expect(zeroEnv.get("UPSCALE_SEED")?.value).toBe("0")
  })
})
