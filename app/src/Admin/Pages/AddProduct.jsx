import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";
import Cookies from "js-cookie";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    stars: 0,
  });

  const navigate = useNavigate();
  const { setProducts, setLoading } = useContext(ShopContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "stars" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevValues) => ({
      ...prevValues,
      image: e.target.files[0], // File object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.price && formData.image) {
      try {
        setLoading(true);

        // Set up FormData for file upload
        const formPayload = new FormData();
        formPayload.append("name", formData.name);
        formPayload.append("description", formData.description);
        formPayload.append("price", formData.price);
        formPayload.append("image", formData.image); // File object
        formPayload.append("category", formData.category);
        formPayload.append("stars", formData.stars);

        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token is missing.");
        }

        const res = await axios.post("http://localhost:3002/admin/products", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: 0,
          image: null,
          category: "",
          stars: 0,
        });

        navigate("/items");
        setProducts((prev) => [...prev, res.data.data]);
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Failed to add product. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Please fill in all required fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block font-semibold" htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

