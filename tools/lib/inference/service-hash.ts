import { hashFiles } from "@akasha/workflow-language/inputs-hash"

const encoder = new TextEncoder()

export function foldServiceManifest(
  filesHash: string,
  service: {
    readonly command: readonly string[]
    readonly port: number
    readonly workdir: string
  }
) {
  const manifest = JSON.stringify({
    command: service.command,
    port: service.port,
    workdir: service.workdir,
  })
  return hashFiles([
    { path: "\u0000files-hash", bytes: encoder.encode(filesHash) },
    { path: "\u0000service-manifest", bytes: encoder.encode(manifest) },
  ])
}
