import mongoose, { Schema, model } from "mongoose";

interface IMessage {
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

const messageSchema = new Schema<IMessage>({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
