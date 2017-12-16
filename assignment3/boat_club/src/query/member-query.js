export let CREATE_MEMBER = 'INSERT INTO boat_club.member SET ?'

export let GET_MEMBERS = 'SELECT * FROM boat_club.member'

export let GET_MEMBER = 'SELECT * FROM boat_club.member WHERE id = ?'

export let UPDATE_MEMBER = 'UPDATE boat_club.member SET name = ?, age = ?, gender = ? WHERE id = ?'

export let DELETE_MEMBER = 'DELETE FROM boat_club.member WHERE id = ?'
