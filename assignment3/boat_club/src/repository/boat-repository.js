import { MyError } from '../error/error'
import { CREATE_BOAT, GET_BOATS, GET_BOAT, UPDATE_BOAT, DELETE_BOAT, GET_BOATS_BY_MEMBER } from '../query/boat-query'
import { BoatTypeRepository } from './boat-type-repository'

export class BoatRepository {
  constructor (connection) {
    this.connection = connection
    this.boatTypeRepo = new BoatTypeRepository(connection)
  }

  createBoat (boat) {
    return new Promise((resolve, reject) => {
      this.boatTypeRepo.getBoatTypeId(boat.type)
        .then(boatTypeId => {
          this.connection.query(CREATE_BOAT, {
            year: boat.year, length: boat.length, member_id: boat.memberId, type_id: boatTypeId }, (err, res) => {
              err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getBoat(res.insertId))
            })
        })
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  getBoats (memberId) {
    return new Promise((resolve, reject) => {
      this.connection.query(memberId === undefined ? GET_BOATS : GET_BOATS_BY_MEMBER,
        [memberId === undefined ? '' : memberId], (err, res) => {
          err ? reject(new MyError('unable to get all boats')) : resolve(res)
        })
    })
  }

  getBoat (boatId) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_BOAT, [boatId], (err, res) => {
        err || !res[0] ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }

  updateBoat (boat) {
    return new Promise((resolve, reject) => {
      this.boatTypeRepo.getBoatTypeId(boat.type)
        .then(boatTypeId => {
          this.connection.query(UPDATE_BOAT, [boat.year, boat.length, boatTypeId, boat.id], (err, res) => {
            err ? reject(new MyError(err.sqlMessage, 404)) : resolve(this.getBoat(boat.id))
          })
        })
    })
  }

  deleteBoat (boatId) {
    return new Promise((resolve, reject) => {
      this.connection.query(DELETE_BOAT, [boatId], (err, res) => {
        err || res.affectedRows === 0 ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }
}
