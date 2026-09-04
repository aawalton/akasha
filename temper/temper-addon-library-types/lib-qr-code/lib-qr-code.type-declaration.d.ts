interface LibQRCodeApi {
  DrawQRCode: (control: object, text: string) => unknown
}

declare const LibQRCode: LibQRCodeApi | undefined
