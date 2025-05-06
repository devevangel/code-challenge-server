import * as model from "../models/product.model.js";
import { BadRequestError, NotFoundError } from "../utils/index.js";

/**
 * @description
 * Retrieves all products from the database, with optional filters.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
export const listProducts = async (req, res, next) => {
  try {
    const {
      name,
      cost,
      costOp,
      sales,
      salesOp,
      page = 1,
      limit = 10,
    } = req.query;
    let data;

    if (name) {
      data = await model.searchProductsByName(name);
    } else if (cost !== null || sales !== null) {
      data = await model.filterProducts({
        cost: cost != null ? Number(cost) : undefined,
        costOp,
        sales: sales != null ? Number(sales) : undefined,
        salesOp,
      });
    } else {
      data = await model.getAllProducts();
    }

    res.status(200).json({
      status: "success",
      dataCount: data?.length,
      data,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  }
};

/**
 * @description
 * Retrieves a single product by its id from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Product ID is required");
    }

    const product = await model.getProductById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    next(error);
  }
};

/**
 * @description
 * Creates a new product in the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
export const addProduct = async (req, res, next) => {
  try {
    const { name, unitCost, totalSales, inventory, description, imageUrl } =
      req.body;

    if (
      !name ||
      unitCost == undefined ||
      totalSales == undefined ||
      inventory === undefined ||
      description === undefined ||
      imageUrl === undefined
    )
      throw new BadRequestError("All fields are required");

    const newProduct = await model.createProduct({
      name,
      unitCost: Number(unitCost),
      totalSales: Number(totalSales),
      inventory: Number(inventory),
      description,
      imageUrl,
    });

    if (!newProduct)
      throw new BadRequestError(
        "Failed to create product, please check that product does not already exist"
      );

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  }
};

/**
 * @description
 * Updates a product in the database with given updates.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) throw new BadRequestError("Product ID is required");

    const updatedProduct = await model.updateProductById(id, updates);
    if (!updatedProduct) throw new BadRequestError("Failed to update product");

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  }
};

/**
 * Deletes a product from the database with the given id.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Product ID is required");

    const deleted = await model.deleteProductById(id);
    if (!deleted) throw new BadRequestError("Failed to delete product");

    res.status(200).json({
      status: "success",
      data: {
        message: "Product deleted successfully",
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  }
};
