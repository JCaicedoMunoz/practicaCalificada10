import usuariosModel from '../models/usuarios.model.js'
import { unlink } from 'fs'
import { join } from 'path'

export const index = async (req, res) => {
  const usuarios = await usuariosModel.all()
  res.json(usuarios)
}

export const remove = async (req, res) => {
  const { id } = req.params

  const usuario = await usuariosModel.findById(id)
  if (usuario && usuario.picture) {
    unlink(join(__dirname, '../../uploads/', usuario.picture), err => {
      if (err) console.error(err)
    })
  }

  const eliminado = await usuariosModel.remove(id)
  if (eliminado) {
    return res.json({ message: 'Usuario eliminado' })
  } else {
    return res.status(500).json({ message: 'No se puso eliminar el usuario' })
  }
}

export const store = async (req, res) => {
  try {
    const { nombre, email, contraseña, rolId } = req.body
    const picture = req.file ? req.file.filename : null

    if (!nombre || !email || !contraseña || !rolId) {
      return res.status(400).json({ message: 'Faltan datos en el formulario' })
    }

    const resultado = await usuariosModel.create({ nombre, email, contraseña, rolId, picture })
    if (resultado) {
      return res.status(201).json({ message: 'Usuario creado' })
    } else {
      return res.status(500).json({ message: 'No se pudo crear el usuario' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const update = async (req, res) => {
  try {
    const { nombre, email, contraseña, rolId } = req.body
    const { id } = req.params
    const picture = req.file ? req.file.filename : null

    if (!id || !nombre || !email || !contraseña || !rolId) {
      return res.status(400).json({ message: 'Faltan datos en el formulario' })
    }

    const usuario = await usuariosModel.findById(id)
    if (usuario && picture && usuario.picture) {
      unlink(join(__dirname, '../../uploads/', usuario.picture), err => {
        if (err) console.error(err)
      })
    }

    const resultado = await usuariosModel.update({ id, nombre, email, contraseña, rolId, picture })
    if (resultado) {
      return res.status(200).json({ message: 'Usuario actualizado' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar el usuario' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const uploadPicture = async (req, res) => {
  try {
    const { id } = req.params
    const picture = req.file ? req.file.filename : null

    if (!id || !picture) {
      return res.status(400).json({ message: 'Faltan datos en el formulario' })
    }

    const usuario = await usuariosModel.findById(id)
    if (usuario && usuario.picture) {
      unlink(join(__dirname, '../../uploads/', usuario.picture), err => {
        if (err) console.error(err)
      })
    }

    const resultado = await usuariosModel.updatePicture(id, picture)
    if (resultado) {
      return res.status(200).json({ message: 'Imagen actualizada' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar la imagen' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
