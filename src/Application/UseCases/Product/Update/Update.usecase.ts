import { UseCase, UseCaseArgs } from "@Domain/Model";
import { UpdateInputData } from "./UpdateInputData";
import { ProductRepository, TransactionalRepository } from "@Domain/Repository";
import { NotFoundDataExeption } from "@Domain/Exceptions";


export class UpdateUseCase implements UseCase<UpdateInputData, boolean> {
    constructor(private readonly _transactionalRepository: TransactionalRepository,
        private readonly _producRepository: ProductRepository) { }

    public run = async (args: UseCaseArgs<UpdateInputData>): Promise<boolean> => {
        const { id_product, ...data } = args.data

        const product = await this._producRepository.getById(id_product)
        if (product === null) throw new NotFoundDataExeption(`No se encontro un file con el id: ${id_product}`)

        await this._transactionalRepository.inTransaction(async (transaction) => {
            const updateProduct = await this._producRepository.update({
                id_product_state: data.id_rpduct_state ?? product.id_product_state,
                name: data.name ?? product.name,
                img_url: product.img_url,
                price: data.price ?? product.price,
                description: data.description ?? product.description,
                category: data.category ?? product.category,
                stock: data.stock ?? product.stock
            }, {
                transaction
            })
        })

        return true;
    }
}