import db from "../db/index.js";
import { nanoid } from "nanoid";

/**
 * Retrieves all products from the database.
 * @returns {Array<Object>} - An array of all products in the database.
 */
export const getAllProducts = async () => {
  await db.read();
  return db.data.products;
};

/**
 * Retrieves a single product from the database by its id.
 * @param {string} id - Id of the product to retrieve.
 * @returns {Object} - The product with the given id if found, otherwise undefined.
 */
export const getProductById = async (id) => {
  await db.read();
  return db.data.products.find((product) => product.id === id);
};

/**
 * Creates a new product in the database.
 * @param {{ name: string, unitCost: number, totalSales: number, inventory: number, description: string, imageUrl: string }} productData - Data for the product to be created.
 * @returns {Object} - The newly created product.
 */
export const createProduct = async ({
  name,
  unitCost,
  totalSales,
  inventory,
  description,
  imageUrl,
}) => {
  await db.read();
  const newProduct = {
    id: nanoid(),
    name,
    unitCost,
    totalSales,
    inventory,
    description,
    imageUrl,
  };

  db.data.products.push(newProduct);
  await db.write();
  return newProduct;
};

/**
 * Updates a single product in the database with the given id.
 * @param {string} id - Id of the product to update.
 * @param {{ name: string, unitCost: number, totalSales: number, inventory: number }} updates - Data to update the product with.
 * @returns {Object} - The updated product.
 */
export const updateProductById = async (id, updates) => {
  await db.read();
  const productIndex = db.data.products.findIndex(
    (product) => product.id === id
  );
  if (productIndex === -1) return null;
  db.data.products[productIndex] = {
    ...db.data.products[productIndex],
    ...updates,
  };
  await db.write();
  return db.data.products[productIndex];
};

/**
 * Deletes a product from the database with the given id.
 * @param {string} id - Id of the product to delete.
 * @returns {boolean} - True if the product was found and deleted, otherwise false.
 */
export const deleteProductById = async (id) => {
  await db.read();
  const before = db.data.products.length;
  db.data.products = db.data.products.filter((product) => product.id !== id);
  await db.write();
  return db.data.products.length < before;
};

/**
 * Searches all products in the database by name.
 * @param {string} name - Name to search for.
 * @returns {Array<Object>} - Array of products with names matching the given name.
 */
export const searchProductsByName = async (name) => {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
};

/**
 * Filters all products in the database by cost and/or total sales.
 * @param {{ cost: number, costOp: string, sales: number, salesOp: string }} options
 *   - cost: The cost to filter by.
 *   - costOp: The operator to use for the cost filter. Defaults to "gt".
 *     - "gt": Greater than.
 *     - "gte": Greater than or equal to.
 *     - "lt": Less than.
 *     - "lte": Less than or equal to.
 *   - sales: The total sales to filter by.
 *   - salesOp: The operator to use for the total sales filter. Defaults to "gt".
 *     - "gt": Greater than.
 *     - "gte": Greater than or equal to.
 *     - "lt": Less than.
 *     - "lte": Less than or equal to.
 * @returns {Array<Object>} - An array of products that match the given filters.
 */
export const filterProducts = async ({
  cost,
  costOp = "gt",
  sales,
  salesOp = "gt",
}) => {
  let results = await getAllProducts();

  if (cost !== undefined) {
    results = results.filter((product) => {
      if (costOp === "gt") return product.unitCost > cost;
      if (costOp === "gte") return product.unitCost >= cost;
      if (costOp === "lt") return product.unitCost < cost;
      if (costOp === "lte") return product.unitCost <= cost;
    });
  }

  if (sales !== undefined) {
    results = results.filter((product) => {
      if (salesOp === "gt") return product.totalSales > sales;
      if (salesOp === "gte") return product.totalSales >= sales;
      if (salesOp === "lt") return product.totalSales < sales;
      if (salesOp === "lte") return product.totalSales <= sales;
    });
  }

  return results;
};
