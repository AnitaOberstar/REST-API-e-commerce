const { fetchCartById } = require('./carts.service')
const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('../db')


const fetchOrders = async () => {
    return await fetchOrdersDb()
}

const fetchOrderById = async (orderId) => {
    return await fetchOrderByIdDb(orderId)
}

const fetchOrdersByUser = async (userId) => {
    return await fetchOrdersByUserDb(userId)
}

const createOrder = async (userId) => {
  const order = {
    user_id: userId,
    status: 'Placed order'
  }
    return await createOrderDb(order)
}

const createProductInOrder = async (orderProduct) => {

    return await createProductInOrderDb(orderProduct)
}

const calculateOrderAmount = async (userId) => {
  // Get price from carts in db and not from items (for now)
  const cart = await fetchCartById(userId)
  const totalPrice = cart.reduce((acc, item) => 
      acc + parseFloat(item.product.price) * parseInt(item.quantity, 10), 0)
  return totalPrice * 100 //Return price in cents
}

module.exports = {
  fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder, calculateOrderAmount
}