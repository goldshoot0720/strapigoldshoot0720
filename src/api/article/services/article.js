'use strict';

/**
 * article service
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreService('api::article.article');
