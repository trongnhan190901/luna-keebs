/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import type { NextPage } from 'next';
import CartItem from '~/components/shared/CartItem';
import { useCartContext } from '~/providers/CartContextProvider';
import CheckOut from '~/components/shared/CheckOut';
import { priceFormat } from '~/helpers/priceFormat';
import ShippingInfo from '~/components/shared/ShippingInfo';

const CartPage: NextPage = () => {
    const cartCtx = useCartContext();

    return (
        <>
            <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                Giỏ hàng
            </div>
            <div className="h-full w-full">
                {cartCtx?.userWithCart?.cart &&
                cartCtx?.userWithCart?.cart.length > 0 ? (
                    <div className="absolute-center mx-auto mt-12 w-[90%] flex-col">
                        <div className="flex h-20 w-full items-center border-b border-gray-300 font-secondary text-4xl font-bold">
                            <div className="w-1/2 text-center">
                                <div>Sản phẩm</div>
                            </div>
                            <div className="flex w-1/2 text-center">
                                <div className="w-2/5">
                                    <div>Đơn giá</div>
                                </div>
                                <div className="w-1/5">
                                    <div>Số lượng</div>
                                </div>
                                <div className="w-2/5">
                                    <div>Tổng</div>
                                </div>
                                <div className="w-10"></div>
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-col">
                            <div className="flex w-full flex-col">
                                {cartCtx?.userWithCart &&
                                    cartCtx?.userWithCart.cart &&
                                    cartCtx?.userWithCart.cart.length > 0 &&
                                    cartCtx?.userWithCart.cart.map((item) => {
                                        return (
                                            <CartItem
                                                key={item.id}
                                                cartId={item.id}
                                                product={item.product}
                                                productId={item.productId}
                                                cartQuantity={item.cartQuantity}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="absolute-center w-full py-16">
                    <div className="absolute-center w-full">
                        {/* <ShippingInfo /> */}
                    </div>
                    <div className="flex w-[95%] flex-col items-center space-y-5 font-secondary font-bold">
                        <div className="text-3xl font-normal">
                            Phí vận chuyển được thanh toán với shipper khi nhận
                            hàng
                        </div>
                        <div className="text-4xl">Tổng giá trị đơn hàng: </div>
                        <div className="text-5xl">
                            {priceFormat(cartCtx?.totalAmount)}
                        </div>
                        <div className="absolute-center flex-col">
                            <CheckOut />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
