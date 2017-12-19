import React from 'react'

import {
  BOAT_END_POINT, BOAT_TABLE_HEADER, BOAT_TYPE_END_POINT, MEMBER_END_POINT, MEMBER_TABLE_HEADER, SEARCH_MEMBER_END_POINT, SEARCH_BOAT_END_POINT
} from '../api'
import { MEMBER_NAME, MEMBER_AGE, MEMBER_GENDER, BOAT_YEAR, BOAT_LENGTH, BOAT_TYPE, BOAT_TYPE_TYPE } from '../app.jsx'

export class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editIndex: -1,
      isAdding: false
    }
  }

  render () {
    return (
      <table className='ui compact celled table'>
        <thead>
          <tr>
            {this.props.values.tHead.map((value, index) => <th key={index}>{value}</th>)}
            {this.props.values.tHead[0]
              ? <th><i className='circular add outline icon link' onClick={this.add.bind(this)} /></th>
              : null}
          </tr>
        </thead>
        {this.displayTable()}
      </table>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.values.tBody !== nextProps.values.tBody) this.setState({ editIndex: -1, isAdding: false })
  }

  edit (index) {
    this.setState({ editIndex: index })
  }

  delete (id, index) {
    if (!this.state.isAdding) this.props.delete(id, index)
  }

  add () {
    this.props.addToList()
    this.setState({
      editIndex: 0,
      isAdding: true
    })
  }

  displayTable () {
    switch (this.props.values.endPoint) {
      case MEMBER_END_POINT : return this.displayMemberTable()
      case BOAT_END_POINT: return this.displayBoatTable()
      case BOAT_TYPE_END_POINT: return this.displayBoatTypeTable()
    }
  }

  save (index) {
    this.state.isAdding ? this.props.postData(0, 'POST') : this.props.postData(index, 'PUT')
    this.setState({ editIndex: -1, isAdding: false })
  }

  displayDropdown (current, arr = [], index, name, start, end) {
    if (arr.length === 0) for (let i = start; i <= end; i++) arr.push(i)
    return (
      <td>
        {this.state.editIndex === index
          ? <select id={index} name={name} value={current || arr[0].type || arr[0]}
            onChange={(e) => this.props.handleEditing(e)} className='ui dropdown'>
            {arr.map((value, index) => <option key={index} id={value.type || value}>{value.type || value}</option>)}
          </select>
          : current}
      </td>
    )
  }

  displayAction (index, value) {
    return (
      <td>
        {this.state.editIndex === index
        ? <i className='circular save outline icon link' onClick={() => this.save(index)} />
        : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
        {value
          ? <i className={'circular trash outline icon link'} onClick={() => this.delete(value.id, index)} />
          : null}
      </td>
    )
  }

  displayLink (header, endPoint, query, value) {
    return (
      <td>
        {this.state.isAdding
          ? null
          : <a href='#' onClick={() => this.props.fetch(header, endPoint, query)}>{value}</a>}
      </td>
    )
  }

  displayMemberTable () {
    return (
      <tbody>
        {this.props.values.tBody.map((value, index) =>
          <tr key={index}>
            <td>{value.id}</td>
            <td>
              {this.state.editIndex === index
                ? <input id={index} name={MEMBER_NAME} onChange={(e) => this.props.handleEditing(e)}
                  value={value.name} />
                : value.name}
            </td>
            {this.displayDropdown(value.age, [], index, MEMBER_AGE, 18, 100)}
            {this.displayDropdown(value.gender, this.props.values.genders, index, MEMBER_GENDER)}
            {this.displayLink(BOAT_TABLE_HEADER, SEARCH_BOAT_END_POINT, '?memberId=' + value.id, 'See Boats')}
            {this.displayAction(index, value)}
          </tr>
        )}
      </tbody>
    )
  }

  displayBoatTable () {
    return (
      <tbody>
        {this.props.values.tBody.map((value, index) =>
          <tr key={index}>
            {this.displayDropdown(value.year, [], index, BOAT_YEAR, 1960, 2017)}
            {this.displayDropdown(value.length, this.getBoatLength(), index, BOAT_LENGTH)}
            {this.displayDropdown(value.type, this.props.values.boatTypes, index, BOAT_TYPE)}
            {this.displayLink(
              MEMBER_TABLE_HEADER, SEARCH_MEMBER_END_POINT, '?memberId=' + value.memberId, value.owner)}
            {this.displayAction(index, value)}
          </tr>
        )}
      </tbody>
    )
  }

  displayBoatTypeTable () {
    return (
      <tbody>
        {this.props.values.tBody.map((value, index) =>
          <tr key={index}>
            <td>
              {this.state.editIndex === index
                ? <input id={index} name={BOAT_TYPE_TYPE} onChange={(e) => this.props.handleEditing(e)}
                  value={value.type} />
                : <a href='#' onClick={() => this.props.fetch(BOAT_TABLE_HEADER,
                  SEARCH_BOAT_END_POINT, '?type=' + value.type)}>{value.type}</a>}
            </td>
            {this.displayAction(index)}
          </tr>
        )}
      </tbody>
    )
  }

  getBoatLength () {
    let arr = []
    for (let i = 20; i <= 50; i++) {
      arr.push(i)
      for (let j = 1; j <= 12; j++) arr.push(i + '.' + j)
    }
    return arr
  }
}
