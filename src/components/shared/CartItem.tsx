// import { XMarkIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { FeaturedItem } from '~/constants';

// import { ProductPreview } from '~/types/types';

// interface CartItemProps {
//     product: ProductPreview;
// }

// const CartItem = ({ product }: CartItemProps) => {
//     // const { removeItem } = useShoppingCart();

//     // const item = FeaturedItem.find((i) => i.id === product.id);
//     if (item == null) return null;

//     return (
//         <>
//             <div className="mx-14 flex h-full w-full flex-col pt-8">
//                 <div className="flex w-full flex-row border-b px-14 pb-14 pt-8">
//                     <img
//                         src={item?.img}
//                         alt=""
//                         className="absolute-center h-40 w-40 object-cover"
//                     />
//                     <div className="mt-2 w-full px-6 font-primary font-bold text-gray-700">
//                         <div className="flex w-full">
//                             <Link href={item?.href}>
//                                 <h2 className="w-full text-4xl hover:scale-105">
//                                     {item?.title}
//                                 </h2>
//                             </Link>

//                             <div
//                                 className="flex w-full justify-end"
//                                 onClick={() => removeItem(item.id)}
//                             >
//                                 <XMarkIcon className="smooth-effect h-10 w-10 stroke-gray-400 hover:scale-105 hover:stroke-black" />
//                             </div>
//                         </div>
//                         {/* <p className="mt-3 text-2xl">Product Type: Keycap</p> */}
//                         <div className="mt-6 flex">
//                             <div className="flex w-full items-center justify-start">
//                                 <ProductQuantity product={item} />
//                             </div>
//                             <div className="flex w-full items-center justify-end font-secondary text-[1.7rem] font-bold">
//                                 ₫ {item?.price}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CartItem;
