import { Provider } from "../models/provider.model.js";

const getAllProvider = async (req, res) => {
  try {
    const providers = await Provider.find().populate("service");
    return res
      .status(200)
      .json({ message: "All provider fetched successfully", providers });
  } catch (error) {
    return res.status(400).json({ error: "failure in fetching the providers" });
  }
};
export { getAllProvider };
