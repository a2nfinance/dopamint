import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let pointRule = new Schema({
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
    min_point: {
        type: Number,
        require: true
    },
    max_point: {
        type: Number,
        require: true
    },
    user_create_from: {
        type: Date,
        require: true
    },
    nft_template_id: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let PointRule = mongoose.model('PointRule', pointRule);
mongoose.models = {};
export default PointRule;