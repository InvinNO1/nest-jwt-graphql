/* eslint-disable @typescript-eslint/no-var-requires */
const bcript = require('bcrypt')
const pass = 'password'
const cript = bcript.hashSync(pass, 10)
console.log(cript)
console.log(bcript.compareSync(pass, cript))
