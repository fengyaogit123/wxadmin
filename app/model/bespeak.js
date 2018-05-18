"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Bespeak', new mongoose.Schema({
        user: { type: Schema.Types.ObjectId, ref: 'Users' },
        bespeakNumber: Number,
        projectName: String,
        payType: String,
        bDate: Date,
        adviser: String,
        adviserPhone: String
    }, {
            versionKey: false,
            timestamps: true
        }));
};
