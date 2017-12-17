export let CREATE_BOAT = 'INSERT INTO boat_club.boat SET ?'

export let GET_BOATS = 'SELECT boat.id, year, length, member.name AS owner, boat_type.type FROM boat_club.boat JOIN member ON boat.member_id = member_id JOIN boat_type ON boat.type_id = boat.type_id'

export let GET_BOAT = GET_BOATS + ' WHERE boat.id = ?'

export let UPDATE_BOAT = 'UPDATE boat_club.boat SET year = ?, length = ?, type_id = ? WHERE id = ?'

export let DELETE_BOAT = 'DELETE FROM boat_club.boat WHERE id = ?'
