'use strict';

/**
 * reinstall service
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreService('api::reinstall.reinstall');
