-- synthetic fixture — project #7209
-- Hand-authored to trigger the `debug` family of the banned-symbol scanner.
local info = debug.getinfo(1)
print(info.short_src)
debug.traceback()
