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
    }
}