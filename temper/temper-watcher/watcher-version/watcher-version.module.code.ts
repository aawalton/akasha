declare const __WATCHER_VERSION__: string

export const WATCHER_VERSION =
  typeof __WATCHER_VERSION__ !== "undefined" ? __WATCHER_VERSION__ : "dev"
