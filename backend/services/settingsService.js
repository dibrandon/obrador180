import Settings from "../models/Settings.js";

const DEFAULT_OPENING_HOURS = [
  {
    day: "monday",
    slots: [],
  },
  {
    day: "tuesday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "wednesday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "thursday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "friday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "saturday",
    slots: [
      { from: "09:00", to: "14:00" },
      { from: "15:30", to: "21:00" },
    ],
  },
  {
    day: "sunday",
    slots: [
      { from: "09:00", to: "14:00" },
    ],
  },
];

export async function getOrCreateSettingsDoc() {
  const update = {
    $setOnInsert: {
      openingHours: DEFAULT_OPENING_HOURS,
      vacationFrom: null,
      vacationTo: null,
      vacationMessage: "",
    },
  };

  const options = {
    new: true,
    upsert: true,
  };

  const doc = await Settings.findOneAndUpdate({}, update, options);
  return doc;
}
