import { GenderRepository } from '../repository/gender-repository'

export class GenderService {
  constructor (connection) {
    this.repo = new GenderRepository(connection)
  }

  getGenders () {
    return this.repo.getGenders()
  }
}
