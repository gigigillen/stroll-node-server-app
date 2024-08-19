import * as dao from './dao.js';

export default function LocationRoutes(app) {

    const createLocation = async (req, res) => {
        const location = await dao.createLocation(req.body);
        res.json(location);
    };

    const findAllLocations = async (req, res) => {
        const { name } = req.query;
        if (name) {
            const locations = await dao.findLocationsByPartialName(name);
            res.json(locations);
            return;
        }
        const locations = await dao.findAllLocations();
        res.json(locations);
    };


    const findLocationById = async (req, res) => {
        const locationId = req.params.locationId;
        const location = await dao.findLocationById(locationId);
        res.json(location);
    };

    const updateLocation = async (req, res) => {
        const {locationId} = req.params;
        const status = await dao.updateLocation(locationId, req.body);
        res.json(status)
    };


    app.post("/api/locations", createLocation);
    app.get("/api/locations", findAllLocations);
    app.get("/api/locations/:locationId", findLocationById);
    app.put("/api/locations/:locationId", updateLocation);
    
}