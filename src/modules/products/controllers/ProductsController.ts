import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const product = await listProducts.execute()

    return response.json(product)
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity} = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity
    });

    return response.json(product)
  }
}
