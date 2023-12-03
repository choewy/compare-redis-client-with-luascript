local key = ARGV[1]

if not key then
  return nil
end

local result = redis.call("GET", key)

if not result then
  return nil
end

return cjson.encode(cjson.decode(result))