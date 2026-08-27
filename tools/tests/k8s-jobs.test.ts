import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { z } from "zod"
import { setFetchForTests, type FetchLike } from "../lib/pipeline-run/k8s-fetch.ts"
import {
  countOutOfCpuEvents,
  createJob,
  getJob,
  readJobPodLogs,
  waitForJob,
} from "../lib/pipeline-run/k8s-jobs.ts"

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

function capture(input: Parameters<FetchLike>[0], init: Parameters<FetchLike>[1]): CapturedCall {
  const url = typeof input === "string" ? input : input.toString()
  const headers = HeadersRecordSchema.parse(init?.headers)
  return {
    url,
    method: init?.method,
    body: typeof init?.body === "string" ? init.body : undefined,
    contentType: headers?.["Content-Type"],
    authorization: headers?.Authorization,
  }
}

function makeMock(response: Response): MockResult {
  const captured: CapturedCall[] = []
  const fetchImpl: FetchLike = async (input, init) => {
    captured.push(capture(input, init))
    return response
  }
  return { fetchImpl, getCalls: () => captured }
}

function makeSequenceMock(responses: readonly Response[]): MockResult {
  const captured: CapturedCall[] = []
  let index = 0
  const fetchImpl: FetchLike = async (input, init) => {
    captured.push(capture(input, init))
    const response = responses.at(Math.min(index, responses.length - 1))
    index += 1
    if (response === undefined) throw new Error("makeSequenceMock: no response queued")
    return response
  }
  return { fetchImpl, getCalls: () => captured }
}

