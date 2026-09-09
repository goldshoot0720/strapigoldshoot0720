'use strict';

/**
 * manual-price service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::manual-price.manual-price');
