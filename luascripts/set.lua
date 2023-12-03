local key = ARGV[1]
local value = ARGV[2]

redis.call("SET", key, cjson.encode(value))
