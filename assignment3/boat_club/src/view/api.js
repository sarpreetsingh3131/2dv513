export class API {
  constructor () {
    this.MEMBER_TABLE_HEADER = ['Name', 'Age', 'Gender', 'Boats', 'Action']
    this.BOAT_TABLE_HEADER = ['Manufacture Year', 'Length(m)', 'Type', 'Owner', 'Action']
    this.BOAT_TYPE_TABLE_HEADER = ['Type', 'Action']
    this.BASE_URL = 'http://localhost:3000/api/'
    this.MEMBER_END_POINT = 'members'
    this.BOAT_END_POINT = 'boats'
    this.GENDER_END_POINT = 'genders'
    this.BOAT_TYPE_END_POINT = 'boatTypes'
  }

  fetch (headers, endPoint) {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + endPoint)
        .then(res => { return res.json() })
        .then(data => {
          if (data.error) reject(new Error(data.error))
          switch (endPoint) {
            case this.BOAT_END_POINT:
              data = data.boats
              break
            case this.MEMBER_END_POINT:
              data = data.members
              break
            case this.BOAT_TYPE_END_POINT:
              data = data.boatTypes
              break
            case this.GENDER_END_POINT:
              data = data.genders
              break
            default:
              data = data.member || data.boat || data.boats || data.members
          }
          resolve({ tBody: data, tHead: headers, endPoint: endPoint, message: 'Fetched', color: 'green' })
        })
        .catch(err => reject(err))
    })
  }

  update (endPoint, data) {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + endPoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({ message: 'Updated', color: 'green' }))
        .catch(err => reject(err))
    })
  }

  delete (endPoint, id) {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + endPoint + '/' + id, { method: 'DELETE' })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({ messgae: data.message, color: 'green' }))
        .catch(err => reject(err))
    })
  }
}
