import { MemberRepository } from '../repository/member-repository'

export class MemberService {
  constructor (connection) {
    this.repo = new MemberRepository(connection)
  }

  search (query) {
    return this.repo.search(query)
  }

  createMember (member) {
    return this.repo.createMember(member)
  }

  getMembers () {
    return this.repo.getMembers()
  }

  getMember (memberId) {
    return this.repo.getMember(memberId)
  }

  updateMember (member) {
    return this.repo.updateMember(member)
  }

  deleteMember (memberId) {
    return this.repo.deleteMember(memberId)
  }
}
