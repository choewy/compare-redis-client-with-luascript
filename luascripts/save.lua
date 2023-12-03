local key = ARGV[1]
local value = ARGV[2]

redis.call("SET", key, cjson.encode(value))

if not key then
  return nil
end

local value = redis.call("GET", key)

if not value then
  return nil
end

return cjson.decode(value)
