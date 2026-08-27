export const meaning = (node: unknown): unknown => {
  if (Array.isArray(node)) return node.map(meaning)
  if (node === null || typeof node !== "object") return node
  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => key !== "span")
      .map(([key, value]) => [key, meaning(value)])
  )
}
