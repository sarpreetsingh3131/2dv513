import mysql from 'mysql'

import { MyError } from '../error/error'

export class DB {
  constructor () {
    this.host = 'localhost'
    this.user = 'root'
    this.password = 'sunny'
    this.database = 'boat_club'
    this.port = 3306
    this.connection = null
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        port: this.port
      })
      this.connection.connect(err => {
        err ? reject(new MyError('cannot connect to DB')) : resolve(this.connection)
      })
    })
  }
}
