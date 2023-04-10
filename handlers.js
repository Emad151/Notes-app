const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    let notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title === title)

    
    if (duplicateNote) {
        console.log(chalk.bgRed(`Note already exists with description "${duplicateNote.body}!`))
    } else{
        notes.push({
            title,
            body
        })
        console.log(chalk.bgGreen('Note added'))
        
        saveNotes(notes)
    }
}

const removeNote = (title) => {
    let notes = loadNotes()
    const notesUpdated = notes.filter((note) => note.title !== title)
    
    if (notes.length > notesUpdated.length) {
        console.log(chalk.bgGreen('Note removed'))
    } else {
        console.log(chalk.bgRed('No Note with this title found'))
    }
    
    saveNotes(notesUpdated)
}

const clearList = () => {
    let notes = loadNotes()
    notes = []
    console.log(chalk.bgGreen('Notes cleared'))
    saveNotes(notes)
} 

const listNotes = ()=>{
    const notes = loadNotes()
    if (notes.length === 0) {
        console.log(chalk.bgRed('No notes found!'))
    } else {
        console.log(chalk.bgWhite('your notes: '))
        for (const note of notes) {
        console.log(note.title)
    }
    }
    
}

const readNote = (title)=>{
    const notes = loadNotes()
    const wantedNote = notes.find((note)=>note.title===title)
    if (!wantedNote) {
        console.log(chalk.bgRed(`No note found with title '${title}'`))
    } else {
        console.log(chalk.inverse(wantedNote.title))
        console.log(wantedNote.body)
    }
}

/**
 * 
 * @param {array of notes} notes 
 * @param {title of a note} title 
 * @returns true if the title already exists in the notes
 */
// const previouslyExists = (notes, title)=>{
//     for (const note of notes) {
//         if (note.title === title) {
//             return true
//         }
//     }
//     return false
// }

/**
 * 
 * @returns the saved notes from the file
 */
const loadNotes = ()=>{
    try {
        const notesBuffer =  fs.readFileSync('./notes.json')
        const notesJSON = notesBuffer.toString()
        const notes = JSON.parse(notesJSON)
    return notes
    } catch (error) {
        console.log(error)
        return []
    }
    
    
}
const saveNotes = (notes)=>{
    try {
        fs.writeFileSync('./notes.json', JSON.stringify(notes))
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {addNote, removeNote, clearList, listNotes, readNote}