-- synthetic fixture — project #7209
-- Hand-authored to trigger the `dofile` and `loadfile` families of the banned-symbol scanner.
dofile("foo.lua")
loadfile("bar.lua")
