import { BoatTypeRepository } from '../repository/boat-type-repository'

export class BoatTypeService {
  constructor (connection) {
    this.repo = new BoatTypeRepository(connection)
  }

  createBoatType (boatType) {
    return this.repo.createBoatType(boatType)
  }

  getBoatTypes () {
    return this.repo.getBoatTypes()
  }
}
