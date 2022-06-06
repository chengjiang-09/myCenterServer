import Redis from 'ioredis'

let redisDB = null

const getRedisConnection = () => {

    if (!redisDB) {
        const redis_port = 6379
        const redis_host = '127.0.0.1'

        redisDB = new Redis({
            port: redis_port,
            host: redis_host,
            db: 0
        })
    }

    return redisDB
}

export default getRedisConnection