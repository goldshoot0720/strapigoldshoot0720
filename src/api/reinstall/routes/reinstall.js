'use strict';

/**
 * reinstall route
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::reinstall.reinstall');
