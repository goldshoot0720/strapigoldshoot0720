'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const validator = require(path.join(path.dirname(require.resolve('@strapi/core/package.json')), 'dist/services/entity-validator'));
const model = { ...require('../src/api/image/content-types/image/schema.json'), uid: 'api::image.image' };
global.strapi = { getModel: () => model };

// Exercise the controller override and real Strapi validation, without database writes.
const base = {
  create: (ctx) => validator.validateEntityCreation(model, ctx.request.body.data),
  update: (ctx) => validator.validateEntityUpdate(model, ctx.request.body.data),
};
const sandbox = {
  module: { exports: {} },
  require: () => ({ factories: {
    createCoreController: (uid, extension) => Object.setPrototypeOf(extension ? extension() : {}, base),
  } }),
};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/api/image/controllers/image.js'), 'utf8'), sandbox);
const controller = sandbox.module.exports;

for (const action of ['create', 'update']) {
  test(`${action} accepts legacy false as an empty cover`, async () => {
    const result = await controller[action]({ request: { body: { data: { name: 'Image', cover: false } } } });
    assert.equal(result.cover, null);
  });
  test(`${action} preserves URLs and optional cover values`, async () => {
    for (const cover of ['https://example.com/uploads/image.png', '', null, undefined]) {
      const result = await controller[action]({ request: { body: { data: { name: 'Image', cover } } } });
      assert.equal(result.cover, cover);
    }
  });
  test(`${action} still rejects invalid cover values`, async () => {
    for (const cover of [true, 42, {}]) {
      await assert.rejects(controller[action]({ request: { body: { data: { name: 'Image', cover } } } }), /cover must be a `string` type/);
    }
  });
}
