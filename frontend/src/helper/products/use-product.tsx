import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../../constants/models";
import api from "../../utils/network_requests";
import { APPROVE_PRODUCT_REQUEST, BASE_URL, PATCH_PRODUCT_IMAGE, PATCH_PRODUCT_REQUEST_IMAGE, SAVE_PRODUCT, SAVE_PRODUCT_REQUEST, UPLOAD_PRODUCT_IMAGE } from "../../utils/api";


export interface ProductInputType {


  brand_name: string,
  category_name: string,
  quantity: number,
  description: string,
  price: number,
  attribute_value_id: number[],
  model_name :string,
  ram_storage_config:string


}

export interface ProductOutputType {

  brand_id: number,
  category_id: number,
  quantity: number,
  description: string,
  price: number,
  user_id: number,
  attribute_value_id: number[],
  model_id : number,
  ram_storage_id:number,
  model_name? : string,
  ram_storage_name? : string,
  image_paths? : string[]

}

interface ProductImagePathType {
  image_paths : string [],
  productId:number
}

export interface ProductImageType {
  formData:FormData,
  userId : number
}

async function saveProduct(input: ProductOutputType) {
  return await api.post(BASE_URL + SAVE_PRODUCT, input);
}


async function saveProductForRequest (input: ProductOutputType) {
  return await api.post(BASE_URL + SAVE_PRODUCT_REQUEST, input);
}

async function  saveProductImagePaths(productImageInfo:ProductImagePathType) {
  const input = 
    {
      "imagePaths":productImageInfo.image_paths
    }
  
  api.patch(BASE_URL + `${PATCH_PRODUCT_IMAGE}${productImageInfo.productId}`, input);
  
}

async function  saveProductRequestImagePaths(productImageInfo:ProductImagePathType) {
  const input = 
    {
      "imagePaths":productImageInfo.image_paths
    }
  
  api.patch(BASE_URL + `${PATCH_PRODUCT_REQUEST_IMAGE}/${productImageInfo.productId}`, input);
  
}

async function saveProductImage(params:ProductImageType) {
  return (await api.post(`${BASE_URL}/${UPLOAD_PRODUCT_IMAGE}/${params.userId}`, params.formData)).data; 
}

export const useProductMutation = () => {
  // const statusPending = "pending";
  // const { setAuthenticated, setUser } = useContext(AuthContext);

  return useMutation((input: ProductOutputType) => saveProduct(input), {
    onSuccess: async (data) => {

     
      return data;

    },
    onError: (data: any) => {
      
    },
  });
};

export const useProductRequestMutation = () => {
  // const statusPending = "pending";
  // const { setAuthenticated, setUser } = useContext(AuthContext);

  return useMutation((input: ProductOutputType) => saveProductForRequest(input), {
    onSuccess: async (data) => {

     
      return data;

    },
    onError: (data: any) => {
      
    },
  });
};

export const useSaveImagePathMutation = () => {

  return useMutation((input: ProductImagePathType) => saveProductImagePaths(input), {
    onSuccess: async () => {

      toast.dismiss();
      toast.success('Product saved successfully');

    },
    onError: (data: any) => {

      toast.dismiss();
      toast.error("Failed to save product", { position: 'top-center' });

    },
  });

}

export const useSaveImagePathRequestMutation = () => {

  return useMutation((input: ProductImagePathType) => saveProductRequestImagePaths(input), {
    onSuccess: async (data) => {

      toast.dismiss();
      toast.success('Product saved successfully');
      return data;

    },
    onError: (data: any) => {

      toast.dismiss();
      toast.error("Failed to save product", { position: 'top-center' });

    },
  });

}

export const useSaveImageMutation = () =>{

  return useMutation((input: ProductImageType) => saveProductImage(input), {
    onSuccess: async () => {

      toast.dismiss();
      toast.success('Image saved successfully');

    },
    onError: (data: any) => {

      toast.dismiss();
      toast.error("Failed to save images", { position: 'top-center' });

    },
  });

}