import { createServer } from 'node:http'
import { readPort } from './readPort.js'

const port = readPort(process.env.PORT)

const server = createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' })
  res.end(JSON.stringify({ ok: true, path: req.url }))
})

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})