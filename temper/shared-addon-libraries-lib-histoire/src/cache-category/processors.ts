import { GuildHistoryCacheCategory } from "./class"

GuildHistoryCacheCategory.RegisterProcessor = function (this, processor) {
  this.saveData.lastProcessorRegisteredTime = GetTimeStamp()
  this.processors.set(processor, true)
}

GuildHistoryCacheCategory.UnregisterProcessor = function (this, processor) {
  this.processors.delete(processor)
}

GuildHistoryCacheCategory.GetProcessorInfo = function (this) {
  const names: string[] = []
  let legacyCount = 0
  for (const [processor] of pairs(this.processors)) {
    if (processor.GetAddonName != null) {
      names[names.length] = processor.GetAddonName()
    } else {
      legacyCount = legacyCount + 1
    }
  }
  return $multi(names, legacyCount, this.saveData.lastProcessorRegisteredTime)
}
