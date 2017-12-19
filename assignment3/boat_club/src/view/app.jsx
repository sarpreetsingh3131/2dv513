import React from 'react'
import { render } from 'react-dom'

import { Table } from './components/table.jsx'
import { Sidebar } from './components/sidebar.jsx'
import { API, GENDER_END_POINT, BOAT_TYPE_END_POINT } from './api'

export const MEMBER_NAME = 'MEMBER_NAME'
export const MEMBER_AGE = 'MEMBER_AGE'
export const MEMBER_GENDER = 'MEMBER_GENDER'
export const BOAT_YEAR = 'BOAT_YEAR'
export const BOAT_LENGTH = 'BOAT_LENGTH'
export const BOAT_TYPE = 'BOAT_TYPE'
export const BOAT_TYPE_TYPE = 'BOAT_TYPE_TYPE'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      tBody: [],
      tHead: [],
      genders: [],
      boatTypes: [],
      endPoint: '',
      message: '',
      color: ''
    }
    this.api = new API()
  }

  render () {
    return (
      <div>
        {this.state.message === '' ? null : <div className={'ui message ' + this.state.color}>{this.state.message}</div>}
        <Sidebar fetch={this.fetch.bind(this)} />
        <Table values={this.state} handleEditing={this.handleEditing.bind(this)}
          fetch={this.fetch.bind(this)} delete={this.delete.bind(this)} update={this.update.bind(this)} />
      </div>
    )
  }

  componentDidMount () {
    Promise.all([this.api.fetch([], BOAT_TYPE_END_POINT), this.api.fetch([], GENDER_END_POINT)])
      .then(res => this.setState({ boatTypes: res[0].tBody, genders: res[1].tBody }))
      .catch(err => this.handleResult({ message: err.message, color: 'red' }))
  }

  handleResult (res) {
    this.setState({
      tBody: res.tBody || this.state.tBody,
      tHead: res.tHead || this.state.tHead,
      endPoint: res.endPoint || this.state.endPoint,
      message: res.message,
      color: res.color
    })
    window.setTimeout(() => this.setState({ message: '' }), 1000)
  }

  handleEditing (event) {
    let arr = this.state.tBody
    switch (event.target.name) {
      case MEMBER_NAME:
        arr[event.target.id].name = event.target.value
        break
      case MEMBER_AGE:
        arr[event.target.id].age = event.target.value
        break
      case MEMBER_GENDER:
        arr[event.target.id].gender = event.target.value
        break
      case BOAT_YEAR:
        arr[event.target.id].year = event.target.value
        break
      case BOAT_LENGTH:
        arr[event.target.id].length = event.target.value
        break
      case BOAT_TYPE:
        arr[event.target.id].type = event.target.value
        break
      case BOAT_TYPE_TYPE:
        arr[event.target.id].type = event.target.value
    }
    this.setState({ tBody: arr, boatTypes: event.target.name === BOAT_TYPE_TYPE ? arr : this.state.boatTypes })
  }

  add () {
    let arr = this.state.tBody
    arr.push(0, {})
    this.setState({ tBody: arr })
  }

  update (index) {
    this.api.update(this.state.endPoint, this.state.tBody[index])
      .then(res => this.handleResult(res))
      .catch(err => this.handleResult({
        message: err.message,
        color: 'red'
      }))
  }

  delete (id, index) {
    let arr = this.state.tBody
    arr.splice(index, 1)
    this.api.delete(this.state.endPoint, id)
      .then(res => this.handleResult({
        tBody: arr,
        message: res.message,
        color: 'green'
      }))
      .catch(err => this.handleResult({
        message: err.message,
        color: 'red'
      }))
  }

  fetch (headers, endPoint, query = '') {
    this.api.fetch(headers, endPoint, query)
        .then(result => this.handleResult(result))
        .catch(err => this.handleResult({
          message: err.message,
          color: 'red'
        }))
  }
}

render(<App />, document.querySelector('#root'))
