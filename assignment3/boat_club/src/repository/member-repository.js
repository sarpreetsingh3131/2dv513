import { CREATE_MEMBER, GET_MEMBERS, GET_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from '../query/member-query'
import { GET_GENDER_ID } from '../query/gender-query'
import { MyError } from '../error/error'

export class MemberRepository {
  constructor (connection) {
    this.connection = connection
  }

  createMember (member) {
    return new Promise((resolve, reject) => {
      this.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(CREATE_MEMBER, { name: member.name, age: member.age, gender: genderId },
            (err, res) => {
              err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getMember(res.insertId))
            })
        })
      .catch(err => reject(err))
    })
  }

  getMembers () {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_MEMBERS, (err, res) => {
        err ? reject(new MyError('unable to get all members')) : resolve(res)
      })
    })
  }

  getMember (memberId) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_MEMBER, [memberId], (err, res) => {
        err || !res[0] ? reject(new MyError('not found', 404)) : resolve(res[0])
      })
    })
  }

  updateMember (member) {
    return new Promise((resolve, reject) => {
      this.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(UPDATE_MEMBER, [member.name, member.age, genderId, member.id], (err, res) => {
            console.log(res)
            err ? reject(new MyError(err.sqlMessage, 404)) : resolve(this.getMember(member.id))
          })
        })
    })
  }

  deleteMember (memberId) {
    return new Promise((resolve, reject) => {
      this.connection.query(DELETE_MEMBER, [memberId], (err, res) => {
        console.log(res)
        err || res.affectedRows === 0 ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }

  getGenderId (gender) {
    return new Promise((resolve, reject) => {
      this.connection.query(GET_GENDER_ID, [gender.toLowerCase()], (err, res) => {
        err || !res[0] ? reject(new MyError('invalid gender', 400)) : resolve(res[0].id)
      })
    })
  }
}
