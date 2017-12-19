import { MyError } from '../error/error'
import {
  CREATE_BOAT, GET_BOATS, GET_BOAT, UPDATE_BOAT, DELETE_BOAT, SEARCH_BOATS_BY_MEMBER, SEARCH_BOATS_BY_TYPE, SEARCH_BOATS_BY_LENGTH_EQUALS_TO, SEARCH_BOATS_BY_LENGTH_SMALLER_THAN, SEARCH_BOATS_BY_LENGTH_GREATER_THAN, SEARCH_BOATS_BY_MANF_YEAR_EQUALS_TO, SEARCH_BOATS_BY_MANF_YEAR_GREATER_THAN, SEARCH_BOATS_BY_MANF_YEAR_SMALLER_THAN
} from '../query/boat-query'
import { BoatTypeRepository } from './boat-type-repository'

export class BoatRepository {
  constructor (connection) {
    this.connection = connection
    this.boatTypeRepo = new BoatTypeRepository(connection)
  }

  getQueryAndValue (query) {
    return new Promise((resolve, reject) => {
      if (query.memberId) {
        resolve({
          query: SEARCH_BOATS_BY_MEMBER,
          value: query.memberId
        })
      }
      if (query.type) {
        this.boatTypeRepo.getBoatTypeId(query.type)
          .then(typeId => resolve({
            query: SEARCH_BOATS_BY_TYPE,
            value: typeId
          }))
          .catch(err => reject(err))
      }
      if (query.length) {
        resolve({
          query: query.operator === 'equals' ? SEARCH_BOATS_BY_LENGTH_EQUALS_TO
            : (query.operator === 'greater' ? SEARCH_BOATS_BY_LENGTH_GREATER_THAN
              : SEARCH_BOATS_BY_LENGTH_SMALLER_THAN),
          value: query.length
        })
      }
      if (query.manfYear) {
        resolve({
          query: query.operator === 'equals' ? SEARCH_BOATS_BY_MANF_YEAR_EQUALS_TO
            : (query.operator === 'greater' ? SEARCH_BOATS_BY_MANF_YEAR_GREATER_THAN
              : SEARCH_BOATS_BY_MANF_YEAR_SMALLER_THAN),
          value: query.manfYear
        })
      }
    })
  }

  search (query) {
    return new Promise((resolve, reject) => {
      this.getQueryAndValue(query)
        .then(res => {
          this.connection.query(res.query, [res.value], (err, res) => {
            err ? reject(new MyError('not found', 404)) : resolve(res)
          })
        })
      .catch(err => reject(err))
    })
  }

  createBoat (boat) {
    return new Promise((resolve, reject) => {
      this.boatTypeRepo.getBoatTypeId(boat.type)
        .then(boatTypeId => {
          this.connection.query(CREATE_BOAT, {
            year: boat.year,
            length: boat.length,
            member_id: boat.memberId,
            type_id: boatTypeId
          }, (err, res) => {
            err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getBoat(res.insertId))
          })
        })
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  getBoats () {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_BOATS, (err, res) => {
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
          this.connection.query(UPDATE_BOAT, [
            boat.year,
            boat.length,
            boatTypeId,
            boat.id
          ], (err, res) => {
            err ? reject(new MyError(err.sqlMessage, 404)) : resolve(this.getBoat(boat.id))
          })
        })
      .catch(err => reject(err))
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
