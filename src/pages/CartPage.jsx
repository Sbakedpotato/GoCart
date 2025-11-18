import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart()

  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-700">Your cart is empty</p>
        <p className="mt-2 text-sm text-slate-500">
          Discover deals curated by GoCart AI and add items to your bag.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 font-semibold text-white"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
            <img src={item.image} alt={item.title} className="h-32 w-32 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.brand}</p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="font-bold text-brand-blue">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
                {item.oldPrice && (
                  <span className="text-slate-400 line-through">
                    Rs. {(item.oldPrice * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-slate-200">
                  <button
                    className="w-8 text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    className="w-12 border-x border-slate-200 text-center"
                  />
                  <button className="w-8 text-lg" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-sm text-brand-blue">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span className="text-emerald-500">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
        </div>
        <button className="mt-6 w-full rounded-full bg-brand-orange py-3 font-semibold text-white">
          Proceed to Checkout
        </button>
        <p className="mt-2 text-center text-xs text-slate-400">
          Secured by GoCart Pay. Taxes calculated at checkout.
        </p>
      </aside>
    </div>
  )
}

export default CartPage

