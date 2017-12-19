import express from 'express'

import { CREATE_BOAT, GET_BOATS, UPDATE_BOAT, DELETE_BOAT, SEARCH_BOATS } from '../api/api'
import { BoatService } from '../service/boat-service'

export class BoatController extends express.Router {
  constructor (connection) {
    super()
    this.service = new BoatService(connection)

    this.route(SEARCH_BOATS).get((req, res) => {
      this.service.search(req.query)
      .then(boats => res.status(200).send({ boats: boats }))
      .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(CREATE_BOAT).post((req, res) => {
      this.service.createBoat(req.body)
        .then(boat => res.status(201).send({ boat: boat }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_BOATS).get((req, res) => {
      this.service.getBoats()
        .then(boats => res.status(200).send({ boats: boats }))
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
