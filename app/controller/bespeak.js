'use strict';
const { Controller } = require("egg");
const Modal = "bespeak"
class BespeakController extends Controller {
    async create() {
        const user = this.ctx.user;
        const bespeak = await this.ctx.service[Modal].findByUser(user._id)
        if (bespeak) {
            this.ctx.body = bespeak;
            return
        }
        //生成号码
        const bespeakNumber = await this.ctx.service.numbers.inc();
        this.ctx.body = await this.ctx.service[Modal].create({
            bespeakNumber,
            user: user._id
        })
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
}
module.exports = BespeakController;
