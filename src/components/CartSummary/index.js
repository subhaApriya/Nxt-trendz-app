import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}/-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            {/* ✅ SINGLE Checkout Button */}
            <button
              type="button"
              className="checkout-button"
              onClick={() => setIsPopupOpen(true)}
            >
              Checkout
            </button>

            {/* ✅ React Popup for Payment */}
            <Popup open={isPopupOpen} modal onClose={() => setIsPopupOpen(false)}>
              {close => (
                <div className="popup-container">
                  <h2>Payment Options</h2>
                  <p>Total: Rs {total}/-</p>
                  <p>Items: {cartList.length}</p>

                  <div className="payment-options">
                    <label>
                      <input type="radio" name="payment" disabled /> Card
                    </label>
                    <label>
                      <input type="radio" name="payment" disabled /> Net Banking
                    </label>
                    <label>
                      <input type="radio" name="payment" disabled /> UPI
                    </label>
                    <label>
                      <input type="radio" name="payment" disabled /> Wallet
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        onChange={() => setPaymentMethod('COD')}
                      />
                      Cash on Delivery
                    </label>
                  </div>

                  {/* ✅ Confirm Order Button */}
                  <button
                    type="button"
                    className="confirm-order-button"
                    disabled={paymentMethod !== 'COD'}
                    onClick={() => {
                      alert('Your order has been placed successfully')
                      close()
                    }}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
