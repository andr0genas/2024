
import paslaugaModel from "../models/PaslaugaModel.mjs";

const PaslaugosController = {
    createPaslauga: async (req, res) => {
        try {
            const tour = await paslaugaModel.createPaslauga(req.body);
            res.status(201).json(tour);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occured while creating the tour" });
        }
    },

    updatePaslauga: async (req, res) => {
        try {
            const paslaugaId = req.params.id;
            const paslauga = await tourModel.updatePaslauga(tourId, req.body);
            res.status(200).json(tour);
        } catch (error) {
            if (error.message === "paslauga not found") {
                res.status(404).json({ message: "paslauga not found" });
            } else {
                res
                    .status(500)
                    .json({ message: "An error occurred while updating the tour" });
            }
        }
    },
    deletePaslauga: async (req, res) => {
        try {
            const paslaugaId = req.params.id;
            const deletedPaslauga = await tourModel.deletePaslauga(paslaugaId);
            if (!deletedPaslauga) {
                return res.status(404).json({ message: "Paslauga not found" });
            }
            res
                .status(200)
                .json({ message: "Paslauga deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getAllTours: async (req, res) => {
        try {
            const result = await paslaugaModel.getAllPaslaugos();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getToursById: async (req, res) => {
        try {
            const paslaugaId = req.params.id;
            const result = await PaslaugaModel.getTourById(paslaugaId);
            if (!result) {
                return res.status(404).json({ message: "Paslauga not found" });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default PaslaugosController;
