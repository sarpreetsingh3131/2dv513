import { CREATE_MEMBER, GET_MEMBERS, UPDATE_MEMBER, DELETE_MEMBER, SEARCH_MEMBERS_BY_ID, SEARCH_MEMBERS_BY_GENDER, SEARCH_MEMBERS_BY_AGE_EQUALS_TO, SEARCH_MEMBERS_BY_AGE_GREATER_THAN, SEARCH_MEMBERS_BY_AGE_SMALLER_THAN, SEARCH_MEMBERS_BY_NAME } from '../query/member-query'
import { MyError } from '../error/error'
import { GenderRepository } from './gender-repository'

export class MemberRepository {
  constructor (connection) {
    this.connection = connection
    this.genderRepo = new GenderRepository(connection)
  }

  validateName (name) {
    name = name.toLowerCase().trim()
    if (name.length < 2) throw new MyError('name must be at least 2 characters', 400)
    let whiteSpaces = 0
    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') whiteSpaces++
      else if (name.charCodeAt(i) < 97 || name.charCodeAt(i) > 122 || whiteSpaces > 2) {
        throw new MyError('inavlid name', 400)
      }
    }
  }

  getQueryAndValue (query) {
    return new Promise((resolve, reject) => {
      if (query.gender) {
        this.genderRepo.getGenderId(query.gender)
          .then(genderId => resolve({
            query: SEARCH_MEMBERS_BY_GENDER,
            value: genderId
          }))
          .catch(err => reject(err))
      }
      if (query.age) {
        resolve({
          query: query.operator === 'equals' ? SEARCH_MEMBERS_BY_AGE_EQUALS_TO
            : (query.operator === 'greater' ? SEARCH_MEMBERS_BY_AGE_GREATER_THAN
              : SEARCH_MEMBERS_BY_AGE_SMALLER_THAN),
          value: query.age
        })
      }
      if (query.name) {
        resolve({
          query: SEARCH_MEMBERS_BY_NAME,
          value: '%' + query.name + '%'
        })
      }
    })
  }

  search (query) {
    if (query.memberId) return this.getMember(query.memberId)
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

  createMember (member) {
    return new Promise((resolve, reject) => {
      this.validateName(member.name)
      this.genderRepo.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(CREATE_MEMBER, {
            name: member.name.trim(),
            age: member.age,
            gender: genderId
          },
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
      this.connection.query(SEARCH_MEMBERS_BY_ID, [memberId], (err, res) => {
        err || !res[0] ? reject(new MyError('not found', 404)) : resolve(res)
      })
    })
  }

  updateMember (member) {
    return new Promise((resolve, reject) => {
      this.validateName(member.name)
      this.genderRepo.getGenderId(member.gender)
        .then(genderId => {
          this.connection.query(UPDATE_MEMBER, [
            member.name.trim(),
            member.age,
            genderId,
            member.id
          ], (err, res) => {
            err ? reject(new MyError(err.sqlMessage, 404)) : resolve(this.getMember(member.id))
          })
        })
      .catch(err => reject(err))
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
