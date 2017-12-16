import express from 'express'

import { CREATE_MEMBER, GET_MEMBERS, GET_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from '../api/api'
import { MemberService } from '../service/member-service'

export class MemberController extends express.Router {
  constructor (connection) {
    super()
    this.service = new MemberService(connection)

    this.route(CREATE_MEMBER).post((req, res) => {
      this.service.createMember(req.body)
        .then(member => res.status(201).send({ member: member }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_MEMBERS).get((req, res) => {
      this.service.getMembers()
        .then(members => res.status(200).send({ members: members }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(GET_MEMBER).get((req, res) => {
      this.service.getMember(req.params.memberId)
        .then(member => res.status(200).send({ member: member }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(UPDATE_MEMBER).put((req, res) => {
      this.service.updateMember(req.body)
        .then(member => res.status(200).send({ member: member }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })

    this.route(DELETE_MEMBER).delete((req, res) => {
      this.service.deleteMember(req.params.memberId)
        .then(member => res.status(200).send({ message: 'deleted successfully' }))
        .catch(err => res.status(err.status || 500).send({ error: err.message }))
    })
  }
}
