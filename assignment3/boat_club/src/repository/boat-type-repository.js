import { GET_BOAT_TYPES, GET_BOAT_TYPE_ID, CREATE_BOAT_TYPE, GET_BOAT_TYPE } from '../query/boat-type-query'
import { MyError } from '../error/error'

export class BoatTypeRepository {
  constructor (connection) {
    this.connection = connection
  }

  createBoatType (boatType) {
    return new Promise((resolve, reject) => {
      this.connection.query(CREATE_BOAT_TYPE, { type: boatType.type }, (err, res) => {
        err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getBoatType(res.insertId))
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
      this.connection.query(GET_BOAT_TYPE_ID, [boatType.toLowerCase()], (err, res) => {
        err || !res[0] ? reject(new MyError('invalid boat type', 400)) : resolve(res[0].id)
      })
    })
  }
}
