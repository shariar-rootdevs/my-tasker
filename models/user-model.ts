import mongoose, { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  password: string
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      requierd: true,
      trim: true,
    },
    address: {
      type: String,
      requierd: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

const User = mongoose.models.User || model<IUser>('User', userSchema)
export default User
