const mongoose = require("mongoose");
const { Schema } = mongoose;
const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
  facebook: {
    type: String,
    require: true,
  },
  github: {
    type: String,
    require: true,
  },
  linkedin: {
    type: String,
    require: true,
  },
  twitter:{
    type:String,
    require:true
  },
  projectsLinks:{
    type:String,
    require:true
  },
  city: {
    type: String,
    require: true,
  },
  pincode:{
    type:Number,
    require:true
  },

  lastModified: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", profileSchema);
