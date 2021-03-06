'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')


//orderline is association class
  //contains orderId and productId, no orderlineId

const Orderline = db.define('orderlines', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  itemPrice: {
    type: Sequelize.DECIMAL(10, 2)
  },
},{
  getterMethods: {
    subtotal: function() {
      if (this.itemPrice) {
        const result = +this.itemPrice * this.quantity
        return parseFloat(result.toFixed(2));
      } else return '';
    }
  }
})

module.exports = Orderline
