export default {
  insertUser: `
    INSERT INTO users (
      id,
      firstname,
      lastname,
      isactive
    ) VALUES ($1, $2, $3, $4)
  `,
  insertNote: `
    INSERT INTO posts (
        id,
        userid,
        content,
        ispublished
    ) VALUES ($1, $2, $3, $4)
  `,
  getAllUsers: `
    SELECT id, lastname, firstname, isactive FROM users
  `,
  getUserPosts: 'SELECT * FROM posts WHERE userid IN ($1:csv)',
  getSingleUser: 'SELECT id,  lastname, firstname, isactive FROM users where id = $1'
}
