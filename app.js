const fs = require('fs')
const yargs = require('yargs')
const {addNote, removeNote, clearList, listNotes, readNote} = require('./handlers')

yargs.command({
    command: 'add',
    describe: 'Add a note.',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){addNote(argv.title, argv.body)}
})
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){removeNote(argv.title)}
})

yargs.command({
    command: 'clear',
    describe: 'Clear all notes.',
    handler() {
        clearList()
    }
})
yargs.command({
    command:'list',
    describe:'List saved notes.',
    handler(){listNotes()}
})

yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){readNote(argv.title)}
})

yargs.parse()

