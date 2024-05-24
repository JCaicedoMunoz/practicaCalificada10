import { pool } from '../config/db.js'

const all = async () => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios')
  return usuarios
}

const findById = async id => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id])
  return usuarios[0]
}

const remove = async id => {
  const [resultado] = await pool.execute(
    'DELETE FROM usuarios WHERE usuario_id = ?', [id])
  return resultado.affectedRows === 1
}

const create = async ({ nombre, email, contraseña, rolId, picture }) => {
  const [resultado] = await pool.execute(
    'INSERT INTO usuarios (name, email, contraseña, rol_id, picture) VALUES(?, ?, ?, ?, ?)',
    [nombre, email, contraseña, rolId, picture]
  )
  return resultado.affectedRows === 1
}

const update = async ({ id, nombre, email, contraseña, rolId, picture }) => {
  const [resultado] = await pool.execute(
    'UPDATE usuarios SET name = ?, email = ?, contraseña = ?, rol_id = ?, picture = ? WHERE usuario_id = ?',
    [nombre, email, contraseña, rolId, picture, id]
  )
  return resultado.affectedRows === 1
}

const updatePicture = async (id, picture) => {
  const [resultado] = await pool.execute(
    'UPDATE usuarios SET picture = ? WHERE usuario_id = ?',
    [picture, id]
  )
  return resultado.affectedRows === 1
}

export default { all, findById, remove, create, update, updatePicture }
