//用户
'use strict';
const { Controller } = require("egg");
const Modal = "users"
class UserController extends Controller {
    /** ------------------base------------------- */
    async create() {
        const rule = {
            code: { type: "string", required: true, message: "请输入验证码" },
            name: { type: "string", required: true, message: "请输入姓名" },
            phone: { type: "string", required: true, message: "请输入手机号" },
            address: { type: "string", required: true, message: "请输入地址" },
            sex: { type: "string", required: true, message: "请选择性别" },
            password: { type: "string", required: true, message: "请输入密码" },
        };
        if(this.ctx.user.isAdmin){
            delete rule.code
        }
        //ctx.session.code
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        if(!this.ctx.user.isAdmin && this.ctx.session.code !=data.code){
            return this.ctx.throw(401,"验证码不正确")
        }
        this.ctx.body = await this.service[Modal].create(data)
    }
    async remove() {
        const rule = {
            ids: [{ type: "array", required: true, min: 1, message: "ids验证错误，应为不为空的数组" }],
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].removeAll(data.ids)
    }
    async list() {
        this.ctx.body = await this.service[Modal].findList(this.ctx.query)
    }
    async update() {
        const rule = {
            _id: [{ type: "string", required: true, message: "id不存在" }],
        };
        this.ctx.body = await this.service[Modal].update(this.ctx.request.body)
    }
    /**——————————————————————end—————————————————————— */
}
module.exports = UserController;
