export const CREATE_MEMBER = 'INSERT INTO boat_club.member SET ?'

export const GET_MEMBERS = 'SELECT member.id, name, age, gender.type AS gender FROM boat_club.member JOIN gender ON member.gender = gender.id'

export const UPDATE_MEMBER = 'UPDATE boat_club.member SET name = ?, age = ?, gender = ? WHERE id = ?'

export const DELETE_MEMBER = 'DELETE FROM boat_club.member WHERE id = ?'

export const SEARCH_MEMBER_BY_ID = GET_MEMBERS + ' WHERE member.id = ?'
