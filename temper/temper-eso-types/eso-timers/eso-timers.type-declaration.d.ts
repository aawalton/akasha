declare function setTimeout(this: void, fn: (this: void) => void, ms: number): number

declare function setInterval(this: void, fn: (this: void) => void, ms: number): number

declare function clearTimeout(this: void, handle: number): undefined

declare function clearInterval(this: void, handle: number): undefined

declare function queueMicrotask(this: void, fn: (this: void) => void): undefined
