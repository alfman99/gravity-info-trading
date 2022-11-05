/* eslint-disable @typescript-eslint/no-empty-function */

exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('news', (table) => {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.string('content', 50000);
      table.float('sentiment', 4, 2);
      table.string('asset');
      table.dateTime('published_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('sources', (table) => {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.string('domain').notNullable();
      table.string('query_selector_URL', 1500).notNullable();
      table.string('query_selector_content', 1500).notNullable();
      table.string('asset').notNullable();
    }),
  ]).then(() => {
    return knex('sources').insert([
      {
        url: 'https://www.coindesk.com/tag/ethereum',
        query_selector_URL:
          '#fusion-app > div > div > div > main > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div > h6 > a',
        query_selector_content:
          '#fusion-app > div > div > main > div > div > section > div > div:nth-child(3)',
        asset: 'ETH',
        domain: 'https://www.coindesk.com',
      },
      {
        url: 'https://cryptonews.com/news/ethereum-news',
        query_selector_URL:
          'body > main > div > div > div > div > section > article:nth-child(1) > div > div:nth-child(2) > a',
        query_selector_content:
          'body > main > div:nth-child(1) > div:nth-child(2) > div > div.article-single__content',
        asset: 'ETH',
        domain: 'https://cryptonews.com',
      },
      {
        url: 'https://crypto.news/news/ethereum',
        query_selector_URL:
          '#content > div > div > div > article:nth-child(1) > header > h3 > a',
        query_selector_content:
          '#content > article > div.post-detail__container > div',
        asset: 'ETH',
        domain: 'https://crypto.news',
      },
    ]);
  });
};

exports.down = function () {};
