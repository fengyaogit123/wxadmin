"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Bespeak', new mongoose.Schema({
        name:String,//姓名
        phone:String,//手机号
        status:{type:Number,defualt:0},//0预约  1取消
        bespeakNumber: Number,//预约号码
        projectName: String,//项目名称
        roomNum:String,
        payType: String,//付款类型
        bDate: Date,//预约时间
        adviser: String,//职业顾问
        user:{type:Schema.Types.ObjectId,ref:"Users"},
        adviserPhone: String//职业顾问电话
    }, {
            versionKey: false,
            timestamps: true
        }));
};
