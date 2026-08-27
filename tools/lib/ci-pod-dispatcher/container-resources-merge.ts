type ResourceBlock = {
  requests?: { cpu?: string; memory?: string }
  limits?: { cpu?: string; memory?: string }
}

export function mergeContainerResources(
  defaults: ResourceBlock,
  override: ResourceBlock | undefined
): ResourceBlock {
  if (override === undefined) {
    return {
      ...(defaults.requests !== undefined && { requests: { ...defaults.requests } }),
      ...(defaults.limits !== undefined && { limits: { ...defaults.limits } }),
    }
  }

  const mergedRequests = {
    ...(defaults.requests ?? {}),
    ...(override.requests ?? {}),
  }
  const mergedLimits = {
    ...(defaults.limits ?? {}),
    ...(override.limits ?? {}),
  }

  const result: ResourceBlock = {}
  if (Object.keys(mergedRequests).length > 0) result.requests = mergedRequests
  if (Object.keys(mergedLimits).length > 0) result.limits = mergedLimits
  return result
}
