export interface Category {
    image_path : string[],
    name : string,
    id : number
}

export interface Product {
    image_path : string[],
    id : number,
    name : string,
    price : number,
    cname : string,
    bname : string,
    description : string,
    mname? : string,
    configuration? : string
    attribute_info : [AttributeInfo]
    brand_id : number,
    category_id : number,
    model_id : number,
    configuration_id : number
}

export interface AttributeInfo {
    attribute_name:string,
    attribute_value : string
    attribute_value_id : number
}

export interface CartProduct extends Product{
    cartQuantity : number,
    quantity:number,
    isChecked?: boolean 
}

export interface Brand {
    name : string,
    id : number,
    category_id:number
}

export interface Model {
    id : number,
    name : string,
    brand_id : number,
    configuration : [string]

}

export interface Attributes {
    categoryid : number,
    name : string,
    category_attribute_values : [{string:string}]
}

export interface RamStorageConfig {
    id : number,
    name : string,

}

export interface RequestData {
    myRequests:Product[],
    otherRequests:Product[]
}