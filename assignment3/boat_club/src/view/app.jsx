import React from 'react'
import { render } from 'react-dom'

import { Table } from './components/table.jsx'
import { Sidebar } from './components/sidebar.jsx'
import { API } from './api'

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
        <Sidebar fetch={this.fetch.bind(this)} api={this.api} />
        <Table values={this.state} handleResult={this.handleResult.bind(this)} delete={this.delete.bind(this)}
          handleEditing={this.handleEditing.bind(this)} api={this.api} fetch={this.fetch.bind(this)} />
      </div>
    )
  }

  componentDidMount () {
    Promise.all([this.api.fetch([], this.api.BOAT_TYPE_END_POINT), this.api.fetch([], this.api.GENDER_END_POINT)])
      .then(res => this.setState({ boatTypes: res[0].tBody, genders: res[1].tBody }))
      .catch(err => this.handleResult({ message: err.message, color: 'red' }))
  }

  handleResult (res) {
    console.log(res)
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
      case 'name':
        arr[event.target.id].name = event.target.value
        break
      case 'age':
        arr[event.target.id].age = event.target.value.trim()
        break
      case 'length':
        arr[event.target.id].length = event.target.value.trim()
        break
      case 'gender':
        arr[event.target.id].gender = event.target.value
        break
      case 'boatType':
        arr[event.target.id].type = event.target.value
        break
      case 'year':
        arr[event.target.id].year = event.target.value
    }
    this.setState({ tBody: arr })
  }

  delete (index, res) {
    let arr = this.state.tBody
    arr.splice(index, 1)
    this.handleResult({ tBody: arr, message: res.message, color: res.color })
  }

  fetch (headers, endPoint) {
    this.api.fetch(headers, endPoint)
        .then(result => this.handleResult(result))
        .catch(err => this.handleResult({ message: err.message, color: 'red' }))
  }
}

render(<App />, document.querySelector('#root'))
