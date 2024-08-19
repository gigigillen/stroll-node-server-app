import mongoose from "mongoose";
import locationSchema from './schema.js';

const locationModel = mongoose.model("LocationModel", locationSchema);
export default locationModel;