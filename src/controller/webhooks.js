import { Webhook } from "svix";
import User from "../models/userModel/userSchema.js";

export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // verify the headers
    await whook.verifyHeader(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // get data from request body
    const { data, type } = req.body;
    // switch based on the type of event
    switch (type) {
      case "user.created": {
        await User.create({
          _id: data.id,
          name: data.first_name,
          email: data.email_addresses[0].email_address,
          resume: "",
          image: data.image_url,
        });
        res.status(200).send({
          success: true,
          message: "User created successfully",
          data: data,
        });
        break;
      }
      case "user.updated": {
        const userData = {
          name: data.first_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).send({
          success: true,
          message: "User updated successfully",
          data: userData,
        });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).send({
          success: true,
          message: "User deleted successfully",
          data: data,
        });
        break;
      }
      default: {
        res.status(400).send({
          success: false,
          message: "Invalid event type",
        });
        break;
      }
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
