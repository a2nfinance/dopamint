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
    authority_address: {
        type: String,
        require: false
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
    nft_template_id: {
        type: String,
        require: true
    },
    priority: {
        type: Number,
        require: true,
        default: 0
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