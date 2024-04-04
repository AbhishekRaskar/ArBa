const mongoose = require('mongoose');

const categorySchema =  mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
},{
    versionKey: false
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = {
    categoryModel
};
