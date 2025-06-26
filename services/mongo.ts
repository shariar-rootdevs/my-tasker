import mongoose from 'mongoose'

export async function dbConnect() {
  const uri = process.env.MONGO_URI

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables')
  }

  try {
    const connection = await mongoose.connect(uri)
    console.log('db connected successfully')
    return connection
  } catch (err) {
    console.log(err)
  }
}
