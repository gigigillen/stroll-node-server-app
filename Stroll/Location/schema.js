import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: String,
    photo: String,
    description: String,
    date: String,
    reviews: Array
},
    { collection: "locations" }
);

export default locationSchema;