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
const getCategoryService = async (req, res) => {
  const { category } = req.params;
  console.log("this is category", category);
  console.log(await Service.find({ category: { $in: [`${category}`] } }));

  try {
    const services = await Service.find({ category: { $in: [`${category}`] } });
    console.log("this is services", services);

    return res.status(200).json({
      message: "Fetched services accrding to category successfully",
      services,
    });
  } catch (error) {
    console.log("error while getting services for category", error);
    return res
      .status(400)
      .json({ error: "error while getting services for category" });
  }
};
export { getAllServices, getCategoryService };
