import { readdir, opendir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT_PATH = path.join(process.cwd(), 'images')
const OUTPUT_PATH = path.join(process.cwd(), 'optimizedImages')

export async function optimizePlayerImages() {

  const optimizeImage = async (file, output) => {
    await sharp(file).webp({ effort: 6 }).toFile(output)
  }

  const readFiles = async (directory) => {
    const files = await opendir(directory)

    for await (const file of files) {

      const filePath = path.join(INPUT_PATH, file.name)
      const dirOutputPath = path.join(OUTPUT_PATH, file.name)

      const photos = await opendir(filePath)

      for await (const photo of photos) {

        const photoPath = path.join(filePath, photo.name)
        const photoOutputPath = path.join(dirOutputPath, photo.name.replace('.png', '.webp'))

        await optimizeImage(photoPath, photoOutputPath )

      }

    }

    console.log('Imagenes optimizadas')
  }

  readFiles(INPUT_PATH)
}

optimizePlayerImages()