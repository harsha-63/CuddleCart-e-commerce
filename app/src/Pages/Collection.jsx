import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Collection = () => {
    const { products, categories, selectedCategory, setSelectedCategory, showSearch, search } = useContext(ShopContext);

    const filteredProducts = () => {
        let filtered = products || [];

        // Filter for selected category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        // Filter for search term
        if (showSearch && search) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        return filtered;
    };

    return (
        <>
            <div className="mt-16">
                <div className="flex flex-row gap-10 sm:flex-row justify-between  mb-6 sm:mb-14 ">
                    <h1 className="text-3xl sm:text-5xl mb-4 sm:mb-0 text-center"> Collections__</h1>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border border-gray-600 rounded mr-10 mb-1"
                    >
                        <option value="all">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts().map((product) => (
                    <NavLink key={product._id} to={`/product/${product._id}`} className="flex flex-col">
                        <div className="border p-4 rounded shadow hover:shadow-xl flex flex-col justify-between w-full h-full transition duration-300 ease-in-out">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
                            <h2 className="text-lg font-bold truncate">{product.name}</h2>
                            <p className="text-gray-700 mt-1">${product.price.toFixed(2)}</p>
                            <span className=""></span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default Collection;



