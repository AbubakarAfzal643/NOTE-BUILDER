const express = require('express')
const router = express.Router()
const {getAllNotes , createNote , updateNote , deleteNote , getSpecificNote} = require('../controllers/notesController')

router.get('/' , getAllNotes)
router.get('/:id', getSpecificNote)
router.post('/', createNote )
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router