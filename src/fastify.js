const Fastify = require('fastify');

async function main() {
  const fastify = Fastify()

  await fastify.register(require('middie'))

  const globalPrefix = '/test'

  // /test/a
  // /a
  const path = '/'

  // /test/a
  // /
  // const path = '/(.*)'

  // http://127.0.0.1:3002/test/a
  fastify.use(globalPrefix + path, function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.url)
    next()
  })

  fastify.listen(3002)
}

main()