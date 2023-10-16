import { resolve, sep, dirname, join, extname } from 'path'
import { pid } from 'process'
import { userInfo, platform } from 'os'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sampleFilePath = join(__dirname, 'my-files')
const sampleFile = join(sampleFilePath, 'sample.txt')

// print out the current working directory using resolve function from path module
const cwd = resolve()
console.log({cwd})

// print out the seperator of a given file path
const seperator = sep
console.log({seperator})

// print out the extension name of a file path
const pathExtension = extname(sampleFile)
console.log({pathExtension})

console.log({sampleFilePath})

// print out the current procees id of the current working process
const processId = pid
console.log('Current Process ID:', processId)

// print out the user information of the os
const userInformation = userInfo()
console.log({userInformation})

// print out the platform of an operating system
const osPlatform = platform()
console.log({osPlatform})
