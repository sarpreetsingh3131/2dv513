export let GET_BOAT_TYPE_ID = 'SELECT id FROM boat_club.boat_type WHERE type = ?'

export let GET_BOAT_TYPES = 'SELECT type FROM boat_club.boat_type'

export let GET_BOAT_TYPE = GET_BOAT_TYPES + ' WHERE id = ?'

export let CREATE_BOAT_TYPE = 'INSERT INTO boat_club.boat_type SET ?'
