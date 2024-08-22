import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let template = new Schema({
    owner: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    animation_url: {
        type: String,
        require: false
    },
    external_url: {
        type: String,
        require: false
    },
    animation_url: {
        type: String,
        require: false
    },
    attributes: {
        type: Object,
        require: false
    },
    properties: {
        type: Object,
        require: false
    },
    metadata_uri: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let NFTTemplate = mongoose.model('NFTTemplate', template);
mongoose.models = {};
export default NFTTemplate;