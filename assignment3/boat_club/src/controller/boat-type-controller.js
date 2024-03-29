import express from 'express'

import { BoatTypeService } from '../service/boat-type-service'
import { GET_BOAT_TYPES, CREATE_BOAT_TYPE, UPDATE_BOAT_TYPE, DELETE_BOAT_TYPE } from '../api/api'

export class BoatTypeController extends express.Router {
  constructor (connection) {
    super()
    this.service = new BoatTypeService(connection)

    this.route(CREATE_BOAT_TYPE).post((req, res) => {
      this.service.createBoatType(req.body)
        .then(boatType => res.status(201).send({ boatType: boatType }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_BOAT_TYPES).get((req, res) => {
      this.service.getBoatTypes()
        .then(boatTypes => res.status(200).send({ boatTypes: boatTypes }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(UPDATE_BOAT_TYPE).put((req, res) => {
      this.service.updateBoatType(req.body)
      .then(boatType => res.status(200).send({ boatType: boatType }))
      .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(DELETE_BOAT_TYPE).delete((req, res) => {
      this.service.deleteBoatType(req.params.boatTypeId)
        .then(boatType => res.status(200).send({ message: 'deleted Successfully' }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })
  }
}
