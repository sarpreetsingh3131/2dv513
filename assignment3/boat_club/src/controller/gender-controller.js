import express from 'express'

import { GenderService } from '../service/gender-service'
import { GET_GENDERS } from '../api/api'

export class GenderController extends express.Router {
  constructor (connection) {
    super()
    this.service = new GenderService(connection)

    this.route(GET_GENDERS).get((req, res) => {
      this.service.getGenders()
        .then(genders => res.status(200).send({ genders: genders }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })
  }
}
