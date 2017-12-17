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
      app.use(BASE_URL, new MemberController(connection), new BoatController(connection),
        new BoatTypeController(connection), new GenderController(connection))

      app.use((request, response, next) => response.status(404).send({ error: 'not found' }))

      app.use((err, request, response, next) => {
        console.log('ERROR', err.stack)
        response.status(500).send({ error: 'internal server error' })
      })

      app.listen(port, () => console.log('server is running on http://localhost:' + port))
    })
    .catch(err => console.log(err.message))
