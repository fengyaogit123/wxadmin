'use strict';
const { Controller } = require("egg");
const Excel = require('exceljs');
const fs = require('fs')
const stream = require('stream');
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
        let userId = this.ctx.user._id
        //生成号码
        const bespeakNumber = await this.ctx.service.numbers.inc(userId);
        let result = await this.ctx.service[Modal].create({
            bespeakNumber,
            ...data,
            user:userId
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
    async exportExl() {
        let list = await this.service[Modal].findExport(this.ctx.query)
        const workbook = new Excel.Workbook();
        const ws1 = workbook.addWorksheet("预约");
        ws1.columns = [
            { header: '项目名称', key: 'projectName', width: 20 },
            { header: '预约号', key: 'bespeakNumber', width: 20 },
            { header: '房号', key: 'roomNum', width: 20 },
            { header: '预约时间', key: 'bDate', width: 20 },
            { header: '客户名称', key: 'name', width: 20 },
            { header: '手机号', key: 'phone', width: 20 },
            { header: '置业顾问', key: 'adviser', width: 20 },
            { header: '置业顾问电话', key: 'adviserPhone', width: 20 },
            { header: '状态', key: 'status', width: 20 },
        ];
        list.map(item => {
            ws1.addRow({
                projectName: item.projectName,
                roomNum: item.roomNum,
                name: item.name,
                phone: item.phone,
                adviser: item.adviser,
                adviserPhone: item.adviserPhone,
                bespeakNumber: this.ctx.helper.bespeakFormat(+item.bespeakNumber),
                bDate: new Date(item.bDate).Format('yyyy-MM-dd hh:mm:ss'),
                status:item.status==1?'已取消预约':''
            });
        })
        const name = this.ctx.helper.initUUID() + '.xlsx';
        const path = `app/public/temp_file/${name}`;
        await workbook.xlsx.writeFile(path)
        this.ctx.response.attachment("预约列表.xlsx")
        this.ctx.body = fs.createReadStream(path)
    }
}
module.exports = BespeakController;
