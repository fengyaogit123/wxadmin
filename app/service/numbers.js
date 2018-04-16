const BaseService = require('./baseService')

class NumberService extends BaseService {
    init() {
        return this.ctx.model.Numbers
    }
    async inc() {
        let result = await this.$model.findOneAndUpdate({}, {
            $inc: { index: 1 }
        }, { upsert: true, new: true })
        return result.index
    }
}
module.exports = NumberService