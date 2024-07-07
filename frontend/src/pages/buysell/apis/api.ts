import { SyntheticEvent } from "react";
import { BASE_URL, GET_ATTRIBUTES_BY_CATEGORY, GET_BRANDS, GET_CATEGORIES, GET_RAM_STORAGE_CONFIG } from "../../../utils/api";
import api from "../../../utils/network_requests";

export const fetchCategories = async () => {

    const response = await api.get(BASE_URL + GET_CATEGORIES);
    const data = response.data;
    return data.data;

}

export const fetchBrands = async () => {
    const response = await api.get(BASE_URL + GET_BRANDS);
    const data = response.data;
    return data.data;

};

export const fetchAttributesByCategories = async () => {
    const response = await api.get(BASE_URL + GET_ATTRIBUTES_BY_CATEGORY);
    const data = response.data;
    return data.data;

};

export const fetchRamStorageConfig = async () => {
    const response = await api.get(BASE_URL + GET_RAM_STORAGE_CONFIG);
    const data = response.data;
    return data.data;
}


// export const onCustomModelChange = (_: SyntheticEvent<Element, Event>, changedModel: string) => {

//     if (changedModel !== selectedModel && changedModel !== "") {
//         setselectedModelId(-1);
//         setselectedModel("");
//         setselectedCustomModel(changedModel);
//         setFilteredRamConfigs(cachedConfigurationData);
//     }


// }

// export const onCustomRamStorageChange = (_: SyntheticEvent<Element, Event>, changedRamStorageConfig: string) => {

//     if (changedRamStorageConfig !== selectedRamStorageConfigItem && changedRamStorageConfig !== "") {
//         setselectedRamStorageConfigItemId(-1);
//         setselectedRamStorageConfigItem("");
//         setselectedCustomRamStorageConfig(changedRamStorageConfig);
//     }


// }