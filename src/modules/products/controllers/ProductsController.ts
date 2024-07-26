import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<> {
    const listProducts = new ListProductService();

    const product = listProducts.execute()

    return response.json(product)
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;


  }


}
