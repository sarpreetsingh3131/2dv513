import { CREATE_MEMBER, GET_MEMBERS, GET_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from '../query/member-query'
import { MyError } from '../error/error'
import { GenderRepository } from './gender-repository'

export class MemberRepository {
  constructor (connection) {
    this.connection = connection
    this.genderRepo = new GenderRepository(connection)
  }

  createMember (member) {
    return new Promise((resolve, reject) => {
      this.genderRepo.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(CREATE_MEMBER, { name: member.name, age: member.age, gender: genderId },
            (err, res) => {
              err ? reject(new MyError(err.sqlMessage, 400)) : resolve(this.getMember(res.insertId))
            })
        })
      .catch(err => reject(new MyError(err.message, 400)))
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
        err || !res[0] ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }

  updateMember (member) {
    return new Promise((resolve, reject) => {
      this.genderRepo.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(UPDATE_MEMBER, [member.name, member.age, genderId, member.id], (err, res) => {
            err ? reject(new MyError(err.sqlMessage, 404)) : resolve(this.getMember(member.id))
          })
        })
    })
  }

  deleteMember (memberId) {
    return new Promise((resolve, reject) => {
      this.connection.query(DELETE_MEMBER, [memberId], (err, res) => {
        err || res.affectedRows === 0 ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }
}
