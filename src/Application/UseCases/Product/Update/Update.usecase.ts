import { UseCase, UseCaseArgs } from "@Domain/Model";
import { UpdateInputData } from "./UpdateInputData";
import { ProductRepository, TransactionalRepository, UserRoleExecutionRepository } from "@Domain/Repository";
import { NotFoundDataExeption, UnauthorizedException } from "@Domain/Exceptions";
import { RoleExecutionEnum } from "@Domain/Enums";
export class UpdateUseCase implements UseCase<UpdateInputData, boolean> {
    constructor(private readonly _transactionalRepository: TransactionalRepository,
        private readonly _userRoleExecutionRepository: UserRoleExecutionRepository,
        private readonly _producRepository: ProductRepository) { }

    public run = async (args: UseCaseArgs<UpdateInputData>): Promise<boolean> => {
        const { id_user, id_product, ...data } = args.data

        // Validar rol 
        const user = await this._userRoleExecutionRepository.getByIdUser(id_user)
        if (user.id_role !== RoleExecutionEnum.ADMIN) throw new UnauthorizedException('Rol no tiene los permisos necesario, accion permitida solo para cuenta administradora')

        const product = await this._producRepository.getById(id_product)
        if (product === null) throw new NotFoundDataExeption(`No se encontro producto con el id: ${id_product}`)

        await this._transactionalRepository.inTransaction(async (transaction) => {
            await this._producRepository.update({
                id_product: id_product ?? product.id_product,
                id_product_state: data.id_product_state ?? product.id_product_state,
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