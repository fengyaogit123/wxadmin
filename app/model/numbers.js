"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Numbers', new mongoose.Schema({
        index: Number,
        userId:String,
        createdTime:Date
    }, {
            versionKey: false,
            timestamps: true
        }));
};
