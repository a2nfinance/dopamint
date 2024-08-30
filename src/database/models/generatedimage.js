import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let generatedImage = new Schema({
    owner: {
        type: String,
        require: true
    },
    prompt: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    image: {
        type: Object,
        require: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let GeneratedImage = mongoose.model('GeneratedImage', generatedImage);
mongoose.models = {};
export default GeneratedImage;