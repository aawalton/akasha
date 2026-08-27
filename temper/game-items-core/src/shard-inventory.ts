export const MAX_CHUNK_BYTES = 900_000

export function shardInventoryJson(json: string): readonly string[] {
  if (json.length <= MAX_CHUNK_BYTES) return [json]
  const chunks: string[] = []
  for (let i = 0; i < json.length; i += MAX_CHUNK_BYTES) {
    chunks.push(json.slice(i, i + MAX_CHUNK_BYTES))
  }
  return chunks
}
