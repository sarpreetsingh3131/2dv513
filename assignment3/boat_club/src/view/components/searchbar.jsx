import React from 'react'
import { MEMBER_TABLE_HEADER, SEARCH_MEMBER_END_POINT, SEARCH_BOAT_END_POINT, BOAT_TABLE_HEADER } from '../api'

export class Searchbar extends React.Component {
  render () {
    return (
      <div className='ui action input'>
        <input id='searchbar' type='text' placeholder='Search...' />
        <select id='selection' className='ui compact selection dropdown'>
          <option defaultChecked value='name'>Find Members By Name</option>
          <option value='age-equals'>Find Members By Age Equals To</option>
          <option value='age-greater'>Find Members By Age Greater Than</option>
          <option value='age-smaller'>Find Members By Age Smaller Than</option>
          <option value='length-equals'>Find Boats By Length Equals To</option>
          <option value='length-greater'>Find Boats By Length Greater Than</option>
          <option value='length-smaller'>Find Boats By Length Smaller Than</option>
          <option value='manfYear-equals'>Find Boats By Manf. Year Equals To</option>
          <option value='manfYear-greater'>Find Boats By Manf. Year Greater Than</option>
          <option value='manfYear-smaller'>Find Boats By Manf. Year Smaller Than</option>
        </select>
        <div type='submit' className='ui button' onClick={this.search.bind(this)}>Search</div>
      </div>
    )
  }

  search () {
    let searchText = document.querySelector('#searchbar').value.trim()
    if (searchText.length > 0) {
      let selection = document.querySelector('#selection')
      let headers = []
      let endPoint = ''
      if (selection.value === 'name' || selection.value.includes('age')) {
        headers = MEMBER_TABLE_HEADER
        endPoint = SEARCH_MEMBER_END_POINT
      } else {
        headers = BOAT_TABLE_HEADER
        endPoint = SEARCH_BOAT_END_POINT
      }
      this.props.fetch(headers, endPoint, '?' +
            selection.value.split('-')[0] + '=' + searchText + '&operator=' + selection.value.split('-')[1])
    }
  }
}
