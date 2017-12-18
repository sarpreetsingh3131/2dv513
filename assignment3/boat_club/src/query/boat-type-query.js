export let GET_BOAT_TYPE_ID = 'SELECT id FROM boat_club.boat_type WHERE type = ?'

export let GET_BOAT_TYPES = 'SELECT * FROM boat_club.boat_type'

export let GET_BOAT_TYPE = GET_BOAT_TYPES + ' WHERE id = ?'

export let CREATE_BOAT_TYPE = 'INSERT INTO boat_club.boat_type SET ?'

export let UPDATE_BOAT_TYPE = 'UPDATE boat_club.boat_type SET type = ? WHERE id = ?'
