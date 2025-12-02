import mongoose from "mongoose";

const OpeningSlotSchema = new mongoose.Schema(
  {
    from: { type: String, required: true }, // '09:00'
    to: { type: String, required: true },   // '13:30'
  },
  { _id: false }
);

const OpeningDaySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
    slots: {
      type: [OpeningSlotSchema],
      default: [],
    },
  },
  { _id: false }
);

const SettingsSchema = new mongoose.Schema(
  {
    openingHours: {
      type: [OpeningDaySchema],
      default: [],
    },
    vacationFrom: {
      type: Date,
      default: null,
    },
    vacationTo: {
      type: Date,
      default: null,
    },
    vacationMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
