import model from './model.js';

const createLocation = (location) => {
    return model.create(location);
}

export const findAllLocations = () => model.find();

export const findLocationById = (locationId) => model.findById(locationId);

export const findLocationByName = (name) => model.findOne({ name: name });

export const findLocationsByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({ name: { $regex: regex } });
};


export const updateLocation = (locationId, location) =>
    model.updateOne({ _id: locationId }, { $set: location });

