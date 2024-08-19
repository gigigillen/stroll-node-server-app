import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    streak: {type: Number, default:0},
    completed: {type: Number, default:0},
    totalMiles: {type: Number, default:0},
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    userType: {
        type: String,
        default: "STROLLER",
        enum: ["STROLLER", "BUSINESS"]
    },
    favoriteLocations: Array,
    profilePicture: { type: String, default: "profile-pic.webp" },
    city: {type: String, default: "Boston"},
    businessName: String
},
    { collection: "users" }
);

export default userSchema;