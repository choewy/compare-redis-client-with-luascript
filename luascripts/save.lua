local key = ARGV[1]
local value = ARGV[2]

if not key then
  return nil
end

if not value then
  return nil
end

redis.call("SET", key, value)

local result = redis.call("GET", key)

if not result then
  return nil
end

return cjson.encode(cjson.decode(result))
