export let MEMBER_TABLE_HEADER = ['Name', 'Age', 'Gender', 'Boats', 'Action']
export let BOAT_TABLE_HEADER = ['Manufacture Year', 'Length(m)', 'Type', 'Owner', 'Action']
export let BOAT_TYPE_TABLE_HEADER = ['Type', 'Action']
export let BASE_URL = 'http://localhost:3000/api/'
export let MEMBER_END_POINT = 'members'
export let BOAT_END_POINT = 'boats'
export let GENDER_END_POINT = 'genders'
export let BOAT_TYPE_END_POINT = 'boatTypes'
export let SEARCH_MEMBER_END_POINT = MEMBER_END_POINT + '/search'
export let SEARCH_BOAT_END_POINT = BOAT_END_POINT + '/search'

export class API {
  fetch (headers, endPoint, query = '') {
    return new Promise((resolve, reject) => {
      window.fetch(BASE_URL + endPoint + query)
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({
          tBody: data.member || data.members || data.boat || data.boats || data.boatTypes,
          tHead: headers,
          endPoint: (endPoint === MEMBER_END_POINT || endPoint === SEARCH_MEMBER_END_POINT) ? MEMBER_END_POINT : ((endPoint === BOAT_TYPE_END_POINT) ? BOAT_TYPE_END_POINT : BOAT_END_POINT),
          message: 'Fetched',
          color: 'green'
        }))
        .catch(err => reject(err))
    })
  }

  update (endPoint, data) {
    return new Promise((resolve, reject) => {
      window.fetch(BASE_URL + endPoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({
          message: 'Updated',
          color: 'green',
          data: data.member || data.boat || data.boatType
        }))
        .catch(err => reject(err))
    })
  }

  delete (endPoint, id) {
    return new Promise((resolve, reject) => {
      window.fetch(BASE_URL + endPoint + '/' + id, {
        method: 'DELETE'
      })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({
          messgae: 'Deleted',
          color: 'green'
        }))
        .catch(err => reject(err))
    })
  }
}
