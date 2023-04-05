/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useState } from 'react';

const ProductQuantity = (props: { sendData: (arg0: number) => void }) => {
    const [count, setCount] = useState<number>(1);
    const [disable, setDisable] = useState(false);

    const inc = () => {
        setCount(count + 1);
        setDisable(false);
    };

    const dec = () => {
        setDisable(false);
        setCount(count - 1);
    };

    useEffect(() => {
        if (count === 1) {
            setDisable(true);
        }

        setCount(count);
        props.sendData(count);
    }, [count, props]);

    return (
        <>
            <div className="flex w-full items-center justify-start">
                <button
                    onClick={dec}
                    disabled={disable}
                    className="absolute-center group h-12 w-12 cursor-pointer rounded-tl-lg rounded-bl-lg border bg-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    <MinusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>

                <input
                    type="number"
                    className="absolute-center h-12 w-20 border text-center font-primary text-[1.7rem] font-bold"
                    value={count}
                />

                <button
                    onClick={inc}
                    className="absolute-center group h-12 w-12 cursor-pointer rounded-tr-lg rounded-br-lg border bg-white hover:bg-gray-700"
                >
                    <PlusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>
            </div>
        </>
    );
};

export default memo(ProductQuantity);
