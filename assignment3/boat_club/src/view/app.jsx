import React from 'react'
import { render } from 'react-dom'

import { Table } from './components/table.jsx'
import { Sidebar } from './components/sidebar.jsx'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      tBody: [],
      tHead: [],
      isEditing: false,
      endPoint: '',
      message: '',
      color: ''
    }
  }

  handleTableResult (res) {
    this.setState({ tBody: res.tBody, tHead: res.tHead, endPoint: res.endPoint, message: res.message, color: 'green' })
    window.setTimeout(() => this.setState({ message: '' }), 1000)
  }

  handleIsEditing (isEditing) {
    this.setState({ isEditing: isEditing })
  }

  handleError (message) {
    this.setState({ message: message, color: 'red' })
    window.setTimeout(() => this.setState({ message: '' }), 2000)
  }

  handleMessage (messsage) {
    this.setState({ message: messsage, color: 'green' })
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
    }
    this.setState({ tBody: arr })
  }

  delete (index, message) {
    let arr = this.state.tBody
    arr.splice(index, 1)
    this.setState({ tBody: arr, message: message })
  }

  render () {
    return (
      <div>
        {this.state.message === '' ? null : <div className={'ui message ' + this.state.color}>{this.state.message}</div>}
        <Sidebar handleTableResult={this.handleTableResult.bind(this)} handleIsEditing={this.handleIsEditing.bind(this)}
          handleError={this.handleError.bind(this)} />
        <Table tBody={this.state.tBody} tHead={this.state.tHead} endPoint={this.state.endPoint}
          handleTableResult={this.handleTableResult.bind(this)} handleEditing={this.handleEditing.bind(this)}
          isEditing={this.state.isEditing} handleIsEditing={this.handleIsEditing.bind(this)}
          delete={this.delete.bind(this)} handleError={this.handleError.bind(this)} handleMessage={this.handleMessage.bind(this)} />
      </div>
    )
  }
}

render(<App />, document.querySelector('#root'))
