
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import "bootstrap/dist/css/bootstrap.min.css";
import { addMenu, deleteMenu, fetchMenus } from "../features/redux/menuSlice";
import { fetchCategories,deleteCategory, addCategory, } from "../features/redux/categorySlice";

export default function MenuManagement() {
  const dispatch = useDispatch();
  const [view, setView] = useState("items");

  // Redux states
  const { items: menus, loading: loadingMenus, error: errorMenus } = useSelector(
    (state) => state.menus
  );
  const {
    items: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (view === "items") {
      dispatch(fetchMenus());
    } else if (view === "categories") {
      dispatch(fetchCategories());
    }
  }, [dispatch, view]);

  // Handlers for menus
  const handleDeleteMenu = (id) => {
    if (window.confirm("Delete this menu item?")) {
      dispatch(deleteMenu(id));
    }
  };
  const handleAddMenu = () => {
    const newItem = {
      restaurant_id: 1,
      category_id: categories.length > 0 ? categories[0].id : 1, // assign first category or default 1
      item_name: "New Test Item",
      description: "Tasty item",
      image_url: "/assets/images/test.jpg",
      price: 9.99,
      rating: 4.5,
      status: "active",
    };
    dispatch(addMenu(newItem));
  };

  // Handlers for categories
  const handleDeleteCategory = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };
  const handleAddCategory = () => {
    const newCat = {
      cat_name: "New Category",
      status: "active",
    };
    dispatch(addCategory(newCat));
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Menu Management</h2>
        <div className="d-flex gap-4">
          <button
            className={`fw-semibold ${
              view === "categories"
                ? "border-bottom border-2 border-dark pb-1"
                : "text-secondary"
            }`}
            onClick={() => setView("categories")}
          >
            Categories
          </button>
          <button
            className={`fw-semibold ${
              view === "items"
                ? "border-bottom border-2 border-dark pb-1"
                : "text-secondary"
            }`}
            onClick={() => setView("items")}
          >
            Items
          </button>
        </div>
      </div>

      {view === "items" && (
        <>
          {loadingMenus && <p>Loading menu items...</p>}
          {errorMenus && <p className="text-danger">{errorMenus}</p>}

          <div className="table-responsive">
            <table className="table align-middle table-striped shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>
                    <td>{item.category_name || item.category_id}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>
                      <img
                        src={item.image_url}
                        alt={item.item_name}
                        className="rounded-circle"
                        width="40"
                        height="40"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "active" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteMenu(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleAddMenu}>
              Add Item
            </button>
          </div>
        </>
      )}

      {view === "categories" && (
        <>
          {loadingCategories && <p>Loading categories...</p>}
          {errorCategories && <p className="text-danger">{errorCategories}</p>}

          <div className="table-responsive">
            <table className="table align-middle table-striped shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.cat_name}</td>
                    <td>
                      <span
                        className={`badge ${
                          cat.status === "active" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        disabled
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCategory(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </>
      )}
    </div>
  );
}
