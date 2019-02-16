const mongoose = require ('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username:{type:String, required:[true, "username is required"]},
    password:{type:String, required:[true, "password is required"]},
    image:{type:String, default:"default.png"},
    bio:{type:String, default:"I have no bio, sorry"},
    user_id:{type:Number}
});
UserSchema.plugin(AutoIncrement,{inc_field:'user_id'});
UserSchema.index({username: 1, bio:1});
module.exports = mongoose.model('users', UserSchema);