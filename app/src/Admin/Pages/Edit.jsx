import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utilities/axiosInstance";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";

const Edit = () => {
    const { id } = useParams();
    const { products, setProducts } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (products) {
            const foundProduct = products.find(item => item._id === id);
            setProduct(foundProduct);
            if (foundProduct) {
                setName(foundProduct.name);
                setDescription(foundProduct.description);
                setPrice(foundProduct.price);
                setImage(foundProduct.image);
                setImagePreview(foundProduct.image);
            }
        }
    }, [id, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "price") {
            setPrice(value);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log("Selected file:", file.name); // This will show the file name
        }
    };

    const saveProduct = async () => {
        if (product) {
            try {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", parseFloat(price));
                if (image) {
                    formData.append("image", image);
                }

               

                const response = await axiosInstance.patch(
                    `/admin/products/${id}`,
                    formData,
                );

                const updatedProduct = response.data;
                setProducts(prevProducts =>
                    prevProducts.map(p => (p._id === product._id ? updatedProduct : p))
                );

                toast.success("Product updated successfully!");
                navigate("/items");
            } catch (error) {
                console.error("Failed to update product:", error);
                toast.error("Failed to update product.");
            }
        }
    };

    const handleDeleteOrRestore = async () => {
        const confirm = window.confirm(
            `Are you sure you want to ${product.isDeleted ? "restore" : "delete"} this product?`
        );
        if (!confirm) return;

        try {

            const updatedProduct = { ...product, isDeleted: !product.isDeleted };
            await axiosInstance.patch(
                `/admin/products/${id}`,
                { isDeleted: updatedProduct.isDeleted },
            );

         
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p._id === product._id ? { ...p, isDeleted: updatedProduct.isDeleted } : p
                )
            );

            toast.success(
                `Product ${updatedProduct.isDeleted ? "deleted" : "restored"} successfully!`
            );
            navigate("/items");
        } catch (error) {
            console.error("Failed to delete or restore product:", error);
            toast.error("Failed to delete or restore product.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl w-full md:w-3/4 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                    <img
                        src={imagePreview || "default-image-url.jpg"}
                        alt={name}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-lg font-bold mb-4">Edit Product: {name}</h2>
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
                        <span className="block text-center font-semibold">Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-center border rounded py-2 px-4 w-full"
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

                        {/* Button for deleting or restoring the product */}
                        <button
                            onClick={handleDeleteOrRestore}
                            className={`${
                                product && product.isDeleted
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                            } text-white py-2 px-4 rounded-lg w-full`}
                        >
                            {product && product.isDeleted ? "Restore Product" : "Delete Product"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;

