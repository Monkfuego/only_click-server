import { Service } from "../models/service.model.js";

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider");
    return res
      .status(200)
      .json({ message: "All services fetched successfully", services });
  } catch (error) {
    return res.status(400).json({ error: "failure in fetching the providers" });
  }
};
export { getAllServices };
