import { BoatRepository } from '../repository/boat-repository'

export class BoatService {
  constructor (connection) {
    this.repo = new BoatRepository(connection)
  }

  createBoat (boat) {
    return this.repo.createBoat(boat)
  }

  getBoats () {
    return this.repo.getBoats()
  }

  getBoat (boatId) {
    return this.repo.getBoat(boatId)
  }

  updateBoat (boat) {
    return this.repo.updateBoat(boat)
  }

  deleteBoat (boatId) {
    return this.repo.deleteBoat(boatId)
  }
}