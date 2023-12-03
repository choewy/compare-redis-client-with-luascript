local key = ARGV[1]

if not key then
  return nil
end

local value = redis.call("GET", key)

if not value then
  return nil
end

return cjson.decode(value)