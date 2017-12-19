import React from 'react'

import {
  BOAT_END_POINT, BOAT_TABLE_HEADER, BOAT_TYPE_END_POINT, BOAT_TYPE_TABLE_HEADER, MEMBER_END_POINT, MEMBER_TABLE_HEADER
} from '../api'

export class Sidebar extends React.Component {
  render () {
    return (
      <div className='ui left fixed vertical menu' id='sidebar'>
        <div className='item'>Boat Club</div>
        <a className='item' onClick={this.fetchMembers.bind(this)}>Get all members</a>
        <a className='item' onClick={this.fetchBoats.bind(this)}>Get all boats</a>
        <a className='item' onClick={this.fetchBoatTypes.bind(this)}>Get all boat types</a>
      </div>
    )
  }

  handleSidebarActivation (event) {
    window.document.querySelectorAll('#sidebar a').forEach(tag => {
      event.target === tag ? tag.classList.add('active') : tag.classList.remove('active')
    })
  }

  fetchMembers (event) {
    this.handleSidebarActivation(event)
    this.props.fetch(MEMBER_TABLE_HEADER, MEMBER_END_POINT)
  }

  fetchBoats (event) {
    this.handleSidebarActivation(event)
    this.props.fetch(BOAT_TABLE_HEADER, BOAT_END_POINT)
  }

  fetchBoatTypes (event) {
    this.handleSidebarActivation(event)
    this.props.fetch(BOAT_TYPE_TABLE_HEADER, BOAT_TYPE_END_POINT)
  }
}
