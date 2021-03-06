'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/health-check'
});

router.get('/', async (ctx, next) => {
	ctx.body = { 'status': "OK" };
});

module.exports = {router};
