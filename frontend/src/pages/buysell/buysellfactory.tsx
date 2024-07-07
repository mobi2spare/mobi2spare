import { toast } from "react-toastify";
import { ProductOutputType } from "../../helper/products/use-product"
import { MENU_LABELS } from "../../constants/constants";

export const getApiForProductRequestUpload = async (pageTitle:string,productOutput: ProductOutputType, saveProduct: any, imageFilePaths: string[], saveProductImages: any) => {

    console.log(pageTitle);
    if (pageTitle === MENU_LABELS.REQUEST_FOR_PART){
        
        if(validateBuyerRequest(productOutput)){
            toast.loading('Submitting data', { progress: undefined })
            return await uploadBuyerRequest(productOutput, saveProduct, imageFilePaths, saveProductImages);
        }
        else {
            toast.error('Please check your form');
        }

    }
    else if (validateAllAttributesExist(productOutput)) {
        toast.loading('Submitting data', { progress: undefined })
        return await uploadSellerRequestWithExistingDetails(productOutput, saveProduct, imageFilePaths, saveProductImages);
    }
    else if (validateCustomModelAndRamConfigExists(productOutput) || validateCustomModelExists(productOutput) || validateCustomRamConfigExists(productOutput)) {
        toast.loading('Submitting data', { progress: undefined })
        return await uploadSellerRequestWithNewDetails(productOutput, saveProduct, imageFilePaths, saveProductImages);
    }

    
    
    else {
        toast.error('Please check your form');
    }

}

const validateBuyerRequest = (productOutput: ProductOutputType) => {
    console.log(productOutput);
    return productOutput.attribute_value_id && productOutput.category_id !== -1 && productOutput.model_id !== -1 && productOutput.ram_storage_id !== -1
        && productOutput.brand_id !== -1 && productOutput.user_id !== -1

}

const validateAllAttributesExist = (productOutput: ProductOutputType) => {

    
    return productOutput.attribute_value_id && productOutput.category_id !== -1 && productOutput.model_id !== -1 && productOutput.ram_storage_id !== -1
        && productOutput.brand_id !== -1 && productOutput.quantity >= 1 && productOutput.price > 0 && productOutput.user_id !== -1

}

const validateCustomModelExists = (productOutput: ProductOutputType) => {

    return productOutput.attribute_value_id && productOutput.category_id != -1 && productOutput.ram_storage_id !== -1
        && productOutput.model_name && productOutput.model_name !== ''
        && productOutput.model_id === -1 
        && productOutput.brand_id !== -1 && productOutput.quantity >= 1 && productOutput.price > 0 && productOutput.user_id !== -1

}

const validateCustomRamConfigExists = (productOutput: ProductOutputType) => {

    return productOutput.attribute_value_id && productOutput.category_id != -1 && productOutput.model_id !== -1
        && productOutput.ram_storage_name && productOutput.ram_storage_name !== ''
        && productOutput.ram_storage_id === -1 
        && productOutput.brand_id !== -1 && productOutput.quantity >= 1 && productOutput.price > 0 && productOutput.user_id !== -1

}

const validateCustomModelAndRamConfigExists = (productOutput: ProductOutputType) => {

    return productOutput.attribute_value_id && productOutput.category_id !== -1 && productOutput.ram_storage_name &&
        productOutput.model_name && productOutput.ram_storage_name !== '' && productOutput.model_name !== ''
        && productOutput.ram_storage_id === -1 && productOutput.model_id === -1 
        && productOutput.brand_id !== -1 && productOutput.quantity >= 1 && productOutput.price > 0 && productOutput.user_id !== -1

}
const saveProductToDB = async (productOutput: ProductOutputType, saveProduct: any) => {

    const insertedProduct = await saveProduct({
        model_id: productOutput.model_id,
        ram_storage_id: productOutput.ram_storage_id,
        ram_storage_name:productOutput.ram_storage_name,
        model_name:productOutput.model_name,
        category_id: productOutput.category_id, brand_id: productOutput.brand_id, price: productOutput.price, description: productOutput.description, attribute_value_id: productOutput.attribute_value_id, quantity: productOutput.quantity,
        user_id: productOutput.user_id,
        image_paths:productOutput.image_paths
        
    });
    return insertedProduct.data.data;
}

const saveProductForRequest = async (productOutput: ProductOutputType, saveProduct: any) => {

    const insertedProduct = await saveProduct({
        model_id: productOutput.model_id,
        ram_storage_id: productOutput.ram_storage_id,
        category_id: productOutput.category_id, brand_id: productOutput.brand_id, description: productOutput.description, attribute_value_id: productOutput.attribute_value_id,
        user_id: productOutput.user_id,
        image_paths:productOutput.image_paths
        
    });
    return insertedProduct.data.data;
}


const uploadSellerRequestWithExistingDetails = async (productOutput: ProductOutputType, saveProduct: any, imageFilePaths: string[], saveProductImages: any) => {

    const productId = await saveProductToDB(productOutput,saveProduct);
    const productInfo = {
        image_paths: imageFilePaths,
        productId: productId
    }
    await saveProductImages(productInfo);


}

const uploadSellerRequestWithNewDetails = async (productOutput: ProductOutputType, saveProduct: any, imageFilePaths: string[], saveProductImages: any) => {

    
    await saveProductToDB(productOutput,saveProduct);
  

 }
const uploadBuyerRequest = async (productOutput: ProductOutputType, saveProduct: any, imageFilePaths: string[], saveProductImages: any) => {

    const productId = await saveProductForRequest(productOutput,saveProduct);
    const productInfo = {
        image_paths: imageFilePaths,
        productId: productId
    }
    await saveProductImages(productInfo);
 }