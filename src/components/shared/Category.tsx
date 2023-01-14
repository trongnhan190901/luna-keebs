import CategorySlider from './CategorySlider';
const Category = () => {
    return (
        <>
            <div className="absolute-center h-full w-full">
                <div className="mt-5 h-full w-[90%] bg-green-100">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Danh mục
                    </h2>
                    <div className="my-5 h-[30rem] w-full bg-blue-200">
                        <CategorySlider />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Category;
