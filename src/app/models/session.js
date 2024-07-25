import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
export const SessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
