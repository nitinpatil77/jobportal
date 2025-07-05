import moongoose from "mongoose";

const userSchema = new moongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, required: true },
  image: { type: String, required: true },
});
const User = moongoose.model("User", userSchema);
export default User;