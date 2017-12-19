export const CREATE_BOAT = 'INSERT INTO boat_club.boat SET ?'

export const GET_BOATS = 'SELECT boat.id,boat.year,boat.length,member.id as memberId, member.name as owner,boat_type.type FROM boat_club.boat JOIN member ON boat.member_id = member.id JOIN boat_type ON boat.type_id = boat_type.id'

export const GET_BOAT = GET_BOATS + ' WHERE boat.id = ?'

export const UPDATE_BOAT = 'UPDATE boat_club.boat SET year = ?, length = ?, type_id = ? WHERE id = ?'

export const DELETE_BOAT = 'DELETE FROM boat_club.boat WHERE id = ?'

export const SEARCH_BOATS_BY_MEMBER = GET_BOATS + ' WHERE member_id = ?'

export const SEARCH_BOATS_BY_TYPE = GET_BOATS + ' WHERE type_id = ?'

export const SEARCH_BOATS_BY_LENGTH_EQUALS_TO = GET_BOATS + ' WHERE length = ?'

export const SEARCH_BOATS_BY_LENGTH_GREATER_THAN = GET_BOATS + ' WHERE length > ?'

export const SEARCH_BOATS_BY_LENGTH_SMALLER_THAN = GET_BOATS + ' WHERE length < ?'

export const SEARCH_BOATS_BY_MANF_YEAR_EQUALS_TO = GET_BOATS + ' WHERE year = ?'

export const SEARCH_BOATS_BY_MANF_YEAR_GREATER_THAN = GET_BOATS + ' WHERE year > ?'

export const SEARCH_BOATS_BY_MANF_YEAR_SMALLER_THAN = GET_BOATS + ' WHERE year < ?'
