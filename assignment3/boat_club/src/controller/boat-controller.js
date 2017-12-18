import express from 'express'

import { CREATE_BOAT, GET_BOATS, GET_BOAT, UPDATE_BOAT, DELETE_BOAT } from '../api/api'
import { BoatService } from '../service/boat-service'

export class BoatController extends express.Router {
  constructor (connection) {
    super()
    this.service = new BoatService(connection)

    this.route(CREATE_BOAT).post((req, res) => {
      this.service.createBoat(req.body)
        .then(boat => res.status(201).send({ boat: boat }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_BOATS).get((req, res) => {
      this.service.getBoats(req.query.memberId)
        .then(boats => res.status(200).send({ boats: boats }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_BOAT).get((req, res) => {
      this.service.getBoat(req.params.boatId)
        .then(boat => res.status(200).send({ boat: boat }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(UPDATE_BOAT).put((req, res) => {
      this.service.updateBoat(req.body)
        .then(boat => res.status(200).send({ boat: boat }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(DELETE_BOAT).delete((req, res) => {
      this.service.deleteBoat(req.params.boatId)
        .then(boat => res.status(200).send({ message: 'deleted successfully' }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })
  }
}
