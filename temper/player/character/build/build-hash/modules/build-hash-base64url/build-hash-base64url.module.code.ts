export function bytesToBase64url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  const base64 = btoa(binary)

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export function base64urlToBytes(str: string): Uint8Array | null {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/")

    const padding = base64.length % 4
    if (padding === 2) {
      base64 += "=="
    } else if (padding === 3) {
      base64 += "="
    }

    const binary = atob(base64)

    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    return bytes
  } catch {
    return null
  }
}
