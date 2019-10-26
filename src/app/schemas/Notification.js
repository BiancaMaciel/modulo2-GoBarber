import mongoose from 'mongoose';

/**
 * content da aplicação.
 * user que vai receber a notificação
 * read se a notificação foi lida ou não, default será false
 */
const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
