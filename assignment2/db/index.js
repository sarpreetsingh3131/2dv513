var fs = require('fs')
var mysql = require('mysql')
var lineReader = require('readline')

const SUBREDDIT = 'Subreddit', LINK = 'Link', COMMENT = 'Comment'

var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'sunny', database: 'Reddit', port: 3306 })

con.connect((err) => {
    if (err) console.log('bad luck')
    else {
        console.log('db connected')
        saveFileData('RC_2007-10')  
    }
})

function saveFileData(name) {
    var reader = lineReader.createInterface({ input: fs.createReadStream(name) })
    var index = 0
    reader.on('line', (line) => {
        index++
        let data = JSON.parse(line)
        save(SUBREDDIT, data, index)
        save(LINK, data, index)
        save(COMMENT, data, index)
    })
}

function save(tableName, obj, index) {
    var values = {}
    switch (tableName) {
        case SUBREDDIT:
            values = { id: obj.subreddit_id, name: obj.subreddit }
            break
        case LINK:
            values = { id: obj.link_id.split('_')[1], name: obj.link_id, subreddit_id: obj.subreddit_id }
            break
        case COMMENT:
            values = { id: obj.id, name: obj.name, author: obj.author, score: obj.score, body: obj.body, subreddit_id: obj.subreddit_id, parent_id: obj.parent_id, created_utc: new Date(parseInt(obj.created_utc) * 1000), link_id: obj.link_id.split('_')[1] }
    }
    con.query('INSERT INTO ' + tableName + ' SET ?', values, (err, res) => {
        if (err) console.log(index, 'error', tableName, err.code, err.sqlMessage)
        else console.log(index, 'added', tableName)
    })
}