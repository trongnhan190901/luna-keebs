/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { priceFormat } from '~/helpers/priceFormat';
import { useCartContext } from '~/providers/CartContextProvider';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import Input from './Input';
import { useState, type ChangeEvent, useEffect } from 'react';
import data from '~/constants/address.json';

/* eslint-disable indent */
const PaymentPage = () => {
    const cartCtx = useCartContext();

    const [provinceIndex, setProvinceIndex] = useState<number>();
    const [districtIndex, setDistrictIndex] = useState<number>();

    const [address, setAddress] = useState<string>();
    const [name, setName] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();
    const [ward, setWard] = useState<string>();

    const selectProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        setProvinceIndex(document.getElementById('province')?.selectedIndex);
        setProvince(e.target.value);
        setDistrict('');
        setWard('');
    };

    const selectDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
        setDistrictIndex(document.getElementById('district')?.selectedIndex);
        setDistrict(e.target.value);
        setWard('');
    };

    const selectWard = (e: ChangeEvent<HTMLSelectElement>) => {
        setWard(e.target.value);
    };

    useEffect(() => {
        const home = document.querySelector('#home')?.value;
        const name = document.querySelector('#name')?.value;
        const phone = document.querySelector('#phone')?.value;

        setName(name);
        setPhone(phone);
        setAddress(home + ', ' + ward + ', ' + district + ', ' + province);
    }, [ward, district, province]);
    return (
        <>
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
                        <div className="full-size absolute-center flex-col space-y-7">
                            <div className="text-4xl font-bold">
                                Thông tin người nhận
                            </div>

                            <Input
                                name="name"
                                id="name"
                                title="Tên người nhận"
                                placeholder="Nhập tên người nhận"
                                required
                            />

                            <Input
                                name="phone"
                                id="phone"
                                title="Số điện thoại người nhận"
                                placeholder="Nhập số điện thoại người nhận"
                                required
                            />
                            <Input
                                name="home"
                                title="Địa chỉ người nhận"
                                placeholder="Nhập địa chỉ người nhận"
                                required
                                id="home"
                            />
                            <div className="mt-2">
                                <div className="flex flex-row">
                                    <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                        Tỉnh/ Thành phố
                                    </div>
                                    <p className="ml-1 text-red-400">*</p>
                                </div>
                                <select
                                    id="province"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    name="province"
                                    onChange={(e) => selectProvince(e)}
                                >
                                    <option selected disabled>
                                        Chọn Tỉnh/Thành phố
                                    </option>
                                    {data.data?.map((item) => {
                                        return (
                                            <option
                                                key={item.level1_id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mt-2">
                                <div className="flex flex-row">
                                    <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                        Quận/Huyện
                                    </div>
                                    <p className="ml-1 text-red-400">*</p>
                                </div>

                                <select
                                    id="district"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    name="district"
                                    onChange={(e) => selectDistrict(e)}
                                >
                                    <option selected disabled>
                                        Chọn Quận/Huyện
                                    </option>
                                    {data.data[provinceIndex - 1]?.level2s?.map(
                                        (item) => {
                                            return (
                                                <option
                                                    key={item.level2_id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        },
                                    )}
                                </select>
                            </div>

                            <div className="mt-2">
                                <div className="flex flex-row">
                                    <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                        Phường/Xã
                                    </div>
                                    <p className="ml-1 text-red-400">*</p>
                                </div>

                                <select
                                    id="ward"
                                    className="mb-12 h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    name="ward"
                                    onChange={(e) => selectWard(e)}
                                >
                                    <option selected disabled>
                                        Chọn Phường/Xã
                                    </option>
                                    {data.data[provinceIndex - 1]?.level2s[
                                        districtIndex - 1
                                    ]?.level3s.map((item) => {
                                        return (
                                            <option
                                                key={item.level3_id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
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
                        <div className="absolute-center h-full w-full flex-col">
                            <CheckOut
                                name={name}
                                phone={phone}
                                address={address}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PaymentPage;
