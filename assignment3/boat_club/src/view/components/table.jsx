import React from 'react'

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
      <table className='ui celled table'>
        <thead>
          <tr>{this.props.values.tHead.map((value, index) => <th key={index}>{value}</th>)}</tr>
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
      case this.props.api.MEMBER_END_POINT : return this.displayMemberTable()
      case this.props.api.BOAT_END_POINT: return this.displayBoatTable()
      case this.props.api.BOAT_TYPE_END_POINT: return this.displayBoatTypeTable()
    }
    if (this.props.values.endPoint.includes('boats?memberId=')) return this.displayBoatTable()
    return this.displayMemberTable()
  }

  update (index) {
    this.props.api.update(this.props.values.endPoint, this.props.values.tBody[index])
      .then(res => this.props.handleResult(res))
      .then(() => this.setState({ isEditing: false, editIndex: -1 }))
      .catch(err => this.props.handleResult({ message: err.message, color: 'red' }))
  }

  delete (id, index) {
    this.props.api.delete(this.props.values.endPoint, id)
      .then(res => this.props.delete(index, res))
      .catch(err => this.props.handleResult({ message: err.message, color: 'red' }))
  }

  displayDropdown (current, arr, index, name) {
    return (
      <select id={index} name={name} value={current} onChange={(e) => this.props.handleEditing(e)}
        className='ui dropdown'>
        {arr.map((value, index) => <option key={index} id={value.type}>{value.type}</option>)}
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
                    ? <input id={index} name='age' onChange={(e) => this.props.handleEditing(e)} value={value.age} />
                    : value.age}
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                    ? this.displayDropdown(value.gender, this.props.values.genders, index, 'gender')
                    : value.gender}
            </td>
            <td>
              <a href='#' onClick={() => this.props.fetch(this.props.api.BOAT_TABLE_HEADER,
                this.props.api.BOAT_END_POINT + '?memberId=' + value.id)}>See Boats</a>
            </td>
            <td>
              {this.props.values.isEditing
                  ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                  : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
              <i className={'circular trash outline icon link'} onClick={() => this.delete(value.id, index)} />
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
              <a href='#' onClick={() => this.props.fetch(this.props.api.MEMBER_TABLE_HEADER,
                this.props.api.MEMBER_END_POINT + '/' + value.memberId)}>{value.owner}</a>
            </td>
            <td>
              {this.state.isEditing && this.state.editIndex === index
                  ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                  : <i className='circular edit outline icon link' onClick={() => this.edit(index)} />}
              <i className={'circular trash outline icon link'} onClick={() => this.delete(value.id, index)} />
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
