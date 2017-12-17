import React from 'react'

import { API } from '../api'

export class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.api = new API()
  }

  handleSidebarActivation (event) {
    window.document.querySelectorAll('#sidebar a').forEach(tag => {
      event.target === tag ? tag.classList.add('active') : tag.classList.remove('active')
    })
    this.props.handleIsEditing(false)
  }

  fetchMembers (event) {
    this.handleSidebarActivation(event)
    this.api.fetch(this.api.MEMBER_TABLE_HEADER, this.api.MEMBER_END_POINT)
        .then(result => this.props.handleTableResult(result))
        .catch(err => this.props.handleError(err.message))
  }

  fetchBoats (event) {
    this.handleSidebarActivation(event)
    this.api.fetch(this.api.BOAT_TABLE_HEADER, this.api.BOAT_END_POINT)
        .then(result => this.props.handleTableResult(result))
        .catch(err => this.props.handleError(err.message))
  }

  render () {
    return (
      <div className='ui left fixed vertical menu' id='sidebar'>
        <div className='item'>Boat Club</div>
        <a className='item' onClick={this.fetchMembers.bind(this)}>Get all members</a>
        <a className='item' onClick={this.fetchBoats.bind(this)}>Get all boats</a>
      </div>
    )
  }
}
