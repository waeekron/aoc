import { readFileSync, promises as fsPromises } from 'fs'
import { join } from 'path'

export async function asyncReadFile(fileName: string) {
  try {
    const result = await fsPromises.readFile(join(__dirname, fileName), 'utf-8')

    return result
  } catch (error) {
    console.log(error)
    return 'Something went wrong :/'
  }
}
