import type {
  RollingAverageClass,
  RollingAverageInstance,
} from "../map-ping-types/map-ping-types.module.code.ts"

const RollingAverage = ZO_Object.Subclass<RollingAverageClass>()

RollingAverage.New = function (this: RollingAverageClass, timeframe: number, resolution: number) {
  const obj = ZO_Object.New<RollingAverageInstance>(this)
  obj.Initialize(timeframe, resolution)
  return obj
}

RollingAverage.Initialize = function (
  this: RollingAverageInstance,
  timeframe: number,
  resolution: number
): undefined {
  this.timeframe = timeframe
  this.resolution = resolution
  this.count = timeframe * resolution
  this.sumList = {}
  this.lastIndex = this.GetCurrentIndex()

  for (let i = 1; i <= this.count; i = i + 1) {
    this.sumList[i] = 0
  }
}

RollingAverage.GetCurrentIndex = function (this: RollingAverageInstance): number {
  return math.floor((this.resolution * GetGameTimeMilliseconds()) / 1000) % this.count
}

RollingAverage.Increment = function (this: RollingAverageInstance): undefined {
  const index = this.GetCurrentIndex()
  while (this.lastIndex !== index) {
    this.lastIndex = (this.lastIndex + 1) % this.count
    this.sumList[this.lastIndex] = 0
  }
  this.sumList[index] = (this.sumList[index] ?? 0) + 1
}

RollingAverage.GetAverage = function (this: RollingAverageInstance): number {
  const index = this.GetCurrentIndex()
  let average = 0
  for (let i = 1; i <= this.count; i = i + 1) {
    if (i !== index) {
      average = average + (this.sumList[i] ?? 0)
    }
  }
  return math.floor((average / (this.count - 1)) * this.resolution)
}

export { RollingAverage }
