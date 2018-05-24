const BaseService = require('./baseService')

class NumberService extends BaseService {
    init() {
        return this.ctx.model.Numbers
    }
    //当天预约号增加1
    async inc(userId) {
        //1.查询大余当天记录是否存在，不存在则加1
        const d = new Date();
        const Today = new Date(d.getFullYear(),d.getMonth(),d.getDate())
        let result = await this.$model.findOne({
            userId:userId,
            createdTime: {$gte:Today}
        })
        if(!result){
            await this.$model.create({
                userId:userId,
                index:1,
                createdTime:Today
            })
            return 1;
        }
        result.index++;
        result.save();
        return result.index
    }
}
module.exports = NumberService