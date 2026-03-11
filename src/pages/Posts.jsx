import { useState, useEffect } from "react";
import { postsAPI } from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.get("/posts/", {
    params: {
        page,
        limit,
        search: search || undefined,
    },
    });
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts.");
    }
  };

  const handleAddPost = async () => {
    setLoading(true);
    setError("");
    try {
      await postsAPI.post("/posts/", {
        title,
        content,
        category,
        is_published: true,
      });
      setTitle("");
      setContent("");
      setCategory("");
      fetchPosts();
    } catch (err) {
      setError("Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await postsAPI.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      setError("You can only delete your own posts!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Posts</h2>

      {error && <p style={styles.error}>{error}</p>}

      {/* Add Post Form */}
      <div style={styles.form}>
        <h3>Add New Post</h3>
        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <input
          style={styles.input}
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddPost} disabled={loading}>
          {loading ? "Adding..." : "Add Post"}
        </button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          style={styles.input}
          placeholder="🔍 Search posts by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Posts List */}
      <div style={styles.list}>
        {posts.length === 0 ? (
          <p style={styles.empty}>No posts found. Add one above!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.card}>
              <div>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postInfo}>🏷️ {post.category || "No category"}</p>
                <p style={styles.postContent}>{post.content}</p>
                <p style={styles.postMeta}>
                  👤 {post.owner_email} • 🕐 {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <button style={styles.deleteButton} onClick={() => handleDelete(post.id)}>
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
        <div style={styles.pagination}>
        <button
            style={{
            ...styles.pageButton,
            opacity: page === 1 ? 0.4 : 1,
            cursor: page === 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
        >
            ← Previous
        </button>
        <span style={styles.pageNumber}>Page {page}</span>
        <button
            style={{
            ...styles.pageButton,
            opacity: posts.length < limit ? 0.4 : 1,
            cursor: posts.length < limit ? "not-allowed" : "pointer",
            }}
            onClick={() => setPage((p) => p + 1)}
            disabled={posts.length < limit}
        >
            Next →
        </button>
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
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    resize: "vertical",
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
  searchBar: {
    marginBottom: "20px",
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
  postTitle: {
    margin: "0 0 8px 0",
    color: "#1a1a2e",
  },
  postContent: {
    margin: "8px 0",
    color: "#555",
  },
  postInfo: {
    margin: "4px 0",
    color: "#888",
    fontSize: "14px",
  },
  postMeta: {
    margin: "8px 0 0 0",
    color: "#aaa",
    fontSize: "13px",
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
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
  },
  pageButton: {
    padding: "10px 20px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  pageNumber: {
    color: "#1a1a2e",
    fontWeight: "bold",
    fontSize: "16px",
  },
  error: {
    color: "red",
  },
  empty: {
    color: "#888",
    textAlign: "center",
  },
};

export default Posts;