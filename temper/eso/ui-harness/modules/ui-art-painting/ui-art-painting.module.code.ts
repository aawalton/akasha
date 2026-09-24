export async function paintArt(): Promise<number> {
  await document.fonts.ready
  const whole = 255
  const segments = 8
  const quarter = Math.PI / 2
  const rgbLength = 3
  const loaded = new Map<string, Promise<HTMLImageElement | null>>()
  function image(src: string | undefined): Promise<HTMLImageElement | null> {
    if (src === undefined || src === "") return Promise.resolve(null)
    const held = loaded.get(src)
    if (held !== undefined) return held
    const made = new Image()
    made.src = src
    const waited = made.decode().then(
      () => made,
      () => null
    )
    loaded.set(src, waited)
    return waited
  }
  function numbers(text: string | undefined): readonly number[] {
    return text === undefined || text === "" ? [] : text.split(",").map(Number)
  }
  function rgb(tint: readonly number[]): string {
    const [red = 1, green = 1, blue = 1] = tint
    return `rgb(${red * whole}, ${green * whole}, ${blue * whole})`
  }
  function tinted(
    from: HTMLImageElement,
    part: readonly number[],
    width: number,
    height: number,
    tint: readonly number[]
  ): HTMLCanvasElement {
    const [fromX = 0, fromY = 0, fromWidth = 1, fromHeight = 1] = part
    const made = document.createElement("canvas")
    made.width = Math.max(1, Math.round(width))
    made.height = Math.max(1, Math.round(height))
    const pen = made.getContext("2d")
    if (pen === null) return made
    const copy = (): undefined => {
      pen.drawImage(from, fromX, fromY, fromWidth, fromHeight, 0, 0, made.width, made.height)
      return undefined
    }
    copy()
    if (tint.length >= rgbLength) {
      pen.globalCompositeOperation = "multiply"
      pen.fillStyle = rgb(tint)
      pen.fillRect(0, 0, made.width, made.height)
      pen.globalCompositeOperation = "destination-in"
      copy()
    }
    return made
  }
  async function texture(
    one: HTMLCanvasElement,
    pen: CanvasRenderingContext2D
  ): Promise<undefined> {
    const source = await image(one.dataset.src)
    if (source === null) return undefined
    const [left = 0, right = 1, top = 0, bottom = 1] = numbers(one.dataset.coords)
    const tint = numbers(one.dataset.tint)
    const wide = source.naturalWidth
    const tall = source.naturalHeight
    const part = [
      Math.min(left, right) * wide,
      Math.min(top, bottom) * tall,
      Math.max(Math.abs(right - left) * wide, 1),
      Math.max(Math.abs(bottom - top) * tall, 1),
    ]
    const painted = tinted(source, part, one.width, one.height, tint)
    pen.save()
    pen.translate(right < left ? one.width : 0, bottom < top ? one.height : 0)
    pen.scale(right < left ? -1 : 1, bottom < top ? -1 : 1)
    pen.globalAlpha = tint[rgbLength] ?? 1
    pen.drawImage(painted, 0, 0, one.width, one.height)
    pen.restore()
    return undefined
  }
  function placed(
    pen: CanvasRenderingContext2D,
    piece: HTMLCanvasElement,
    at: readonly [number, number],
    size: number,
    turned: boolean
  ): undefined {
    const [across, down] = at
    if (!turned) {
      pen.drawImage(piece, across, down, size, size)
      return undefined
    }
    pen.save()
    pen.translate(across + size, down)
    pen.rotate(quarter)
    pen.drawImage(piece, 0, 0, size, size)
    pen.restore()
    return undefined
  }
  function run(
    pen: CanvasRenderingContext2D,
    piece: HTMLCanvasElement | undefined,
    box: readonly [number, number, number, number],
    size: number,
    turned: boolean
  ): undefined {
    const [across, down, width, height] = box
    if (piece === undefined || width <= 0 || height <= 0) return undefined
    pen.save()
    pen.beginPath()
    pen.rect(across, down, width, height)
    pen.clip()
    const reach = turned ? width : height
    for (let step = 0; step < reach; step += size) {
      placed(pen, piece, turned ? [across + step, down] : [across, down + step], size, turned)
    }
    pen.restore()
    return undefined
  }
  async function middle(one: HTMLCanvasElement, pen: CanvasRenderingContext2D): Promise<undefined> {
    const tint = numbers(one.dataset.centerTint)
    const [inLeft = 0, inTop = 0, inRight = 0, inBottom = 0] = numbers(one.dataset.insets)
    const box = [
      inLeft,
      inTop,
      one.width - inLeft + inRight,
      one.height - inTop + inBottom,
    ] as const
    const center = await image(one.dataset.center)
    pen.save()
    pen.globalAlpha = tint[rgbLength] ?? 1
    if (center !== null) {
      const all = [0, 0, center.naturalWidth, center.naturalHeight]
      const piece = tinted(center, all, center.naturalWidth, center.naturalHeight, tint)
      pen.fillStyle = pen.createPattern(piece, "repeat") ?? "transparent"
      pen.fillRect(...box)
    } else if (tint.length >= rgbLength) {
      pen.fillStyle = rgb(tint)
      pen.fillRect(...box)
    }
    pen.restore()
    return undefined
  }
  async function backdrop(
    one: HTMLCanvasElement,
    pen: CanvasRenderingContext2D
  ): Promise<undefined> {
    await middle(one, pen)
    const edge = await image(one.dataset.edge)
    if (edge === null) return undefined
    const tint = numbers(one.dataset.edgeTint)
    const size = Number(one.dataset.size) > 0 ? Number(one.dataset.size) : edge.naturalHeight
    const segment = edge.naturalWidth / segments
    const pieces = [...Array(segments).keys()].map((at) =>
      tinted(edge, [at * segment, 0, segment, edge.naturalHeight], size, size, tint)
    )
    const [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight] = pieces
    const wide = one.width
    const tall = one.height
    pen.save()
    pen.globalAlpha = tint[rgbLength] ?? 1
    run(pen, left, [0, size, size, tall - 2 * size], size, false)
    run(pen, right, [wide - size, size, size, tall - 2 * size], size, false)
    run(pen, top, [size, 0, wide - 2 * size, size], size, true)
    run(pen, bottom, [size, tall - size, wide - 2 * size, size], size, true)
    run(pen, topLeft, [0, 0, size, size], size, false)
    run(pen, topRight, [wide - size, 0, size, size], size, false)
    run(pen, bottomLeft, [0, tall - size, size, size], size, false)
    run(pen, bottomRight, [wide - size, tall - size, size, size], size, false)
    pen.restore()
    return undefined
  }
  const canvases = [...document.querySelectorAll("canvas")].filter(
    (one) => one.dataset.art !== undefined
  )
  for (const one of canvases) {
    const pen = one.getContext("2d")
    if (pen === null) continue
    if (one.dataset.art === "backdrop") await backdrop(one, pen)
    else await texture(one, pen)
  }
  return canvases.length
}
