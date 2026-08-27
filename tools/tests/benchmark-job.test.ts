import { describe, expect, it } from "bun:test"

import { buildBenchmarkJob } from "../lib/benchmark-job.ts"
import { hostnameSelector } from "@infra/k8s-types/hostnames"

function container(job: Awaited<ReturnType<typeof buildBenchmarkJob>>) {
  const c = job.spec.template.spec.containers.at(0)
  if (c === undefined) throw new Error("expected one container")
  return c
}

function storeVolume(job: Awaited<ReturnType<typeof buildBenchmarkJob>>) {
  const v = job.spec.template.spec.volumes.find((vol) => vol.name === "store")
  if (v === undefined) throw new Error("expected a store volume")
  return v
}

describe("buildBenchmarkJob", () => {
  const base = { node: "node-06", store: "disk", targetSha: "abc1234def", runId: "r1" } as const

  it("is a batch/v1 Job placed by a hostname nodeSelector, never nodeName", async () => {
    const job = await buildBenchmarkJob(base)
    expect(job.apiVersion).toBe("batch/v1")
    expect(job.kind).toBe("Job")
    expect(job.spec.template.spec.nodeSelector).toEqual(hostnameSelector("node-06"))
    expect("nodeName" in job.spec.template.spec).toBe(false)
  })

  it("does not silently retry: backoffLimit 0 + restartPolicy Never", async () => {
    const job = await buildBenchmarkJob(base)
    expect(job.spec.backoffLimit).toBe(0)
    expect(job.spec.template.spec.restartPolicy).toBe("Never")
  })

  it("mounts ONE store emptyDir at $HOME/.cache/pipeline-engine/ci-storage", async () => {
    const job = await buildBenchmarkJob(base)
    const mounts = container(job).volumeMounts
    expect(mounts).toHaveLength(1)
    expect(mounts.at(0)?.mountPath).toBe("/root/.cache/pipeline-engine/ci-storage")
    expect(mounts.at(0)?.name).toBe("store")
  })

  it("disk store → plain emptyDir (no tmpfs medium)", async () => {
    const job = await buildBenchmarkJob(base)
    expect(storeVolume(job).emptyDir).toEqual({})
  })

  it("memory store → tmpfs emptyDir with 8Gi sizeLimit", async () => {
    const job = await buildBenchmarkJob({ ...base, store: "memory" })
    expect(storeVolume(job).emptyDir).toEqual({ medium: "Memory", sizeLimit: "8Gi" })
  })

  it("memory store sets a memory request ≥ 8Gi tmpfs (caution a)", async () => {
    const job = await buildBenchmarkJob({ ...base, store: "memory" })
    expect(container(job).resources.requests.memory).toBe("12Gi")
    expect(container(job).resources.limits.memory).toBe("16Gi")
  })

  it("HOME is pinned so the store mountPath is a build-time constant", async () => {
    const job = await buildBenchmarkJob(base)
    const home = container(job).env.find((e) => e.name === "HOME")
    expect(home?.value).toBe("/root")
  })

  it("injects git + supabase auth via secretKeyRef, never plaintext", async () => {
    const job = await buildBenchmarkJob(base)
    const git = container(job).env.find((e) => e.name === "GIT_ACCESS_TOKEN")
    expect(git?.value).toBeUndefined()
    expect(git?.valueFrom?.secretKeyRef).toEqual({
      name: "pipeline-engine-secrets",
      key: "GIT_ACCESS_TOKEN",
    })
    expect(container(job).env.find((e) => e.name === "SUPABASE_URL")?.valueFrom).toBeDefined()
  })

  it("injects the age key via secretKeyRef so check-sops-manifests can decrypt (parity)", async () => {
    const age = container(await buildBenchmarkJob(base)).env.find((e) => e.name === "AGE_SECRET_KEY")
    expect(age?.value).toBeUndefined()
    expect(age?.valueFrom?.secretKeyRef).toEqual({
      name: "pipeline-engine-secrets",
      key: "AGE_SECRET_KEY",
    })
  })

  it("passes the target SHA, node, and store to the runner via env", async () => {
    const job = await buildBenchmarkJob({
      ...base,
      store: "memory",
      node: "node-04",
      targetSha: "deadbeef",
    })
    const env = container(job).env
    expect(env.find((e) => e.name === "TARGET_SHA")?.value).toBe("deadbeef")
    expect(env.find((e) => e.name === "NODE_NAME")?.value).toBe("node-04")
    expect(env.find((e) => e.name === "STORE")?.value).toBe("memory")
  })

  it("runs on the glibc buildpack-deps image as root", async () => {
    const job = await buildBenchmarkJob(base)
    expect(container(job).image).toBe("buildpack-deps:bookworm-scm")
    expect(job.spec.template.spec.securityContext).toEqual({ runAsUser: 0 })
  })

  it("names the Job uniquely per run and keeps it DNS-1123 safe", async () => {
    const a = await buildBenchmarkJob({ ...base, runId: "20260704T1200" })
    const b = await buildBenchmarkJob({ ...base, runId: "20260704T1300" })
    expect(a.metadata.name).not.toBe(b.metadata.name)
    expect(a.metadata.name).toMatch(/^[a-z0-9-]{1,63}$/)
  })
})
