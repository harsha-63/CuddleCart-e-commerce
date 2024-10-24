import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import { ShopContext } from "../../Context/ShopContext";

const Edit = () => {
    const { id } = useParams();
    const { products, setProducts } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const navigate=useNavigate()

    useEffect(() => {
        if (products) {
            const foundProduct = products.find(item => item.id === id);
            setProduct(foundProduct);
            if (foundProduct) {
                setName(foundProduct.name);
                setDescription(foundProduct.description);
                setImage(foundProduct.image);
                setPrice(foundProduct.price);
            }
        }
    }, [id, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'image') {
            setImage(value);
        } else if (name === 'price') {
            setPrice(value);
        }
    };

    const saveProduct = async () => {
        if (product) {
            try {
                const updatedProduct = { ...product, name, description, image, price: parseFloat(price) };
                await axios.patch(`http://localhost:4000/products/${product.id}`, updatedProduct);
                setProducts(prevProducts =>
                    prevProducts.map(p => (p.id === product.id ? updatedProduct : p))
                );
                toast("Product updated successfully");
                navigate('/items')
            } catch (error) {
                console.log("Failed to update:", error);
            }
        }
    };

    const handleDelete = async (productId) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;
        try {
            await axios.delete(`http://localhost:4000/products/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
            toast('Product deleted successfully');
        } catch (error) {
            console.error('Failed to delete the product', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center items-center">
                <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl w-full md:w-2/3 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <img 
                            src={product?.image || 'default-image-url.jpg'} 
                            alt={product?.name} 
                            className="w-full h-64 object-cover rounded-lg" 
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-lg font-bold mb-4">Edit Product: {product?.name}</h2>
                        
                        <div className="mt-2">
                            <span className="block text-center font-semibold">Name</span>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="text-center border rounded py-2 px-4 w-full"
                                placeholder="Enter new name"
                            />
                        </div>

                        <div className="mt-2">
                            <span className="block text-center font-semibold">Description</span>
                            <textarea
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                className="border rounded py-2 px-4 w-full h-24"
                                placeholder="Enter new description"
                            />
                        </div>

                        <div className="mt-2">
                            <span className="block text-center font-semibold">Image URL</span>
                            <input
                                type="text"
                                name="image"
                                value={image}
                                onChange={handleInputChange}
                                className="text-center border rounded py-2 px-4 w-full"
                                placeholder="Enter new image URL"
                            />
                        </div>

                        <div className="mt-2">
                            <span className="block text-center font-semibold">Price</span>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={handleInputChange}
                                className="text-center border rounded py-2 px-4 w-full"
                                placeholder="Enter new price"
                            />
                        </div>

                        <div className="mt-4 flex justify-between gap-4">
                            <button
                                onClick={saveProduct}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => handleDelete(product?.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;