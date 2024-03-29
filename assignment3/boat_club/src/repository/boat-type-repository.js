import { GET_BOAT_TYPES, GET_BOAT_TYPE_ID, CREATE_BOAT_TYPE, GET_BOAT_TYPE, UPDATE_BOAT_TYPE, DELETE_BOAT_TYPE } from '../query/boat-type-query'
import { MyError } from '../error/error'

export class BoatTypeRepository {
  constructor (connection) {
    this.connection = connection
  }

  validateType (type) {
    type = type.toLowerCase().trim()
    if (type.length < 2) throw new MyError('type must be at least 2 characters', 400)
    let whiteSpaces = 0
    for (let i = 0; i < type.length; i++) {
      if (type.charAt(i) === ' ') whiteSpaces++
      else if (type.charCodeAt(i) < 97 || type.charCodeAt(i) > 122 || whiteSpaces > 2) {
        throw new MyError('inavlid type', 400)
      }
    }
  }

  createBoatType (boatType) {
    return new Promise((resolve, reject) => {
      this.validateType(boatType.type)
      this.connection.query(CREATE_BOAT_TYPE, { type: boatType.type }, (err, res) => {
        err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getBoatType(res.insertId))
      })
    })
  }

  deleteBoatType (boatTypeId) {
    return new Promise((resolve, reject) => {
      this.connection.query(DELETE_BOAT_TYPE, [boatTypeId], (err, res) => {
        err || res.affectedRows === 0 ? reject(new MyError(err.sqlMessage || 'not found', 404)) : resolve(res)
      })
    })
  }

  updateBoatType (boatType) {
    return new Promise((resolve, reject) => {
      this.validateType(boatType.type)
      this.connection.query(UPDATE_BOAT_TYPE, [
        boatType.type,
        boatType.id
      ], (err, res) => {
        err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getBoatType(boatType.id))
      })
    })
  }

  getBoatTypes () {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_BOAT_TYPES, (err, res) => {
        err ? reject(new MyError('unable to get all boat types')) : resolve(res)
      })
    })
  }

  getBoatType (boatTypeId) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_BOAT_TYPE, [boatTypeId], (err, res) => {
        err || !res[0] ? reject(new MyError('not found'), 404) : resolve(res[0])
      })
    })
  }

  getBoatTypeId (boatType) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_BOAT_TYPE_ID, [boatType], (err, res) => {
        err || !res[0] ? reject(new MyError('invalid boat type', 400)) : resolve(res[0].id)
      })
    })
  }
}
