'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      product_name: {
        type: Sequelize.STRING(50)
      },
      product_description: {
        type: Sequelize.TEXT
      },
      product_category: {
        type: Sequelize.STRING(11)
      },
      product_price: {
        type: Sequelize.DECIMAL(9, 2)
      },
      release_date: {
        type: Sequelize.DATE
      },
      manufacturer: {
        type: Sequelize.STRING(50)
      },
      product_rating: {
        type: Sequelize.DECIMAL(2, 1)
      },
      customer_reviews: {
        type: Sequelize.INTEGER
      },
      product_image_url: {
        type: Sequelize.STRING(50)
      },
      product_website: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    const productsData = [];
    const numProducts = 15;

    for (let i = 0; i < numProducts; i++) {
      productsData.push({
        product_name: faker.commerce.productName(),
        product_description: faker.lorem.paragraph(),
        product_category: faker.commerce.department(),
        product_price: faker.commerce.price(),
        release_date: faker.date.past(),
        manufacturer: faker.company.name(),
        product_rating: faker.number.float({
          min: 1,
          max: 5,
          precision: 0.1
        }),
        customer_reviews: faker.number.int({
          min: 0,
          max: 1000
        }),
        product_image_url: faker.image.imageUrl(),
        product_website: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Products', productsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
