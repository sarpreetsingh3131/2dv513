import { BoatRepository } from '../repository/boat-repository'

export class BoatService {
  constructor (connection) {
    this.repo = new BoatRepository(connection)
  }

  search (query) {
    return this.repo.search(query)
  }

  createBoat (boat) {
    return this.repo.createBoat(boat)
  }

  getBoats (memberId) {
    return this.repo.getBoats(memberId)
  }

  /* getBoat (boatId) {
    return this.repo.getBoat(boatId)
  }
  */

  updateBoat (boat) {
    return this.repo.updateBoat(boat)
  }

  deleteBoat (boatId) {
    return this.repo.deleteBoat(boatId)
  }
}
