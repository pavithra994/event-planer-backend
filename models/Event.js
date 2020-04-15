import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Event = new Schema({
    name: {
        type: String
    },
    time: {
        type: String
    },
    description: {
        type: String
    },
    isActive:{
        type: Boolean
    }
});

export default mongoose.model('Event', Event);
