"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Numbers', new mongoose.Schema({
        index: Number
    }, {
            versionKey: false,
            timestamps: true
        }));
};
