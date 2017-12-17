import React from 'react'

import { API } from '../api'

export class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      genders: [],
      boatTypes: []
    }
    this.api = new API()

    Promise.all([this.api.fetchGenders(), this.api.fetchBoatTypes()])
      .then(res => this.setState({ genders: res[0], boatTypes: res[1] }))
      .catch(err => this.props.handleError(err.message))
  }

  update (index) {
    this.api.update(this.props.endPoint, this.props.tBody[index])
      .then(res => this.props.handleMessage('Updated Successfully'))
      .then(() => this.props.handleIsEditing(false))
      .catch(err => this.props.handleError(err.message))
  }

  delete (id, index) {
    this.api.delete(this.props.endPoint, id)
      .then(res => this.props.delete(index, res))
      .catch(err => this.props.handleError(err.message))
  }

  displayDropdown (current, arr, index, name) {
    return (
      <select id={index} name={name} value={current} onChange={(e) => this.props.handleEditing(e)} className='ui dropdown'>
        {arr.map((value, index) => <option key={index} id={value.type}>{value.type}</option>)}
      </select>
    )
  }

  render () {
    return (
      <table className='ui celled table'>
        <thead>
          <tr>{this.props.tHead.map((value, index) => <th key={index}>{value}</th>)}</tr>
        </thead>
        <tbody>
          {this.props.tBody.map((value, index) =>
            <tr key={index}>
              {this.props.endPoint === 'members'
                ? <td>
                  {this.props.isEditing
                    ? <input id={index} name='name' onChange={(e) => this.props.handleEditing(e)} value={value.name} />
                    : value.name
                  }
                </td>
                : <td>
                  {this.props.isEditing
                  ? <input id={index} name='year' onChange={(e) => this.props.handleEditing(e)} value={value.year} />
                  : value.year
                  }
                </td>
              }
              {this.props.endPoint === 'members'
                ? <td>
                  {this.props.isEditing
                    ? <input id={index} name='age' onChange={(e) => this.props.handleEditing(e)} value={value.age} />
                    : value.age
                  }
                </td>
                : <td>
                  {this.props.isEditing
                    ? <input id={index} name='length' onChange={(e) => this.props.handleEditing(e)} value={value.length} />
                    : value.length
                  }
                </td>
              }
              {this.props.endPoint === 'members'
                ? <td>
                  {this.props.isEditing
                    ? this.displayDropdown(value.gender, this.state.genders, index, 'gender')
                    : value.gender
                  }
                </td>
                : <td>
                  {this.props.isEditing
                    ? this.displayDropdown(value.type, this.state.boatTypes, index, 'boatType')
                    : value.type
                  }
                </td>
              }
              {this.props.endPoint === 'members'
                ? <td><a href='#'>See Boats</a></td>
                : <td><a href='#'>{value.owner}</a></td>}
              <td>
                {this.props.isEditing
                  ? <i className='circular save outline icon link' onClick={() => this.update(index)} />
                  : <i className='circular edit outline icon link' onClick={() => this.props.handleIsEditing(true)} />
                }
                <i className={'circular trash outline icon link'} onClick={() => this.delete(value.id, index)} />
              </td>
            </tr>
            )}
        </tbody>
      </table>
    )
  }
}
