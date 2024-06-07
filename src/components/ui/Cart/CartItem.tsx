import { getPrice } from '@/utils/getPrice'
import { getSingleProductUrl } from '@/utils/getSingleProductUrl'
import { ShopifyImage } from '../ShopifyImage'
import { useCart } from '@/hooks/useCart'

const CartItem = () => {
  const { cart, removeFromCart } = useCart()
  const cartItems = cart?.lines?.edges

  const hasCartItems = (cartItems?.length ?? 0) >= 1

  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {hasCartItems &&
        cartItems?.map((cartItem, index) => {
          const variant = cartItem.node.merchandise
          const product = cartItem.node.merchandise.product
          const isDefault = variant.title === 'Default Title'
          const title = isDefault ? product.title : variant.title

          return (
            <li key={index}>
              <a href={getSingleProductUrl(product)} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                  <ShopifyImage image={variant.image} />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={getSingleProductUrl(product)}>{title}</a>
                      </h3>
                      <p className="ml-4 whitespace-nowrap">
                        {getPrice(cartItem.node.cost.totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                      Antal: {cartItem.node.quantity}
                    </p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-primary hover:text-primaryHover"
                        onClick={(event) => {
                          event.preventDefault()
                          removeFromCart(cartItem.node.id)
                        }}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          )
        })}
    </ul>
  )
}

export default CartItem
