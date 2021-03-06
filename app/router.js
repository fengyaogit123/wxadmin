'use strict';
module.exports = (app) => {
    const { router, controller, middleware } = app;
    const { login, users, bespeak } = controller;
    const userRequired = middleware.userRequired();
    const userAdmin = middleware.userAdmin();

    router.post("/api/users/create", userAdmin,users.create);
    router.del("/api/users/remove", userAdmin, users.remove);
    router.get("/api/users/list", userAdmin, users.list);
    router.post("/api/users/update", userAdmin, users.update)

    router.post("/api/bespeak/create", userRequired,bespeak.create)
    router.put('/api/bespeak/updateStatus', userRequired, bespeak.updateStatus)
    router.del("/api/bespeak/remove", userRequired, bespeak.remove)
    router.get("/api/bespeak/list", userRequired, bespeak.list)
    router.get("/api/bespeak/exportExl",userAdmin,bespeak.exportExl)
    // 登录校验
    router.post('/api/login', app.passport.authenticate('local', { successRedirect: '/api/login/authCallback' }));
    router.post('/api/loginOut', login.loginOut);
    router.get('/api/login/checkcode', login.checkcode);
    // 鉴权成功后的回调页面
    router.get('/api/login/authCallback', login.authCallback);
    router.get('/api/users/create', users.create);
};
