import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  createPod,
  deleteDeployment,
  deletePod,
  listDeployments,
  listPods,
  restartDeployment,
} from "../lib/pipeline-run/k8s-admin.ts"
import { setFetchForTests, type FetchLike } from "../lib/pipeline-run/k8s-fetch.ts"

const EnvVarSchema = z.string().optional()
const ORIGINAL_ENV = {
  PIPELINE_SA_TOKEN: EnvVarSchema.parse(process.env.PIPELINE_SA_TOKEN),
  K8S_API_BASE: EnvVarSchema.parse(process.env.K8S_API_BASE),
  K8S_CA_CERT_B64: EnvVarSchema.parse(process.env.K8S_CA_CERT_B64),
}

beforeAll(() => {
  process.env.PIPELINE_SA_TOKEN = "test-token"
  process.env.K8S_API_BASE = "https://k8s.test.local:6443"
  delete process.env.K8S_CA_CERT_B64
})

afterAll(() => {
  setFetchForTests(null)
  if (ORIGINAL_ENV.PIPELINE_SA_TOKEN === undefined) delete process.env.PIPELINE_SA_TOKEN
  else process.env.PIPELINE_SA_TOKEN = ORIGINAL_ENV.PIPELINE_SA_TOKEN
  if (ORIGINAL_ENV.K8S_API_BASE === undefined) delete process.env.K8S_API_BASE
  else process.env.K8S_API_BASE = ORIGINAL_ENV.K8S_API_BASE
  if (ORIGINAL_ENV.K8S_CA_CERT_B64 === undefined) delete process.env.K8S_CA_CERT_B64
  else process.env.K8S_CA_CERT_B64 = ORIGINAL_ENV.K8S_CA_CERT_B64
})

interface CapturedCall {
  url: string
  method: string | undefined
  body: string | undefined
  contentType: string | undefined
  authorization: string | undefined
}

const HeadersRecordSchema = z.record(z.string(), z.string()).optional()

interface MockResult {
  fetchImpl: FetchLike
  getCalls: () => readonly CapturedCall[]
}

function makeMock(response: Response): MockResult {
  const captured: CapturedCall[] = []
  const fetchImpl: FetchLike = async (input, init) => {
    const url = typeof input === "string" ? input : input.toString()
    const headers = HeadersRecordSchema.parse(init?.headers)
    captured.push({
      url,
      method: init?.method,
      body: typeof init?.body === "string" ? init.body : undefined,
      contentType: headers?.["Content-Type"],
      authorization: headers?.Authorization,
    })
    return response
  }
  return { fetchImpl, getCalls: () => captured }
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

const PatchBodySchema = z.object({
  spec: z.object({
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.string()),
      }),
    }),
  }),
})

describe("listDeployments", () => {
  it("projects items down to { name }", async () => {
    const mock = makeMock(
      jsonResponse(200, {
        items: [
          { metadata: { name: "pipeline-worker-1234", namespace: "ci" } },
          { metadata: { name: "pipeline-worker-5678", namespace: "ci" } },
        ],
      })
    )
    setFetchForTests(mock.fetchImpl)

    const result = await listDeployments("ci", "app=pipeline-worker")

    expect(result).toEqual([{ name: "pipeline-worker-1234" }, { name: "pipeline-worker-5678" }])
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("GET")
    expect(call.url).toContain("/apis/apps/v1/namespaces/ci/deployments")
    expect(call.url).toContain("labelSelector=app%3Dpipeline-worker")
    expect(call.authorization).toBe("Bearer test-token")
  })
})

describe("deleteDeployment", () => {
  it("returns { deleted: true } on a 200 response", async () => {
    const mock = makeMock(jsonResponse(200, { kind: "Status" }))
    setFetchForTests(mock.fetchImpl)

    const result = await deleteDeployment("ci", "pipeline-worker-1234")

    expect(result).toEqual({ deleted: true })
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("DELETE")
    expect(call.url).toContain("/apis/apps/v1/namespaces/ci/deployments/pipeline-worker-1234")
  })

  it("returns { deleted: false } on a 404 response (idempotent)", async () => {
    const mock = makeMock(jsonResponse(404, { kind: "Status" }))
    setFetchForTests(mock.fetchImpl)

    const result = await deleteDeployment("ci", "missing-deployment")

    expect(result).toEqual({ deleted: false })
  })

  it("throws on a 500 response", async () => {
    const mock = makeMock(
      new Response("internal error body", {
        status: 500,
        statusText: "Internal Server Error",
      })
    )
    setFetchForTests(mock.fetchImpl)

    let caught: unknown
    try {
      await deleteDeployment("ci", "any-name")
    } catch (err) {
      caught = err
    }

    if (!(caught instanceof Error)) throw new Error("expected an Error from deleteDeployment")
    expect(caught.message).toContain("deleteDeployment failed")
    expect(caught.message).toContain("HTTP 500")
    expect(caught.message).toContain("internal error body")
  })
})

