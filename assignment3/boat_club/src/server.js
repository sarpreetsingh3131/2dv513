import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

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
      app.use(express.static(path.resolve(__dirname, 'public')))

      app.use(BASE_URL,
        new MemberController(connection),
        new BoatController(connection),
        new BoatTypeController(connection),
        new GenderController(connection)
      )

      app.use((request, response, next) => response.status(404).send({ error: 'url not found' }))

      app.use((err, req, res, next) => res.status(500).send({ error: 'internal server error\n' + err.message }))

      app.listen(port, () => console.log('app is running on http://localhost:' + port))
    })
    .catch(err => console.log(err.message))
