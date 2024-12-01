import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        stars: 0,
    });
    const { fetchdata } = useContext(UserContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'stars' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.description && formData.price) {
            try {
                await axios.post('http://localhost:4000/products', formData);
                toast("Product added successfully!");
                fetchdata();
                setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    image: '',
                    category: '',
                    stars: 0,
                });
                navigate('/');
            } catch (error) {
                console.error("Error adding product:", error);
                toast("Failed to add product. Please try again.");
            }
        } else {
            toast("Please fill in all required fields.");
        }
    };
    const Saveproduct=()=>{
        toast('save the new product successfully');
        navigate('/items')
    }

    return (
        <div className=" mx-auto mt-10 p-4 border rounded shadow-lg">
       
            <h1 className="text-3xl font-bold mb-4 text-center">Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Enter product price"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Enter product image URL"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Enter product category"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-semibold" htmlFor="stars">Star Rating</label>
                        <input
                            type="number"
                            id="stars"
                            name="stars"
                            value={formData.stars}
                            onChange={handleInputChange}
                            placeholder="Enter star rating"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <div className=" flex flex-row justify-center items-center">
                <button  onSubmit={Saveproduct} type="submit" className="w-1/4 bg-green-600 text-white p-2 rounded ">Save</button>
                </div>
            </form>
         </div>
       
    );
};

export default AddProduct;