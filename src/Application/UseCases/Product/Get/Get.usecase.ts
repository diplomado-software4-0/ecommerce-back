import { UseCase, UseCaseArgs } from "@Domain/Model";
import { FilterInputData } from "./FilterInputData";
import { ProductDTO } from "@Application/DTOs/Product.dto";
import { ProductRepository } from "@Domain/Repository";
import { ProductMapper } from "@Application/Mappers";

export class GetUseCase implements UseCase<FilterInputData, ProductDTO> {
    constructor(private readonly _productRepository: ProductRepository) { }


    public run = async (args: UseCaseArgs<FilterInputData>): Promise<ProductDTO> => {
        const { ...data } = args.data;
        let initialPage = 1;
        let initialSize = data.size;

        if (data.use_pagination !== false) {
            if (data.page != null && data.page > 0) {
                initialPage = data.page - 1;
            }

            if (data.size != null && data.size > 0 && data.size <= 10) {
                initialSize = data.size;
            }
        }

        const products = await this._productRepository.get(
            {
                id_product: data.id_product,
                name: data.name,
                category: Number(data.category),
                initial_approximate_price: Number(data.initial_approximate_price),
                final_approximate_price: Number(data.final_approximate_price)
            },
            {
                use_pagination: data.use_pagination,
                page: Number(data.page),
                size: Number(data.size),
            })


        const countItems = await this._productRepository.countAll();
        const countPages = Math.ceil(countItems / initialSize)
        const mapper = ProductMapper.toDTO(products.data)

        return {
            total_items: countItems,
            total_page: countPages,
            products: mapper
        }

    }
}