'use strict';

/**
 * cloud router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cloud.cloud');
