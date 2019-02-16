const mongoose = require ('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let StorySchema = new Schema({
    title:{type:String, required:[true, "title is required"]},
    file:{type:String, required:[true, "file is required"]},
    duration:{type:String, required:[true, "duration is required"]},
    plays:{type:Number, default:0},
    likes:{type:Number, default:0},
    story_id:{type:Number}
});
StorySchema.plugin(AutoIncrement,{inc_field:'story_id'});
StorySchema.index({title: 1});
module.exports = mongoose.model('stories', StorySchema);