"use strict";
const BaseService = require('./baseService')

class BespeakService extends BaseService {
    init() {
        return this.ctx.model.Bespeak
    }
    //判断用户是否预约
    async findByUser(_id) {
        return await this.$model.findOne({ user: _id }).populate([{
            path: "user",
            match: { password: false }
        }])
    }
    async findList({ size, pageNo, ...query } = {}) {
        const { QueryPage } = this.ctx.helper;
        const ids = await this.ctx.model.Users.find({
            name: new RegExp(query.name || ""),
            phone: new RegExp(query.phone || "")
        }, "_id");
        const result = await QueryPage({ size, pageNo }, () => {
            const Query = {};
            if (query.name || query.phone) {
                Query.user = {
                    $in: ids.map(({ _id }) => _id)
                }
            }
            return this.$model.find(Query).sort({ _id: -1 }).populate([{
                path: "user"
            }])
        });
        return result;
    }
}
module.exports = BespeakService