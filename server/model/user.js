const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};



const User = mongoose.model("User", userSchema);

module.exports = User;
