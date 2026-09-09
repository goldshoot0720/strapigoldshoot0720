'use strict';

/**
 * quota service
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreService('api::quota.quota');
