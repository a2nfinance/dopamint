import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let streakRule = new Schema({
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
    min_streak: {
        type: Number,
        require: true
    },
    max_streak: {
        type: Number,
        require: true
    },
    min_multiplier: {
        type: Number,
        require: true
    },
    max_multiplier: {
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
let StreakRule = mongoose.model('StreakRule', streakRule);
mongoose.models = {};
export default StreakRule;