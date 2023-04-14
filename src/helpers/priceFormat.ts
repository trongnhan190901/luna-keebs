const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const priceFormat = (price: number) => {
    return VND.format(price);
};
