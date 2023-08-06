import { resolve, sep, dirname, join, extname } from 'path'
import { pid } from 'process'
import { userInfo, platform } from 'os'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sampleFilePath = join(__dirname, 'my-files')
const sampleFile = join(sampleFilePath, 'sample.kded')

// // for getting current working directory using resolve function from path module
// const cwd = resolve()
// console.log({cwd})

// print out the seperator of a given file path
const seperator = sep
console.log({seperator})

// print out the extension of a given file path
const pathExtension = extname(sampleFile)
console.log({pathExtension})

console.log({sampleFilePath})

// print out the current procees id
const processId = pid
console.log('Current Process ID:', processId)

// prints userinformation of the os
const userInformation = userInfo()
console.log({userInformation})

// print out the os platform
const osPlatform = platform()
console.log({osPlatform})
