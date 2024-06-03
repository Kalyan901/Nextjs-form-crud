import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, "First Name is required!"],
	},
    lastname: {
		type: String,
		required: [true, "Last Name is required!"],
	},
    email: {
		type: String,
		required: [true, "Email is required!"],
	},
	phone: {
		type: Number,
		required: [true, "Phone is required!"],
	},
    city: {
		type: String,
		required: [true, "City is required!"],
	},
    state: {
		type: String,
		required: [true, "State is required!"],
	},
    zip: {
		type: Number,
		required: [true, "Zip is required!"],
	},
	
});

export default mongoose.models.Users ||
	mongoose.model("Users", UsersSchema);
