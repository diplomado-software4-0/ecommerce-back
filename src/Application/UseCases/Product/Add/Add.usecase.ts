import { StorageBase, UseCase, UseCaseArgs } from "@Domain/Model";
import { AddInputData } from "./AddInputData";
import { ProductRepository, TransactionalRepository } from "@Domain/Repository";
import { ProductValue } from "@Domain/Values";
import { InvalidFromatExeption, NotFoundFileRequestExeption } from "@Domain/Exceptions";

export class AddUseCase implements UseCase<AddInputData, boolean> {
    constructor(private readonly _transactionalRepository: TransactionalRepository,
        private readonly _storageBase: StorageBase,
        private readonly _productRepository: ProductRepository) { }

    public run = async (args: UseCaseArgs<AddInputData & { file?: Express.Multer.File }>): Promise<boolean> => {
        const { file, data } = args
        const { ...values } = data
        let img_url = ""

        if (file) {
            if (file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/webp' ||
                file.mimetype === 'image/jpg'
            ) {
                const file_name = `${file.originalname}-${Date.now()}`;
                img_url = await this._storageBase.upload(file_name, file.buffer)
            } else {
                throw new InvalidFromatExeption('Formato de archivo no permitido. Solo se permiten imágenes de tipo jpg, jpeg, png o webp.')
            }
        } else {
            throw new NotFoundFileRequestExeption();
        }

        await this._transactionalRepository.inTransaction(async (transaction) => {
            const productData = new ProductValue({
                name: values.name,
                img_url: img_url,
                price: Number(values.price),
                description: values.description,
                category: Number(values.category),
                stock: Number(values.stock),
                is_available: true
            })

            await this._productRepository.add(productData, { transaction })
        })

        return true
    }
}