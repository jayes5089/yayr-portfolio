import fs from 'fs'
import path from 'path'
import exifr from 'exifr'

const dir = './src/assets/images'
const output = {}

const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg'))
console.log('Reading EXIF metadata from images...')

for (const file of files) {
    const filePath = path.join(dir, file)
    try {
        const data = await exifr.parse(filePath, ['DateTimeOriginal'])
        const date = data?.DateTimeOriginal?.toISOString().split('T')[0] || 'Unknown'
        output[file] = date
    } catch (err) {
        console.warn(`Failed to extract EXIF metadata from ${file}:`, err.message)
        output[file] = 'Unknown'
    }
}

fs.writeFileSync('./src/assets/photo-dates.json', JSON.stringify(output, null, 2))
console.log('EXIF date extraction complete: photo-dates.json')