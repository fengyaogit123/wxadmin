const BaseService = require('./baseService')

class NumberService extends BaseService {
    init() {
        return this.ctx.model.Numbers
    }
    //当天预约号增加1
    async inc() {
        //1.查询大余当天记录是否存在，不存在则加1
        const Today = new Date(new Date().Format('yyyy-MM-dd'))
        const find = {
            $and: {
                createdAt: { $gt: Today }
            }
        }
        
        let result = await this.$model.findOneAndUpdate({}, {
            $inc: { index: 1 },
            createdAt: Today
        }, { upsert: true, new: true })
        return result.index
    }
}
module.exports = NumberService