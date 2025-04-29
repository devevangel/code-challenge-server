import request from "supertest";
import app from "../app.js";
import db from "../db/index.js";

describe("Product Routes", () => {
  beforeEach(async () => {
    await db.read();
    db.data.products = [];
    await db.write();
  });

  test("POST /api/products should create a new product", async () => {
    const newProduct = {
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
      description: "Test description",
      imageUrl: "https://example.com/image.jpg",
    };

    const res = await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send(newProduct);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe(newProduct.name);
    expect(res.body.data.unitCost).toBe(newProduct.unitCost);
    expect(res.body.data.totalSales).toBe(newProduct.totalSales);
    expect(res.body.data.inventory).toBe(newProduct.inventory);
    expect(res.body.data.description).toBe(newProduct.description);
    expect(res.body.data.imageUrl).toBe(newProduct.imageUrl);
  });

  test("GET /api/products should get all products", async () => {
    const newProduct = {
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
      description: "Test description",
      imageUrl: "https://example.com/image.jpg",
    };

    await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send(newProduct);

    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body.dataCount).toBe(1);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0]).toHaveProperty("id");
    expect(res.body.data[0].name).toBe(newProduct.name);
    expect(res.body.data[0].unitCost).toBe(newProduct.unitCost);
    expect(res.body.data[0].totalSales).toBe(newProduct.totalSales);
    expect(res.body.data[0].inventory).toBe(newProduct.inventory);
    expect(res.body.data[0].description).toBe(newProduct.description);
    expect(res.body.data[0].imageUrl).toBe(newProduct.imageUrl);
  });

  test("GET /api/products/:id should get a product by id", async () => {
    const newProduct = {
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
      description: "Test description",
      imageUrl: "https://example.com/image.jpg",
    };

    const createdProduct = await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send(newProduct);

    const res = await request(app).get(
      `/api/products/${createdProduct.body.data.id}`
    );

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe(newProduct.name);
    expect(res.body.data.unitCost).toBe(newProduct.unitCost);
    expect(res.body.data.totalSales).toBe(newProduct.totalSales);
    expect(res.body.data.inventory).toBe(newProduct.inventory);
    expect(res.body.data.description).toBe(newProduct.description);
    expect(res.body.data.imageUrl).toBe(newProduct.imageUrl);
  });

  test("PUT /api/products/:id should update a product by id", async () => {
    const newProduct = {
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
      description: "Test description",
      imageUrl: "https://example.com/image.jpg",
    };

    const createdProduct = await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send(newProduct);

    const productId = createdProduct.body.data.id;
    const updatedProduct = {
      name: "Updated Product",
      unitCost: 20,
      totalSales: 5,
      inventory: 15,
      description: "Updated description",
      imageUrl: "https://example.com/updated-image.jpg",
    };

    const update = await request(app)
      .put(`/api/products/${productId}`)
      .set("Content-Type", "application/json")
      .send(updatedProduct);

    expect(update.status).toBe(200);
    expect(update.body.data).toHaveProperty("id");
    expect(update.body.data.name).toBe(updatedProduct.name);
    expect(update.body.data.unitCost).toBe(updatedProduct.unitCost);
    expect(update.body.data.totalSales).toBe(updatedProduct.totalSales);
    expect(update.body.data.inventory).toBe(updatedProduct.inventory);
    expect(update.body.data.description).toBe(updatedProduct.description);
    expect(update.body.data.imageUrl).toBe(updatedProduct.imageUrl);

    const getRes = await request(app).get(`/api/products/${productId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data).toHaveProperty("id");
    expect(getRes.body.data.name).toBe(updatedProduct.name);
    expect(getRes.body.data.unitCost).toBe(updatedProduct.unitCost);
    expect(getRes.body.data.totalSales).toBe(updatedProduct.totalSales);
    expect(getRes.body.data.inventory).toBe(updatedProduct.inventory);
    expect(getRes.body.data.description).toBe(updatedProduct.description);
    expect(getRes.body.data.imageUrl).toBe(updatedProduct.imageUrl);
  });

  test("DELETE /api/products/:id should delete a product by id", async () => {
    const newProduct = {
      name: "Test Product",
      unitCost: 10,
      totalSales: 0,
      inventory: 10,
      description: "Test description",
      imageUrl: "https://example.com/image.jpg",
    };

    const createdProduct = await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send(newProduct);

    const productId = createdProduct.body.data.id;

    const deleteRes = await request(app).delete(`/api/products/${productId}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.data).toHaveProperty(
      "message",
      "Product deleted successfully"
    );
  });

  test("GET /api/products with name query should get a product by name", async () => {
    await request(app).post("/api/products").send({
      name: "Laptop",
      unitCost: 1000,
      totalSales: 1500,
      inventory: 20,
      description: "Laptop description",
      imageUrl: "https://example.com/laptop.jpg",
    });
    await request(app).post("/api/products").send({
      name: "Phone",
      unitCost: 1000,
      totalSales: 1000,
      inventory: 50,
      description: "Phone description",
      imageUrl: "https://example.com/phone.jpg",
    });

    const res = await request(app).get("/api/products?name=Laptop");

    expect(res.status).toBe(200);
    expect(res.body.dataCount).toBe(1);
    expect(res.body.status).toBe("success");
    expect(res.body.data[0].name).toBe("Laptop");
  });

  test("GET /api/products with cost filter should filter products by cost", async () => {
    await request(app).post("/api/products").send({
      name: "Laptop",
      unitCost: 1000,
      totalSales: 1500,
      inventory: 20,
      description: "Laptop description",
      imageUrl: "https://example.com/laptop.jpg",
    });
    await request(app).post("/api/products").send({
      name: "Phone",
      unitCost: 1500,
      totalSales: 1000,
      inventory: 50,
      description: "Phone description",
      imageUrl: "https://example.com/phone.jpg",
    });

    const res = await request(app).get("/api/products?cost=1000&costOp=lte");

    expect(res.status).toBe(200);
    expect(res.body.dataCount).toBe(1);
    expect(res.body.status).toBe("success");
    expect(res.body.data[0].name).toBe("Laptop");
  });

  test("GET /api/products with sales filter should filter products by sales", async () => {
    await request(app).post("/api/products").send({
      name: "Laptop",
      unitCost: 800,
      totalSales: 50,
      inventory: 20,
      description: "Laptop description",
      imageUrl: "https://example.com/laptop.jpg",
    });
    await request(app).post("/api/products").send({
      name: "Phone",
      unitCost: 500,
      totalSales: 80,
      inventory: 30,
      description: "Phone description",
      imageUrl: "https://example.com/phone.jpg",
    });

    const res = await request(app).get("/api/products?sales=60&salesOp=gt");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.dataCount).toBe(1);
    expect(res.body.data[0].name).toBe("Phone");
  });
});
