//Imports
import mongoose from 'mongoose';

// Address Schema
const AddressSchema = new mongoose.Schema({
  city: String,
  state: String
});

//User Schema
const UserSchema = new mongoose.Schema({
	id: {type: String, required: true, unique: true, index: true},
	email: {type: String, required: true, unique: true, index: true},
	name: {type: String, required: true},
	age: {type: Number},
	addresses: [AddressSchema],
	dateOfBirth: {type: Date}
});

//Define user model
let UserModel = mongoose.model('User', UserSchema);

// Add user to database
UserModel.addUser = (user) => {
    return user.save();
};

//Export User Model
export default UserModel;