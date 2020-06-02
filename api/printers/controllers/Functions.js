'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

let HOST = "https://" + "search.tonersales.eu";
let $ = {

  sitemap: async (ctx) => {
    let printers = await $.getAll(strapi.query('printers'));
      let names = printers.map((p) => 
        HOST + "/" + p.id + "/" + p.brand.name + "-" + p.model.replace(/\r?\n|\r/gm, ''));
      ctx.send(names.join('\n'));
  },

  traverse: async (table, callback) => {
    const perPage = 100;
      const count = await table.count();
    const pages = count/perPage;
    let results = [];
      for(var i = 0; i < pages; i++) {
        results = results.concat(
          await table.find({_start: i*perPage, _limit: perPage})
        );
      }
      for(var j = 0; j < count; j++) {
        await callback(results[j]);
      } 
      return count;
  },
  getAll: async (table) => {
    const perPage = 100;
      const count = await table.count();
    const pages = count/perPage;
    let results = [];
      for(var i = 0; i < pages; i++) {
        results = results.concat(
          await table.find({_start: i*perPage, _limit: perPage})
        );
      }
      return results;
  }
};

module.exports = $;