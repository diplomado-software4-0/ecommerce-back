import { UseCase, UseCaseArgs } from "@Domain/Model";
import { AddInputData } from "./AddInputData";
import { ProductRepository, TransactionalRepository } from "@Domain/Repository";
import { ProductValue } from "@Domain/Values";

export class AddUseCase implements UseCase<AddInputData, boolean> {
    constructor(private readonly _transactionalRepository: TransactionalRepository,
        private readonly _productRepository: ProductRepository) { }

    public run = async (args: UseCaseArgs<AddInputData>): Promise<boolean> => {
        const { ...data } = args.data

        await this._transactionalRepository.inTransaction(async (transaction) => {
            const productData = new ProductValue({
                name: data.name,
                img_url: data.name,
                price: data.price,
                description: data.description,
                category: data.category,
                stock: data.stock,
                is_available: true
            })

            await this._productRepository.add(productData, { transaction })
        })

        return true
    }
}