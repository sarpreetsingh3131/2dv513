import mysql from 'mysql'

import { MyError } from '../error/error'

export class DB {
  constructor () {
    this.host = 'www.songho.se'
    this.user = 'boat_club'
    this.password = '2DV513BoatClubServer!'
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
        port: this.port,
        ssl: {
          rejectUnauthorized: false
        }
      })
      this.connection.connect(err => {
        err ? reject(new MyError('cannot connect to DB')) : resolve(this.connection)
      })
    })
  }
}
