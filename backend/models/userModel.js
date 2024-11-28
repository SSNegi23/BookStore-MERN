import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

//? Middleware in Mongoose is a function that is executed during the lifecycle of a Mongoose document or query.
//? Trigger: - The middleware runs before the document is saved to the MongoDB database (because it’s a pre("save") middleware).
//? Purpose: The middleware ensures that the user's password is securely hashed before being stored in the database.
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // If the password field has not been modified, the function proceeds directly to the next middleware or the save operation.
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // The password is hashed using the generated salt and stored in this.password, replacing the original plaintext password.
  next();
});

// Method to compare hashed password
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User", userModel);
export default User;
