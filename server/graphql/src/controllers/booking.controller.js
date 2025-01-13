import { Booking } from "../models/booking.model";
import { Service } from "../models/service.model";
const bookService = async (req, res) => {
  const user = req.user;
  const { serviceId, date, address, startTime, endTime } = req.body();
  try {
    const requestedService = await Service.findById(serviceId);
    const provider = requestedService.provider;
    const booking = await Booking.create({
      user: user._id,
      provider: provider,
      service: serviceId,
      address,
      date: new Date(date),
      startTime,
      endTime,
    });
    return res.status(200).json({ message: "SuccessFully Booked", booking });
  } catch (error) {
    console.log("Error while booking a service");
    return res.status(400).json({ error: "Failed in booking the service" });
  }
};
const previousBookings = async (req, res) => {
  const user = req.user;
  try {
    const bookingHistory = await Booking.find({ user: user._id })
      .populate("user")
      .populate("provider");
    return res
      .status(200)
      .json({ message: "booking history fetched uccesfully", bookingHistory });
  } catch (error) {
    console.log("Error while fetching the booking history", error);
    return res
      .status(400)
      .json({ error: "Error in fetching the booking history" });
  }
};

const cancel = async (req, res) => {
  const { bookingId } = req.body();
  try {
    await Booking.findByIdAndUpdate(bookingId, { status: "cancel" });
    return res
      .status(200)
      .json({ message: "successfuly cancelled the booking" });
  } catch (error) {
    console.log("error while canceling the booking", error);
    return res.status(400).josn({ error: "failed to cancel the booking" });
  }
};
const complete = async (req, res) => {
  const { bookingId } = req.body();
  try {
    await Booking.findByIdAndUpdate(bookingId, { status: "complete" });
    return res
      .status(200)
      .json({ message: "successfuly completing the booking" });
  } catch (error) {
    console.log("error while completing the booking", error);
    return res.status(400).josn({ error: "failed to complete the booking" });
  }
};
export { bookService, previousBookings, cancel, complete };
