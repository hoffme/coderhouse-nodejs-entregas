'use strict'

const Article = use('App/Models/Article');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with articles
 */
class ArticleController {
  /**
   * Show a list of all articles.
   * GET articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await Article.all();
  }

  /**
   * Render a form to be used for creating a new article.
   * GET articles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new article.
   * POST articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const article = await Article.create(request.body);
    return article;
  }

  /**
   * Display a single article.
   * GET articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await Article.find(params.id);
  }

  /**
   * Render a form to update an existing article.
   * GET articles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update article details.
   * PUT or PATCH articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const article = await Article.findOrFail(params.id);
    
    article.merge(request.body)

    await article.save();

    return article;
  }

  /**
   * Delete a article with id.
   * DELETE articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const article = await Article.findOrFail(params.id);
    await article.delete();
  }
}

module.exports = ArticleController

