export interface Category {
    image_path : string[],
    name : string,
    id : number
}

export interface Product {
    image_path : string[],
    pid : number,
    name : string,
    price : number,
    cname : string,
    bname : string,
    description : string,
    attribute_info : []
}

