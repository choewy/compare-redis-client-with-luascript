local key = ARGV[1]
local value = ARGV[2]

if not key then
  return nil
end

if not value then
  return nil
end


redis.call("SET", key, value)