import React from 'react'

import {
  BOAT_END_POINT, BOAT_TABLE_HEADER, BOAT_TYPE_END_POINT, MEMBER_END_POINT, MEMBER_TABLE_HEADER, SEARCH_MEMBER_END_POINT, SEARCH_BOAT_END_POINT
} from '../api'

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

  displayDropdown (current, arr, index, name) {
    if (arr.length === 0) for (let i = 18; i <= 100; i++) arr.push(i)
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
                    ? <input id={index} name='name' onChange={(e) => this.props.handleEditing(e)} value={value.name} />
                    : value.name}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.age, [], index, 'age')
                    : value.age}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.gender, this.props.values.genders, index, 'gender')
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
                  ? <input id={index} name='year' onChange={(e) => this.props.handleEditing(e)} value={value.year} />
                  : value.year}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? <input id={index} name='length' onChange={(e) => this.props.handleEditing(e)} value={value.length} />
                    : value.length}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.type, this.props.values.boatTypes, index, 'boatType')
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
                  ? <input id={index} name='boatType' onChange={(e) => this.props.handleEditing(e)} value={value.type} />
                  : value.type}
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
