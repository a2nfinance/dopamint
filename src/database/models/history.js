import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let history = new Schema({
    template_id: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    },
    metadata_uri: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        require: true,
        default: 0
    }
});
let History = mongoose.model('History', history);
mongoose.models = {};
export default History;