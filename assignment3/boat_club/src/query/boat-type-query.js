export const GET_BOAT_TYPE_ID = 'SELECT id FROM boat_club.boat_type WHERE type = ?'

export const GET_BOAT_TYPES = 'SELECT * FROM boat_club.boat_type'

export const GET_BOAT_TYPE = GET_BOAT_TYPES + ' WHERE id = ?'

export const CREATE_BOAT_TYPE = 'INSERT INTO boat_club.boat_type SET ?'

export const UPDATE_BOAT_TYPE = 'UPDATE boat_club.boat_type SET type = ? WHERE id = ?'