function makeFactoryMock(factory: () => Response): MockResult {
  const captured: CapturedCall[] = []
  const fetchImpl: FetchLike = async (input, init) => {
    captured.push(capture(input, init))
    return factory()
  }
  return { fetchImpl, getCalls: () => captured }
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

describe("createJob", () => {
  it("POSTs the manifest as the body and returns { name }", async () => {
    const mock = makeMock(jsonResponse(201, { metadata: { name: "bench-node-06" } }))
    setFetchForTests(mock.fetchImpl)

    const manifest = { kind: "Job", metadata: { name: "bench-node-06" }, spec: { parallelism: 1 } }
    const result = await createJob("ci", manifest)

    expect(result).toEqual({ name: "bench-node-06" })
    const calls = mock.getCalls()
    expect(calls).toHaveLength(1)
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("POST")
    expect(call.url).toContain("/apis/batch/v1/namespaces/ci/jobs")
    if (call.body === undefined) throw new Error("expected POST body")
    expect(call.body).toBe(JSON.stringify(manifest))
    expect(call.authorization).toBe("Bearer test-token")
  })

  it("throws on a 500 response", async () => {
    const mock = makeMock(
      new Response("boom", { status: 500, statusText: "Internal Server Error" })
    )
    setFetchForTests(mock.fetchImpl)

    let caught: unknown
    try {
      await createJob("ci", { kind: "Job" })
    } catch (err) {
      caught = err
    }
    if (!(caught instanceof Error)) throw new Error("expected an Error from createJob")
    expect(caught.message).toContain("createJob failed")
    expect(caught.message).toContain("HTTP 500")
    expect(caught.message).toContain("boom")
  })
})

describe("getJob", () => {
  it("normalizes a rich status into counters + conditions", async () => {
    const mock = makeMock(
      jsonResponse(200, {
        status: {
          active: 1,
          succeeded: 2,
          failed: 0,
          conditions: [{ type: "Complete", status: "True", reason: "done" }],
        },
      })
    )
    setFetchForTests(mock.fetchImpl)

    const result = await getJob("ci", "bench-node-06")

    expect(result).toEqual({
      active: 1,
      succeeded: 2,
      failed: 0,
      conditions: [{ type: "Complete", status: "True" }],
    })
    const calls = mock.getCalls()
    const call = calls[0]
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("GET")
    expect(call.url).toContain("/apis/batch/v1/namespaces/ci/jobs/bench-node-06")
  })

  it("defaults every absent field (fresh Job with no status)", async () => {
    const mock = makeMock(jsonResponse(200, { metadata: { name: "bench-node-06" } }))
    setFetchForTests(mock.fetchImpl)

    const result = await getJob("ci", "bench-node-06")

    expect(result).toEqual({ active: 0, succeeded: 0, failed: 0, conditions: [] })
  })
})

describe("waitForJob", () => {
  it("returns succeeded once succeeded >= 1 (active first, then succeeded)", async () => {
    const mock = makeSequenceMock([
      jsonResponse(200, { status: { active: 1 } }),
      jsonResponse(200, { status: { succeeded: 1 } }),
    ])
    setFetchForTests(mock.fetchImpl)

    const result = await waitForJob("ci", "bench-node-06", { timeoutMs: 10_000, pollMs: 1 })

    expect(result).toEqual({ outcome: "succeeded" })
    expect(mock.getCalls()).toHaveLength(2)
  })

  it("returns succeeded on a Complete=True condition", async () => {
    const mock = makeMock(
      jsonResponse(200, { status: { conditions: [{ type: "Complete", status: "True" }] } })
    )
    setFetchForTests(mock.fetchImpl)

    const result = await waitForJob("ci", "bench-node-06", { timeoutMs: 10_000, pollMs: 1 })

    expect(result).toEqual({ outcome: "succeeded" })
  })

  it("returns failed on failed >= 1", async () => {
    const mock = makeMock(jsonResponse(200, { status: { failed: 1 } }))
    setFetchForTests(mock.fetchImpl)

    const result = await waitForJob("ci", "bench-node-06", { timeoutMs: 10_000, pollMs: 1 })

    expect(result).toEqual({ outcome: "failed" })
  })

  it("returns timeout once the deadline passes with no terminal state", async () => {
    const mock = makeFactoryMock(() => jsonResponse(200, { status: { active: 1 } }))
    setFetchForTests(mock.fetchImpl)

    const result = await waitForJob("ci", "bench-node-06", { timeoutMs: 5, pollMs: 1 })

    expect(result).toEqual({ outcome: "timeout" })
  })
})

describe("readJobPodLogs", () => {
  it("finds the Job's pod by label then returns the raw log text", async () => {
    const mock = makeSequenceMock([
      jsonResponse(200, { items: [{ metadata: { name: "bench-node-06-abcde" } }] }),
      new Response("line one\nline two\n", { status: 200 }),
    ])
    setFetchForTests(mock.fetchImpl)

    const logs = await readJobPodLogs("ci", "bench-node-06")

    expect(logs).toBe("line one\nline two\n")
    const calls = mock.getCalls()
    expect(calls).toHaveLength(2)
    const listCall = calls[0]
    const logCall = calls[1]
    if (listCall === undefined || logCall === undefined) throw new Error("expected two calls")
    expect(listCall.method).toBe("GET")
    expect(listCall.url).toContain("/api/v1/namespaces/ci/pods")
    expect(listCall.url).toContain("labelSelector=job-name%3Dbench-node-06")
    expect(logCall.method).toBe("GET")
    expect(logCall.url).toContain("/api/v1/namespaces/ci/pods/bench-node-06-abcde/log")
  })

  it('returns "" when the Job has no pod yet', async () => {
    const mock = makeMock(jsonResponse(200, { items: [] }))
    setFetchForTests(mock.fetchImpl)

    const logs = await readJobPodLogs("ci", "bench-node-06")

    expect(logs).toBe("")
    expect(mock.getCalls()).toHaveLength(1)
  })
})

describe("countOutOfCpuEvents", () => {
  it("counts only reason=OutOfcpu events on the node at/after the window start", async () => {
    const since = Date.parse("2026-07-04T12:00:00Z")
    const mock = makeMock(
      jsonResponse(200, {
        items: [
          {
            reason: "OutOfcpu",
            source: { host: "node-06" },
            lastTimestamp: "2026-07-04T12:05:00Z",
          },
          {
            reason: "OutOfcpu",
            source: { host: "node-06" },
            lastTimestamp: "2026-07-04T11:00:00Z",
          },
          {
            reason: "OutOfcpu",
            source: { host: "node-03" },
            lastTimestamp: "2026-07-04T12:05:00Z",
          },
          { reason: "OutOfcpu", reportingInstance: "node-06" },
        ],
      })
    )
    setFetchForTests(mock.fetchImpl)

    const count = await countOutOfCpuEvents("node-06", since)

    expect(count).toBe(2)
    const call = mock.getCalls().at(0)
    if (call === undefined) throw new Error("expected one captured call")
    expect(call.method).toBe("GET")
    expect(call.url).toContain("/api/v1/events?fieldSelector=reason=OutOfcpu")
  })

  it("returns 0 when the node has no matching events (the benchmark control)", async () => {
    const mock = makeMock(jsonResponse(200, { items: [] }))
    setFetchForTests(mock.fetchImpl)
    expect(await countOutOfCpuEvents("node-06", 0)).toBe(0)
  })

  it("throws on a non-2xx events response", async () => {
    const mock = makeMock(jsonResponse(500, { message: "boom" }))
    setFetchForTests(mock.fetchImpl)
    await expect(countOutOfCpuEvents("node-06", 0)).rejects.toThrow("countOutOfCpuEvents failed")
  })
})
