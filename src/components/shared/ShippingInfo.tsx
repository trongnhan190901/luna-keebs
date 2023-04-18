/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { type ChangeEvent, Fragment, useState } from 'react';
import { newAddressState } from '~/atoms/modalAtom';
import { toast } from 'react-hot-toast';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
import { api } from '~/utils/api';
import data from '~/constants/address.json';
import Input from './Input';

const ShippingInfo = () => {
    const [provinceIndex, setProvinceIndex] = useState<number>();
    const [districtIndex, setDistrictIndex] = useState<number>();

    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();
    const [ward, setWard] = useState<string>();

    const selectProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        setProvinceIndex(document.getElementById('province')?.selectedIndex);
        setProvince(e.target.value);
    };

    const selectDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
        setDistrictIndex(document.getElementById('district')?.selectedIndex);
        setDistrict(e.target.value);
    };

    const selectWard = (e: ChangeEvent<HTMLSelectElement>) => {
        setWard(e.target.value);
    };

    return (
        <>
            <div className="absolute-center z-20 w-full flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                <div
                    // onSubmit={async (e) => {
                    //     e.preventDefault();
                    //     const $form = e.currentTarget;
                    //     const values = Object.fromEntries(new FormData($form));
                    //     type Input = inferProcedureInput<
                    //         AppRouter['user']['addNewAddress']
                    //     >;

                    //     const input: Input = {
                    //         name: values.name as string,
                    //         phone: values.phone as string,
                    //         home: values.home as string,
                    //         province: province as unknown as string,

                    //         district: district as unknown as string,
                    //         ward: ward as unknown as string,
                    //     };

                    //     try {
                    //         await addNewAddress.mutateAsync(input);
                    //         toast.success('Thêm địa chỉ thành công');
                    //         $form.reset();
                    //         setIsOpen(!isOpen);
                    //         refetchData();
                    //     } catch (cause) {
                    //         toast.error('Thêm địa chỉ thất bại');
                    //         console.error({ cause }, 'Failed to add product');
                    //     }
                    // }}
                    className="full-size absolute-center flex-col space-y-7"
                >
                    <div className="text-4xl font-bold">
                        Thông tin người nhận
                    </div>

                    <Input
                        name="name"
                        title="Tên người nhận"
                        placeholder="Nhập tên người nhận"
                        required
                    />

                    <Input
                        name="phone"
                        title="Số điện thoại người nhận"
                        placeholder="Nhập số điện thoại người nhận"
                        required
                    />
                    <Input
                        name="home"
                        title="Địa chỉ người nhận"
                        placeholder="Nhập địa chỉ người nhận"
                        required
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
        </>
    );
};

export default ShippingInfo;
