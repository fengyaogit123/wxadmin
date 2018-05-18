'use strict';
const { Controller } = require("egg");
const Modal = "bespeak"
class BespeakController extends Controller {
    async create() {
        const { bespeakFormat } = this.ctx.helper;
        const rule = {
            name: { type: "string", required: true, message: "请输入姓名" },//姓名
            phone: { type: "string", required: true, message: "请输入手机号" },//手机号
            projectName: { type: "string", required: true, message: "请输入项目名称" },//项目名称
            bDate: { type: "string", required: true, message: "请输入预约时间" },//预约时间
            roomNum: { type: "string", required: true, message: "请输入房号" }//职业顾问
        };
        const data = this.ctx.request.body;
        if (this.ctx.session.code != data.code) {
            return this.ctx.throw(401, "验证码不正确")
        }
        await this.ctx.validate(rule, data);
        //生成号码
        const bespeakNumber = await this.ctx.service.numbers.inc();
        let result = await this.ctx.service[Modal].create({
            bespeakNumber,
            ...data
        })
        //
        this.ctx.body = result
    }
    async list() {
        this.ctx.body = await this.service[Modal].findList(this.ctx.query)
    }
    async remove() {
        const rule = {
            ids: [{ type: "array", required: true, min: 1, message: "ids验证错误，应为不为空的数组" }],
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].removeAll(data.ids)
    }
    async updateStatus() {
        const data = this.ctx.request.body;
        let { _id, status } = data;
        this.ctx.body = await this.service[Modal].update({ _id, status })
    }
}
module.exports = BespeakController;
