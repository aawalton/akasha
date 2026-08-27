import { describe, expect, test } from "bun:test"
import { createServer } from "node:net"
import { isPortOpen } from "./cluster-access.ts"

describe("isPortOpen", () => {
  async function bindEphemeral(): Promise<{
    server: ReturnType<typeof createServer>
    port: number
  }> {
    const server = createServer()
    const port = await new Promise<number>((resolve, reject) => {
      server.once("error", reject)
      server.listen(0, "127.0.0.1", () => {
        const addr = server.address()
        if (typeof addr === "object" && addr != null) resolve(addr.port)
        else reject(new Error("Failed to bind ephemeral port"))
      })
    })
    return { server, port }
  }

  test("returns true when a TCP server is listening", async () => {
    const { server, port } = await bindEphemeral()
    try {
      expect(await isPortOpen("127.0.0.1", port)).toBe(true)
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()))
    }
  })

  test("returns false when no server is bound to the port", async () => {
    const { server, port } = await bindEphemeral()
    await new Promise<void>((resolve) => server.close(() => resolve()))
    expect(await isPortOpen("127.0.0.1", port, 200)).toBe(false)
  })
})
