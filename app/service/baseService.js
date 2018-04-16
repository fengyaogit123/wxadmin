const { Service } = require("egg");
class BaseService extends Service {
    constructor(ctx) {
        super(ctx)
        this.$model = this.init()
    }
    async create(data = {}) {
        return await this.$model.create(data);
    }
    async removeAll(ids) {
        return this.$model.remove({ _id: { $in: ids } });
    }
    async update({ _id, ...update } = {}) {
        return this.$model.update({ _id }, { $set: update });
    }
}
module.exports = BaseService