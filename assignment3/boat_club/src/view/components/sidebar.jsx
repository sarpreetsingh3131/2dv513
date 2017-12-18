import React from 'react'

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
    this.props.fetch(this.props.api.MEMBER_TABLE_HEADER, this.props.api.MEMBER_END_POINT)
  }

  fetchBoats (event) {
    this.handleSidebarActivation(event)
    this.props.fetch(this.props.api.BOAT_TABLE_HEADER, this.props.api.BOAT_END_POINT)
  }

  fetchBoatTypes (event) {
    this.handleSidebarActivation(event)
    this.props.fetch(this.props.api.BOAT_TYPE_TABLE_HEADER, this.props.api.BOAT_TYPE_END_POINT)
  }
}
