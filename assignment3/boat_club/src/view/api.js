export const MEMBER_TABLE_HEADER = ['ID', 'Name', 'Age', 'Gender', 'Boats', 'Action']
export const BOAT_TABLE_HEADER = ['ID', 'Manufacture Year', 'Length (ft)', 'Type', 'Owner', 'Action']
export const BOAT_TYPE_TABLE_HEADER = ['ID', 'Type', 'Action']
export const BASE_URL = 'http://localhost:3000/api/'
export const MEMBER_END_POINT = 'members'
export const BOAT_END_POINT = 'boats'
export const GENDER_END_POINT = 'genders'
export const BOAT_TYPE_END_POINT = 'boatTypes'
export const SEARCH_MEMBER_END_POINT = MEMBER_END_POINT + '/search'
export const SEARCH_BOAT_END_POINT = BOAT_END_POINT + '/search'

export class API {
  fetch (headers, endPoint, query = '') {
    return new Promise((resolve, reject) => {
      window.fetch(BASE_URL + endPoint + query)
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({
          tBody: data.member || data.members || data.boat || data.boats || data.boatTypes || data.genders,
          tHead: headers,
          endPoint: (endPoint === MEMBER_END_POINT || endPoint === SEARCH_MEMBER_END_POINT) ? MEMBER_END_POINT : ((endPoint === BOAT_TYPE_END_POINT) ? BOAT_TYPE_END_POINT : BOAT_END_POINT),
          message: 'Fetched',
          color: 'green'
        }))
        .catch(err => reject(err))
    })
  }

  postData (endPoint, data, method) {
    return new Promise((resolve, reject) => {
      window.fetch(BASE_URL + endPoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => { return res.json() })
        .then(data => data.error ? reject(new Error(data.error)) : resolve({
          message: method === 'POST' ? 'Added' : 'Updated',
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
          message: 'Deleted',
          color: 'green'
        }))
        .catch(err => reject(err))
    })
  }
}
