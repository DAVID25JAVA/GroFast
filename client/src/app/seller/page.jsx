"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/UI/button";
import { UploadCloud, X } from "lucide-react";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";
import toast from "react-hot-toast";

function Page() {
  const { setIsLoading } = useUser();

  // 4 image slots
  const [images, setImages] = useState([null, null, null, null]);
  const [product, setProduct] = useState({
    tittle: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  // image upload per slot
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { file, preview };
      return updated;
    });
  };

  // remove image
  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      if (updated[index]?.preview) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated[index] = null;
      return updated;
    });
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => img?.preview && URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validImages = images.filter(Boolean);

    if (!validImages.length) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append(
        "productData",
        JSON.stringify({
          tittle: product.tittle,
          description: product.description,
          category: product.category,
          price: product.price,
          offerPrice: product.offerPrice,
        })
      );

      validImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await Api("post", "/product/add", formData);
      console.log("res-->", res);
      

      if (res.success) {
        toast.success(res.message);
        setProduct({
          tittle: "",
          description: "",
          category: "",
          price: "",
          offerPrice: "",
        });
        setImages([null, null, null, null]);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-6 max-w-lg">
        {/* Images */}
        <div>
          <p className="text-base font-medium mb-2">Product Images</p>

          <div className="flex gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-dashed rounded bg-gray-50 flex items-center justify-center"
              >
                {img ? (
                  <>
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full flex items-center justify-center cursor-pointer">
                    <UploadCloud className="text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={product.tittle}
          onChange={(e) =>
            setProduct({ ...product, tittle: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
          required
        />

        {/* Description */}
        <textarea
          rows={4}
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="border rounded px-3 py-2 w-full resize-none"
        />

        {/* Category */}
        <select
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Vegitales">Vegitales</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Prices */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Offer Price"
            value={product.offerPrice}
            onChange={(e) =>
              setProduct({ ...product, offerPrice: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        {/* <Button type="submit" className="bg-primary text-white w-full">
          Add Product
        </Button> */}
        <button className="bg-primary text-base cursor-pointer text-white px-5 py-2 rounded-md" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Page;
