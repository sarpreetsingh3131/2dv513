import React from 'react'

import {
  BOAT_END_POINT, BOAT_TABLE_HEADER, BOAT_TYPE_END_POINT, MEMBER_END_POINT, MEMBER_TABLE_HEADER, SEARCH_MEMBER_END_POINT, SEARCH_BOAT_END_POINT
} from '../api'
import { MEMBER_NAME, MEMBER_AGE, MEMBER_GENDER, BOAT_YEAR, BOAT_LENGTH, BOAT_TYPE, BOAT_TYPE_TYPE } from '../app.jsx'

export class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      editIndex: -1
    }
  }

  render () {
    return (
      <table className='ui compact celled table'>
        <thead>
          <tr>
            {this.props.values.tHead.map((value, index) => <th key={index}>{value}</th>)}
            {this.props.values.tHead[0] ? <th><i className='circular add outline icon link' /></th> : null}
          </tr>
        </thead>
        {this.displayTable()}
      </table>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.values.endPoint !== nextProps.values.endPoint) this.setState({ isEditing: false, editIndex: -1 })
  }

  edit (index) {
    this.setState({ isEditing: true, editIndex: index })
  }

  displayTable () {
    switch (this.props.values.endPoint) {
      case MEMBER_END_POINT : return this.displayMemberTable()
      case BOAT_END_POINT: return this.displayBoatTable()
      case BOAT_TYPE_END_POINT: return this.displayBoatTypeTable()
    }
  }

  update (index) {
    this.props.update(index)
    this.setState({
      isEditing: false,
      editIndex: -1
    })
  }

  displayDropdown (current, arr = [], index, name, start, end) {
    if (arr.length === 0) for (let i = start; i <= end; i++) arr.push(i)
    return (
      <select id={index} name={name} value={current} onChange={(e) => this.props.handleEditing(e)}
        className='ui dropdown'>
        {arr.map((value, index) => <option key={index} id={value.type || value}>{value.type || value}</option>)}
      </select>
    )
  }

  displayMemberTable () {
    return (
      <tbody>
        {this.props.values.tBody.map((value, index) =>
          <tr key={index}>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                ? <input id={index} name={MEMBER_NAME} onChange={(e) => this.props.handleEditing(e)} value={value.name} />
                    : value.name}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.age, [], index, MEMBER_AGE, 18, 100)
                    : value.age}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.gender, this.props.values.genders, index, MEMBER_GENDER)
                    : value.gender}
            </td>
            <td>
              <a href='#' onClick={() => this.props.fetch(BOAT_TABLE_HEADER,
                SEARCH_BOAT_END_POINT, '?memberId=' + value.id)}>See Boats</a>
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                  ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                  : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
              <i className={'circular trash outline icon link'} onClick={() => this.props.delete(value.id, index)} />
            </td>
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
            <td>
              {this.state.isEditing && this.state.editIndex === index
                ? this.displayDropdown(value.year, [], index, BOAT_YEAR, 1960, 2017)
                : value.year}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                ? <input id={index} name={BOAT_LENGTH} onChange={(e) => this.props.handleEditing(e)} value={value.length} />
                    : value.length}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.type, this.props.values.boatTypes, index, BOAT_TYPE)
                    : value.type}
            </td>
            <td>
              <a href='#' onClick={() => this.props.fetch(MEMBER_TABLE_HEADER,
                SEARCH_MEMBER_END_POINT, '?memberId=' + value.memberId)}>{value.owner}</a>
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                  ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                  : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
              <i className={'circular trash outline icon link'} onClick={() => this.props.delete(value.id, index)} />
            </td>
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
              {this.state.isEditing && this.state.editIndex === index
                ? <input id={index} name={BOAT_TYPE_TYPE} onChange={(e) => this.props.handleEditing(e)} value={value.type} />
               : <a href='#' onClick={() => this.props.fetch(BOAT_TABLE_HEADER,
                  SEARCH_BOAT_END_POINT, '?type=' + value.type)}>{value.type}</a>}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
            </td>
          </tr>
        )}
      </tbody>
    )
  }
}
