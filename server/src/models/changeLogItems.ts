import mongoose from "mongoose";

const changeLogItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ["fix", "known", "planned"], required: true },
  status: {
    type: String,
    enum: ["pending", "in-process", "completed"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  author: { type: String, default: "JD" },
  itemType: {
    type: String,
    enum: [
      "UI",
      "UX",
      "Logic",
      "Performance",
      "Feature",
      "Backend",
      "Security",
      "Infrastructure",
    ],
    required: true,
  },
});

export default mongoose.model("ChangeLogItem", changeLogItemSchema);
