import {
  createProduct,
  getAllProducts,
  deleteProductById,
  getProductById,
  updateProductById,
} from "../models/product.model.js";
import db from "../db/index.js";

describe("Product Model", () => {
  // Reset the database before each test
  beforeEach(async () => {
    await db.read();
    db.data.products = [];
    await db.write();
  });

  test("should create a new product successfully", async () => {
    const newProduct = await createProduct({
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
    });

    expect(newProduct).toHaveProperty("id");
    expect(newProduct.name).toBe("Test Product");
    expect(newProduct.unitCost).toBe(10);
    expect(newProduct.totalSales).toBe(0);
    expect(newProduct.inventory).toBe(10);

    const allProducts = await getAllProducts();
    expect(allProducts.length).toBe(1);
    expect(allProducts[0]).toMatchObject(newProduct);
  });

  test("should delete a product successfully", async () => {
    const newProduct = await createProduct({
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
    });

    const deleted = await deleteProductById(newProduct.id);
    expect(deleted).toBe(true);

    const allProducts = await getAllProducts();
    expect(allProducts.length).toBe(0);
  });

  test("should get a product by id successfully", async () => {
    const newProduct = await createProduct({
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
    });
    const product = await getProductById(newProduct.id);
    expect(product).not.toBeNull();
    expect(product.name).toBe("Test Product");
    expect(product.unitCost).toBe(10);
    expect(product.totalSales).toBe(0);
    expect(product.inventory).toBe(10);
  });

  test("should update a product successfully", async () => {
    const newProduct = await createProduct({
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
    });

    const updatedProduct = await updateProductById(newProduct.id, {
      name: "Updated Product",
    });

    expect(updatedProduct).not.toBeNull();
    expect(updatedProduct.name).toBe("Updated Product");
    expect(updatedProduct.unitCost).toBe(10);
    expect(updatedProduct.totalSales).toBe(0);
    expect(updatedProduct.inventory).toBe(10);

    const product = await getProductById(newProduct.id);
    expect(product.name).toBe("Updated Product");
  });
});
