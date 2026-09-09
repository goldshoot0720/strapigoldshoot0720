'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');
const entityValidator = require(path.join(
  path.dirname(require.resolve('@strapi/core/package.json')),
  'dist/services/entity-validator'
));
const schema = require('../src/api/image/content-types/image/schema.json');
const model = { ...schema, uid: 'api::image.image' };

// The scalar model needs only registry lookup; no database writes are performed.
global.strapi = { getModel: () => model };

test('image creation and update preserve an uploaded cover URL', async () => {
  const cover = 'https://example.com/uploads/Chat_GPT_Image_2026_9_8.png';
  for (const validate of [entityValidator.validateEntityCreation, entityValidator.validateEntityUpdate]) {
    const result = await validate(model, { name: 'Uploaded image', cover });
    assert.equal(result.cover, cover);
  }
});

test('image cover remains optional', async () => {
  for (const cover of [undefined, null, '']) {
    const result = await entityValidator.validateEntityCreation(model, {
      name: 'Image without a cover',
      ...(cover === undefined ? {} : { cover }),
    });
    assert.equal(result.cover, cover);
  }
});
