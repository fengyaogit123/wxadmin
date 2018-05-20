"use strict";
const BaseService = require('./baseService')

class BespeakService extends BaseService {
    init() {
        return this.ctx.model.Bespeak
    }
    async findExport({ size, pageNo, ...query } = {}) {
        const { QueryPage } = this.ctx.helper;

        const Query = {};

        if (query.name) {
            Query.name = new RegExp(query.name)
        }

        if (query.projectName) {
            Query.projectName = new RegExp(query.projectName)
        }

        if (query.phone) {
            Query.phone = new RegExp(query.phone)
        }

        if (query.bDate) {
            let date = new Date(query.bDate)
            let hdate = new Date(+date + 24 * 3600 * 1000);
            console.log('查询=' + date.Format('yyyy-MM-dd hh:mm:ss') + '到' + hdate.Format('yyyy-MM-dd hh:mm:ss'))
            Query.$and = [{ bDate: { $gt: date } }, { bDate: { $lt: hdate } }]
        }

        return this.$model.find(Query)
    }
    async findList({ size, pageNo, ...query } = {}) {
        const { QueryPage } = this.ctx.helper;
        const result = await QueryPage({ size, pageNo }, () => {
            const Query = {};

            if (query.name) {
                Query.name = new RegExp(query.name)
            }

            if (query.projectName) {
                Query.projectName = new RegExp(query.projectName)
            }

            if (query.phone) {
                Query.phone = new RegExp(query.phone)
            }

            if (query.bDate) {
                let date = new Date(query.bDate)
                let hdate = new Date(+date + 24 * 3600 * 1000);
                console.log('查询=' + date.Format('yyyy-MM-dd hh:mm:ss') + '到' + hdate.Format('yyyy-MM-dd hh:mm:ss'))
                Query.$and = [{ bDate: { $gt: date } }, { bDate: { $lt: hdate } }]
            }
            return this.$model.find(Query).sort({ _id: -1 })

        });

        return result
    }
}
module.exports = BespeakService