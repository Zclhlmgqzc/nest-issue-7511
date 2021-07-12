const express = require('express')
const app = express()

const globalPrefix = '/test'

// /test/a
// /a
const path = '/'

// /test/a
// /
// const path = '*'

// http://127.0.0.1:3001/test/a
app.use(globalPrefix + path, function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.url)
    next()
})

app.listen(3001)