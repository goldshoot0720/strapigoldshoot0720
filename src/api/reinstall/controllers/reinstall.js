'use strict';

/**
 * reinstall controller
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::reinstall.reinstall');
