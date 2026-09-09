'use strict';

/**
 * subscription service
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreService('api::subscription.subscription');
