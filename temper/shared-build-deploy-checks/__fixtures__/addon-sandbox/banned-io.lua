-- synthetic fixture — project #7209
-- Hand-authored to trigger the `io` family of the banned-symbol scanner.
local f = io.open("foo.txt", "r")
local line = io.read("*l")
io.close(f)
