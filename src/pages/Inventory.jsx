import { useState, useEffect } from "react";
import { inventoryAPI } from "../api";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await inventoryAPI.get("/inventory/");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products.");
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    setError("");
    try {
      await inventoryAPI.post("/inventory/", {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        is_available: true,
      });
      // Clear the form
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      // Refresh the list
      fetchProducts();
    } catch (err) {
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await inventoryAPI.delete(`/inventory/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏭 Inventory</h2>

      {error && <p style={styles.error}>{error}</p>}

      {/* Add Product Form */}
      <div style={styles.form}>
        <h3>Add New Product</h3>
        <input style={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input style={styles.input} placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input style={styles.input} placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input style={styles.input} placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button style={styles.button} onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      {/* Products List */}
      <div style={styles.list}>
        {products.length === 0 ? (
          <p style={styles.empty}>No products yet. Add one above!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={styles.card}>
              <div>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productInfo}>📦 Category: {product.category || "N/A"}</p>
                <p style={styles.productInfo}>💰 Price: ${product.price}</p>
                <p style={styles.productInfo}>🔢 Quantity: {product.quantity}</p>
                <p style={styles.productInfo}>📝 {product.description || "No description"}</p>
              </div>
              <button style={styles.deleteButton} onClick={() => handleDelete(product.id)}>
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "0 20px",
  },
  title: {
    color: "#1a1a2e",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    margin: "0 0 8px 0",
    color: "#1a1a2e",
  },
  productInfo: {
    margin: "4px 0",
    color: "#555",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
  },
  empty: {
    color: "#888",
    textAlign: "center",
  },
};

export default Inventory;