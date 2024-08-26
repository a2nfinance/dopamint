import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let pluginSetting = new Schema({
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
    plugin_type: {
        type: String,
        require: true,
        default: "AppData"
    },
    custom_data: {
        type: Object,
        require: true
    },
    apply_to_nft_template_id: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let PluginSetting = mongoose.model('PluginSetting', pluginSetting);
mongoose.models = {};
export default PluginSetting;