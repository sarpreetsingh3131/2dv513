export class API {
  constructor () {
    this.MEMBER_TABLE_HEADER = ['Name', 'Age', 'Gender', 'Boats', 'Action']
    this.BOAT_TABLE_HEADER = ['Manufacture Year', 'Length(m)', 'Type', 'Owner', 'Action']
    this.BASE_URL = 'http://localhost:3000/api/'
    this.MEMBER_END_POINT = 'members'
    this.BOAT_END_POINT = 'boats'
    this.GENDER_END_POINT = 'genders'
    this.BOAT_TYPE_END_POINT = 'boatTypes'
  }

  fetchGenders () {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + this.GENDER_END_POINT)
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve(data.genders))
        .catch(err => reject(err))
    })
  }

  fetchBoatTypes () {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + this.BOAT_TYPE_END_POINT)
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve(data.boatTypes))
        .catch(err => reject(err))
    })
  }

  fetch (headers, endPoint) {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + endPoint)
        .then(res => { return res.json() })
        .then(data => {
          if (data.error) reject(new Error(data.error))
          data = endPoint === this.MEMBER_END_POINT ? data.members : data.boats
          resolve({ tBody: data, tHead: headers, endPoint: endPoint, message: 'Fetched Successfully' })
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
        .then(data => data.error ? reject(new Error(data.error)) : resolve(endPoint === this.BOAT_END_POINT ? data.boat : data.member))
        .catch(err => reject(err))
    })
  }

  delete (endPoint, id) {
    return new Promise((resolve, reject) => {
      window.fetch(this.BASE_URL + endPoint + '/' + id, { method: 'DELETE' })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve(data.message))
        .catch(err => reject(err))
    })
  }
}
