import React from 'react'

import {
  BOAT_END_POINT, BOAT_TABLE_HEADER, BOAT_TYPE_END_POINT, BOAT_TYPE_TABLE_HEADER, MEMBER_END_POINT, MEMBER_TABLE_HEADER
} from '../api'

export class Sidebar extends React.Component {
  render () {
    return (
      <div className='ui left fixed vertical menu' id='sidebar'>
        <div className='item'>Boat Club</div>
        <a className='item' onClick={() => this.props.fetch(MEMBER_TABLE_HEADER, MEMBER_END_POINT)}>
            Get all members
        </a>
        <a className='item' onClick={() => this.props.fetch(BOAT_TABLE_HEADER, BOAT_END_POINT)}>
            Get all boats
        </a>
        <a className='item' onClick={() => this.props.fetch(BOAT_TYPE_TABLE_HEADER, BOAT_TYPE_END_POINT)}>
            Get all boat types
        </a>
      </div>
    )
  }
}
