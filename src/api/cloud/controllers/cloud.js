'use strict';

/**
 * cloud controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cloud.cloud');
