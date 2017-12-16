export let CREATE_BOAT = 'INSERT INTO boat_club.boat SET ?'

export let GET_BOATS = 'SELECT * FROM boat_club.boat'

export let GET_BOAT = 'SELECT * FROM boat_club.boat WHERE id = ?'

export let UPDATE_BOAT = 'UPDATE boat_club.boat SET year = ?, length = ?, member_id = ?, type_id = ? WHERE id = ?'

export let DELETE_BOAT = 'DELETE FROM boat_club.boat WHERE id = ?'
