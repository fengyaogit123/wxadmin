const LocalStrategy = require('passport-local').Strategy;
module.exports = (app) => {
    // 挂载 strategy
    app.passport.use(new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'phone',
        passwordField: 'password',
    }, (req, phone, password, done) => {
        const user = {
            provider: 'local',
            phone,
            password,
        };
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        let existUser = await ctx.service.users.login(user);
        if (existUser) {
            //生成token
            return existUser
        }
        return {
            status: 401,
            message: "用户名或密码不正确"
        }
    });
}