describe("listPods", () => {
  it("projects items down to { name }", async () => {
    const mock = makeMock(
      jsonResponse(200, {
        items: [
          { metadata: { name: "pipeline-step-1234-typecheck", namespace: "ci" } },
          { metadata: { name: "pipeline-step-5678-build", namespace: "ci" } },
        ],
      })
    )
    setFetchForTests(mock.fetchImpl)

    const result = await listPods("ci", "pipeline-engine/pipeline")

    expect(result).toEqual([
      { name: "pipeline-step-1234-typecheck" },
      { name: "pipeline-step-5678-build" },
    ])
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("GET")
    expect(call.url).toContain("/api/v1/namespaces/ci/pods")
    expect(call.url).toContain("labelSelector=pipeline-engine%2Fpipeline")
    expect(call.authorization).toBe("Bearer test-token")
  })
})

describe("deletePod", () => {
  it("returns { deleted: true } on a 200 response", async () => {
    const mock = makeMock(jsonResponse(200, { kind: "Status" }))
    setFetchForTests(mock.fetchImpl)

    const result = await deletePod("ci", "pipeline-step-1234-typecheck")

    expect(result).toEqual({ deleted: true })
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("DELETE")
    expect(call.url).toContain("/api/v1/namespaces/ci/pods/pipeline-step-1234-typecheck")
  })

  it("returns { deleted: false } on a 404 response (idempotent)", async () => {
    const mock = makeMock(jsonResponse(404, { kind: "Status" }))
    setFetchForTests(mock.fetchImpl)

    const result = await deletePod("ci", "missing-pod")

    expect(result).toEqual({ deleted: false })
  })

  it("throws on a 500 response", async () => {
    const mock = makeMock(
      new Response("internal error body", {
        status: 500,
        statusText: "Internal Server Error",
      })
    )
    setFetchForTests(mock.fetchImpl)

    let caught: unknown
    try {
      await deletePod("ci", "any-name")
    } catch (err) {
      caught = err
    }

    if (!(caught instanceof Error)) throw new Error("expected an Error from deletePod")
    expect(caught.message).toContain("deletePod failed")
    expect(caught.message).toContain("HTTP 500")
    expect(caught.message).toContain("internal error body")
  })
})

describe("createPod", () => {
  it("POSTs the manifest and returns { created: true } on a 201 response", async () => {
    const mock = makeMock(jsonResponse(201, { kind: "Pod" }))
    setFetchForTests(mock.fetchImpl)

    const manifest = { apiVersion: "v1", kind: "Pod", metadata: { name: "corpse-x" } }
    const result = await createPod("ci", manifest)

    expect(result).toEqual({ created: true, alreadyExists: false })
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("POST")
    expect(call.url).toContain("/api/v1/namespaces/ci/pods")
    if (call.body === undefined) throw new Error("expected POST body")
    expect(call.body).toBe(JSON.stringify(manifest))
  })

  it("returns { alreadyExists: true } on a 409 response (idempotent name collision)", async () => {
    const mock = makeMock(jsonResponse(409, { kind: "Status", reason: "AlreadyExists" }))
    setFetchForTests(mock.fetchImpl)

    const result = await createPod("ci", { metadata: { name: "corpse-x" } })

    expect(result).toEqual({ created: false, alreadyExists: true })
  })

  it("throws on a 500 response", async () => {
    const mock = makeMock(
      new Response("internal error body", {
        status: 500,
        statusText: "Internal Server Error",
      })
    )
    setFetchForTests(mock.fetchImpl)

    let caught: unknown
    try {
      await createPod("ci", { metadata: { name: "any" } })
    } catch (err) {
      caught = err
    }

    if (!(caught instanceof Error)) throw new Error("expected an Error from createPod")
    expect(caught.message).toContain("createPod failed")
    expect(caught.message).toContain("HTTP 500")
    expect(caught.message).toContain("internal error body")
  })
})

describe("restartDeployment", () => {
  it("issues PATCH with strategic-merge content-type and ISO restartedAt annotation", async () => {
    const mock = makeMock(jsonResponse(200, { kind: "Deployment" }))
    setFetchForTests(mock.fetchImpl)

    const result = await restartDeployment("ci", "pipeline-orchestrator")

    expect(result).toEqual({ restarted: true })
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("PATCH")
    expect(call.contentType).toBe("application/strategic-merge-patch+json")
    expect(call.url).toContain("/apis/apps/v1/namespaces/ci/deployments/pipeline-orchestrator")

    if (call.body === undefined) throw new Error("expected PATCH body")
    const parsed = PatchBodySchema.parse(JSON.parse(call.body))
    const restartedAt =
      parsed.spec.template.metadata.annotations["kubectl.kubernetes.io/restartedAt"]
    expect(restartedAt).toBeDefined()
    expect(restartedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/)
  })
})
