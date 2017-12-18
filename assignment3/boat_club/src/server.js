import express from 'express'
import bodyParser from 'body-parser'

import { DB } from './db/db'
import { BASE_URL } from './api/api'
import { MemberController } from './controller/member-controller'
import { BoatController } from './controller/boat-controller'
import { BoatTypeController } from './controller/boat-type-controller'
import { GenderController } from './controller/gender-controller'

new DB().connect()
    .then(connection => {
      let app = express()
      let port = 3000

      app.use(bodyParser.json())

      app.use((req, res, next) => {
        res.type('json')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        next()
      })

      app.use(BASE_URL, new MemberController(connection), new BoatController(connection),
        new BoatTypeController(connection), new GenderController(connection))

      app.use((request, response, next) => response.status(404).send({ error: 'url not found' }))

      app.use((err, request, response, next) => {
        console.log('ERROR', err.stack)
        response.status(500).send({ error: 'internal server error' })
      })

      app.listen(port, () => console.log('server is running on http://localhost:' + port))
    })
    .catch(err => console.log(err.message))
