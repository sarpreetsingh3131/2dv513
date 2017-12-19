import { GET_GENDER_ID, GET_GENDERS } from '../query/gender-query'
import { MyError } from '../error/error'

export class GenderRepository {
  constructor (connection) {
    this.connection = connection
  }

  getGenders () {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_GENDERS, (err, res) => {
        err ? reject(new MyError('unable to fetch all genders')) : resolve(res)
      })
    })
  }

  getGenderId (gender) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_GENDER_ID, [gender], (err, res) => {
        err || !res[0] ? reject(new MyError('invalid gender', 400)) : resolve(res[0].id)
      })
    })
  }
}
