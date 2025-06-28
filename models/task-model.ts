import mongoose, { Document, model, Schema, Types } from 'mongoose'

export interface ITask extends Document {
  taskName: string
  description: string
  startDate: Date
  endDate: Date
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  status: 'Pending' | 'In Progress' | 'Completed'
  isCompleted?: boolean
  assignedTo?: string
  userId: Types.ObjectId
}

const taskSchema = new Schema<ITask>(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.models.Task || model<ITask>('Task', taskSchema)

export default Task
