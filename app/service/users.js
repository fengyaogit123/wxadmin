"use strict";
const BaseService = require('./baseService')

class UserService extends BaseService {
    init() {
        return this.ctx.model.Users 
    }
    async login({ phone, password } = {}) {
        if (!phone || !password) {
            return null;
        }
        return await this.$model.findOne({ phone, password });
    }
    async create({ _id, ...data } = {}) {
        if (!data.phone) {
            return await this.$model.create(data);
        }
        const find = await this.$model.findOne({
            phone: data.phone
        })
        if (!find) {
            return await this.$model.create(data);
        }
        return this.ctx.throw(417, "用户已存在！");
    }
    async findList({ size, pageNo, ...query } = {}) {
        const { QueryPage } = this.ctx.helper;
        const result = await QueryPage({ size, pageNo }, () => {
            query = query || {};
            query.name = new RegExp(query.name)
            return this.$model.find(query).sort({ _id: -1 });
        });
        return result;
    }
}
module.exports = UserService
