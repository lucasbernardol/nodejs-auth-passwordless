import crypto from 'node:crypto';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: null,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomUUID(),
      select: false,
    },

    username: {
      type: String,
      required: false,
      // unique: true,
      trim: true,
      lowercase: true,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      nullable: false,
    },

    activatedAt: {
      type: Number,
      required: false,
      default: null,
      // UniX
    },

    finishedAt: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', schema);
