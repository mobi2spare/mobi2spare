
import {  Box, CircularProgress, IconButton, Menu, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { ChangeEvent, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react'
import { Attributes, Brand, Category, Model, Product, RamStorageConfig } from '../../constants/models';
import api from '../../utils/network_requests';
import { BASE_URL,GET_MODELS } from '../../utils/api';
import StyledDropDown from '../../components/dropdown/styleddropdown';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { orange } from '@mui/material/colors';
import { StyledButton } from '../../components/buttons/styled_buttons';
import { toast } from "react-toastify";
import { getUser } from '../../utils/utils';
import { ProductInputType, ProductOutputType, useProductMutation, useSaveImageMutation, useSaveImagePathMutation } from '../../helper/products/use-product';
import { useQuery } from 'react-query';
import { UploadImageComponent } from './upload_image';
import { Controller, useForm } from 'react-hook-form';
import { REACT_QUERY_ATTRIBUTES, REACT_QUERY_BRANDS, REACT_QUERY_CATEGORIES, REACT_QUERY_MODELS, REACT_QUERY_PHONE_CONFIG } from '../../constants/react-query-constants';
import { getApiForProductRequestUpload } from './buysellfactory';
import CustomControlledAutoComplete from '../../components/dropdown/custom_autocomplete';
import { MENU_LABELS } from '../../constants/constants';
import { fetchAttributesByCategories, fetchBrands, fetchCategories, fetchRamStorageConfig } from './apis/api';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../store/actions';
import AddRemoveQuantityButtons from '../../components/buttons/add_remove_buttons';

interface ProductDetailsProps {
    productToSell?:Product
}
export const ProductDetails: React.FC<ProductDetailsProps> = ({ productToSell }) => {

    const fontFamily = { fontFamily: 'SegoeUIBold' };
    const ralewayBoldFont = { fontFamily: 'RalewayBold', fontSize: '1.2rem' }
    const pageTitle: string =  MENU_LABELS.SELL_PARTS;
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedRamStorageConfigItem, setselectedRamStorageConfigItem] = useState("");
    const [selectedRamStorageConfigItemid, setselectedRamStorageConfigItemId] = useState(-1);
    const [filteredRamConfigs, setFilteredRamConfigs] = useState<RamStorageConfig[]>([]);
    const [selectedModel, setselectedModel] = useState("");
    const [selectedCustomModel, setselectedCustomModel] = useState("");
    const [selectedCustomRamStorageConfig, setselectedCustomRamStorageConfig] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState(new Map());
    const [attributesMap, setAttributesMap] = useState(new Map());
    const [selectedCategoryId, setselectedCategoryId] = useState(-1);
    const [selectedBrandId, setselectedBrandId] = useState(-1);
    const [selectedModelId, setselectedModelId] = useState(-1);
    const [firstSelectedImage, setFirstSelectedImage] = useState<File>();
    const [secondSelectedImage, setSecondSelectedImage] = useState<File>();
    const [previewFirstImage, setPreviewFirstImage] = useState<string>();
    const [previewSecondImage, setPreviewSecondImage] = useState<string>();
   
    const [quantity, setQuantity] = useState(1);
    

    const [imageFilePaths, setImageFilePaths] = useState<string[]>([]);


    const validatePrice = (price: number) => {
        return price > 0;
    }

    const dispatch = useDispatch();

    const { mutateAsync: saveProduct, isLoading } = useProductMutation();
    const { mutateAsync: saveProductImagePaths, isLoading: isSavingImagePath } = useSaveImagePathMutation();
    const { mutateAsync: saveProductImages, isLoading: isSavingImages } = useSaveImageMutation();


    const {
        register,
        handleSubmit,
        setError,
        control,
        setValue,
        formState: { errors },
    } = useForm<ProductInputType>();


    const onInvalid = (errors: any) => console.error(errors);

    useEffect(() => {
      dispatch(setTitle(pageTitle))
    
    }, [])
    

    async function onSubmit({ price, description }: ProductInputType) {

        try {
            if (!firstSelectedImage || !secondSelectedImage) {
                toast.error('Please select images for the product');
                return;

            }

            let attribute_value_ids: number[] = [];
            selectedAttributes.forEach((value, idx) => {
                attribute_value_ids.push(parseInt(value[0]));

            })
            console.log(attribute_value_ids);
            const userId = parseInt(getUser());
            if (!userId) {
                toast.error('Failed to submit data, please try again');
            }

            
            const productOutput : ProductOutputType = {
                attribute_value_id:attribute_value_ids,
                model_id:selectedModelId,
                brand_id:selectedBrandId,
                ram_storage_id:selectedRamStorageConfigItemid,
                price:price,
                quantity:quantity,
                description:description,
                category_id:selectedCategoryId,
                user_id:userId,
                model_name:selectedCustomModel,
                ram_storage_name:selectedCustomRamStorageConfig,
                image_paths:imageFilePaths

            }
            console.log(productOutput);
            await getApiForProductRequestUpload(pageTitle,productOutput,saveProduct,imageFilePaths,saveProductImagePaths);

        } catch (error) {
            toast.error('Failed to submit product data, please try again');

        }

    }

    

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, previewImageFunc: React.Dispatch<React.SetStateAction<string | undefined>>, selectedImageFunc: React.Dispatch<React.SetStateAction<File | undefined>>) => {

        const files = event.target.files;
        const invalidFiles = [];
        const readers = [];

        if (files !== null && files.length > 0) {

            const file = files[0];
            if (!file || !file.type.startsWith('image/')) {
                invalidFiles.push(file.name);
            }
            previewImageFunc("");
                // Handle the resolved resizedUri (base64 string) here
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob)
            readers.push(reader);
            reader.onloadend = () => previewImageFunc(reader.result as string);
        
            selectedImageFunc(file);

        }

    }

    const handleFirstImageChange = async (event: ChangeEvent<HTMLInputElement>) => {

        return handleImageChange(event, setPreviewFirstImage, setFirstSelectedImage);

    };


    const handleSecondImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        return handleImageChange(event, setPreviewSecondImage, setSecondSelectedImage);


    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }



    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleUpload = async () => {

        if (!firstSelectedImage && !secondSelectedImage) {
            toast.error('Please select the 2 images');
        }

        if (firstSelectedImage && secondSelectedImage) {

            const userId = getUser();
            const formData = new FormData();
            formData.append('file', firstSelectedImage);
            formData.append('file', secondSelectedImage);
            
            toast.loading('Uploading images', { progress: undefined })
            const imageData = await saveProductImages({formData:formData,userId:parseInt(userId)})
            console.log(imageData);
            if (imageData && imageData.success === true) {
                if (imageData.files) {
                    setImageFilePaths(imageData.files.split(","));
                }

            }
            

        }


    };



    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {


        const categoryName = event.target.value;
        if (categoryName !== undefined) {
            if (categoryName === "") {
                setselectedCategoryId(-1)
                setSelectedCategory("");
            }
            else {
                setSelectedCategory(categoryName);
                categoriesData.forEach((category: Category, _: number) => {
                    if (category.name === categoryName) {
                        setselectedCategoryId(category.id);
                    }
                })
            }


        }


    }

    const handleRamStorageChange = (event: SyntheticEvent<Element, Event>,changedRamStorageConfig: unknown) => {

        if ( isRamStorageConfig(changedRamStorageConfig)) {
            if (changedRamStorageConfig.name === "") {
                setselectedRamStorageConfigItemId(-1)
                setselectedRamStorageConfigItem("");
            }
            else {
                setselectedRamStorageConfigItem(changedRamStorageConfig.name);
                setselectedCustomRamStorageConfig("");
                filteredRamConfigs.forEach((ramStorage: RamStorageConfig, _: number) => {
                    console.log(ramStorage.name, changedRamStorageConfig.name);
                    if (ramStorage.name === changedRamStorageConfig.name) {
                        setselectedRamStorageConfigItemId(ramStorage.id);
                    }
                })
            }

        }

    }

    useEffect(() => {
        if (firstSelectedImage && secondSelectedImage) {
            handleUpload();
        }

    }, [firstSelectedImage, secondSelectedImage]);




    const getModelsByBrands = async () => {

        const models = await api.get(`${BASE_URL}${GET_MODELS}${selectedBrandId}`);
        return models.data.data;

    }

    const clearModelField = () => {
        setValue('model_name', "");
    };


    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== undefined) {
            clearModelField();
            if (event.target.value === "") {
                setselectedBrandId(-1)
                setSelectedBrand("");
            }
            setselectedModel("");
            setselectedCustomModel("");
            setselectedModelId(-1);
            setSelectedBrand(event.target.value);
            brandsData.forEach((brand: Brand, _: number) => {
                if (brand.name === event.target.value) {
                    setselectedBrandId(brand.id);
                }
            })

        }
    }

    function isModel(obj: any): obj is Model {
        return obj && typeof obj === 'object' && 'id' in obj && 'configuration' in obj && 'name' in obj && typeof obj.id === 'number' &&
            Array.isArray(obj.configuration) &&
            typeof obj.name === 'string';
    }

    function isRamStorageConfig(obj: any): obj is RamStorageConfig {
        return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj && typeof obj.id === 'number' &&
            typeof obj.name === 'string';
    }

    const handleModelChange = (_: SyntheticEvent<Element, Event>, changedModel: unknown) => {
        if (isModel(changedModel)) {

            setselectedModel(changedModel.name);
            setselectedRamStorageConfigItem("");
            setselectedRamStorageConfigItemId(-1);
            setselectedCustomRamStorageConfig("");
           
            if (changedModel.name === "") {
                setselectedModelId(-1);
            }
            else {
                setselectedModelId(changedModel.id); 
                setselectedCustomModel("");
            }
        }


    }

    const onCustomModelChange = (_: SyntheticEvent<Element, Event>, changedModel: string) => {

        if (changedModel !== selectedModel && changedModel !== "") {
            setselectedModelId(-1);
            setselectedModel("");
            setselectedCustomModel(changedModel);
            setFilteredRamConfigs(cachedConfigurationData);
        }


    }

    const onCustomRamStorageChange = (_: SyntheticEvent<Element, Event>, changedRamStorageConfig: string) => {

        if (changedRamStorageConfig !== selectedRamStorageConfigItem && changedRamStorageConfig !== "") {
            setselectedRamStorageConfigItemId(-1);
            setselectedRamStorageConfigItem("");
            setselectedCustomRamStorageConfig(changedRamStorageConfig);
        }


    }

    const handleAttributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== undefined) {
            const selectedAttributeName = event.target.name;
            const tempIdMap = new Map();
            attributesMap.forEach((attributeValues, attributeName) => {
                if (attributeName === selectedAttributeName) {
                    attributeValues.forEach((item: object) => {
                        Object.entries(item).forEach((attValue, idx) => {
                            if (attValue[1] === event.target.value) {
                                tempIdMap.set(attValue[1], attValue[0]);
                            }

                        })

                    })
                }

            })
            if (tempIdMap.size === 0) {
                setSelectedAttributes(new Map());
            }
            else {
                setSelectedAttributes(prevMap => new Map(prevMap).set(
                    selectedAttributeName,
                    [tempIdMap.get(event.target.value), event.target.value] || []
                ));
            }


        }
    }
    

    const { isLoading: categoryLoading, error: errorCategories, data: categoriesData } = useQuery(REACT_QUERY_CATEGORIES, fetchCategories);
    const { isLoading: brandLoading, error: errorBrands, data: brandsData } = useQuery(REACT_QUERY_BRANDS, fetchBrands);
    const { isLoading: attributesLoading, error: errorAttributes, data: attributesData } = useQuery(REACT_QUERY_ATTRIBUTES, fetchAttributesByCategories);
    const { isLoading: modelsLoading, error: errorModels, data: modelsData } = useQuery([REACT_QUERY_MODELS, selectedBrandId], getModelsByBrands, { enabled: selectedBrandId !== -1 });
    const { isLoading: ramConfigLoading, error: errorRamStorageConfig, data: configurationData } = useQuery(REACT_QUERY_PHONE_CONFIG, fetchRamStorageConfig,{ enabled: selectedBrandId !== -1 });

    const cachedConfigurationData = useMemo(() => configurationData || [], [configurationData]); // Cache configurationData because wont change frequently

    useEffect(() => {
        if (cachedConfigurationData) {
            setselectedRamStorageConfigItem("");
            setselectedCustomRamStorageConfig("");
            setselectedRamStorageConfigItemId(-1);
            if (selectedModelId === -1 || !selectedModelId) {
                setFilteredRamConfigs(cachedConfigurationData);
            }
            else {
                let filteredRamItems: RamStorageConfig[] = [];

                // selected model.ramstorage config contains ramStorageConfig.name
                modelsData.forEach((model: Model, _: number) => {
                    cachedConfigurationData.forEach((ramStorageConfig: RamStorageConfig, _: number) => {
                        if (model.configuration.includes(ramStorageConfig.name) && selectedModelId === model.id) {

                            filteredRamItems.push(ramStorageConfig);

                        }

                    })

                })
                setFilteredRamConfigs(filteredRamItems);

            }
        }
        else {
            setFilteredRamConfigs([]);
        }

    }, [selectedModel, selectedModelId])

    useEffect(() => {
        const categoryAttributeMap = new Map();
        attributesData && attributesData.map((attribute: Attributes, _: number) => {
            const categoryid = attribute['categoryid'];
            const attributeName = attribute['name'];
            const values = attribute['category_attribute_values'];
            if (categoryid === selectedCategoryId || selectedCategoryId === -1) {
                categoryAttributeMap.set(attributeName, values);
            }


        });
        setAttributesMap(categoryAttributeMap);
    }, [attributesData, selectedCategoryId]);


    return (
        <Box sx={{ marginTop: '2rem' }} >

            {/* <Typography textAlign={'center'} variant='h1' color={theme.palette.text.primary} sx={{ ...ralewayBoldFont }}>{title}</Typography> */}
            <Box display={'flex'} flexDirection={'column'}>
                <Typography fontSize={'1.75rem'} fontFamily={fontFamily.fontFamily} margin={'1rem'}>Upload Photos</Typography>
                <Box display={'flex'} marginTop={'1rem'} flexDirection={'row'} height={'15rem'}>

                    <UploadImageComponent previewImage={previewFirstImage} handleImageChange={handleFirstImageChange} title='Front' />

                    <UploadImageComponent previewImage={previewSecondImage} handleImageChange={handleSecondImageChange} title='Back' />


                </Box>

                <form onSubmit={handleSubmit(onSubmit, onInvalid)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box display={'flex'} sx={{ margin: '2rem', marginBottom: '5rem' }} flexDirection={'column'}>
                        {!categoryLoading && categoriesData && categoriesData.length > 0 ? <StyledDropDown register={register} error={errors} required={true} field_name='category_name' items={categoriesData} title='Category' onChange={handleCategoryChange} itemValue={selectedCategory} />
                            : <CircularProgress />}
                        {errors.category_name && <p className="error-message">{'A valid category selection is required'}</p>}
                        {!brandLoading ? <StyledDropDown register={register} error={errors} required={true} field_name='brand_name' items={brandsData} title='Brands' onChange={handleBrandChange} itemValue={selectedBrand} />
                            : <CircularProgress />}
                        {errors.brand_name && <p className="error-message">{'A valid brand selection is required'}</p>}



                        {modelsData && modelsData.length > 0 ? (

                            <CustomControlledAutoComplete freeSolo={true} control={control} handleValueChange={handleModelChange} itemData={modelsData} isLoading={modelsLoading}
                                onCustomInputChange={onCustomModelChange} component_name={'model-name'} required_text={"Select a model"} title="Search models">
                                
                            </CustomControlledAutoComplete>
                            
                        ) : selectedBrandId !== -1 && modelsLoading ? (
                            <CircularProgress />
                        ) : null}

                        {filteredRamConfigs && filteredRamConfigs.length > 0 ? (

                        <CustomControlledAutoComplete freeSolo={true} control={control} handleValueChange={handleRamStorageChange} itemData={filteredRamConfigs} isLoading={ramConfigLoading}
                            onCustomInputChange={onCustomRamStorageChange} component_name={'ram-storage-name'} required_text={"Select ram/storage"} title="Search ram/storage">

                        </CustomControlledAutoComplete>


                        ) :  ramConfigLoading ? (
                        <CircularProgress />
                        ) : null}

                        {!attributesLoading && attributesMap ? Array.from(attributesMap.keys()).map((attribute: string, idx: number) => {

                            return <Box><StyledDropDown key={idx}
                                register={register} error={errors} required={true} field_name={attribute}
                                items={attributesMap.get(attribute)} // Access the value (attributes array)
                                title={attribute} // Access the key (attribute name)
                                onChange={handleAttributeChange}
                                itemValue={selectedAttributes.get(attribute) && selectedAttributes.get(attribute)[1] || ""} // Assuming itemValue is an empty string here
                            />

                            </Box>

                        }) : <CircularProgress />}
                        {!selectedAttributes || selectedAttributes.size === 0 && <p className="error-message">{`A valid attribute selection is required`}</p>}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AddRemoveQuantityButtons width='50%' typoGraphyText='Quantity' quantity={quantity} font={ralewayBoldFont} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>

                        </Box>
                        
                        
                        <Box sx={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
                            <Typography sx={{ width: '90%', ...ralewayBoldFont }}>Rate</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField {...register('price', { required: true, validate: validatePrice })} error={!!errors.price} type='number' sx={{ '& .MuiInputBase-input': { color: orange[900] } }}></TextField>
                                {errors.price && <p className="error-message">{errors.price.message || 'A valid price is required'}</p>}

                            </Box>

                        </Box>
                        
                        <TextField {...register('description', { required: true, })} error={!!errors.description} placeholder='Description' multiline rows={6} sx={{ marginTop: '1rem' }}></TextField>
                        {errors.description && <p className="error-message">{'A valid description is required'}</p>}

                        <StyledButton disabled={isLoading || isSavingImages} type='submit' loadingIndicator={<CircularProgress color='primary' />} loadingPosition="end" sx={{ width: '80%', alignSelf: 'center', marginTop: '1rem' }}>
                            Add to {pageTitle && pageTitle.split(" ")[0]}
                        </StyledButton>
                    </Box>
                </form>

            </Box>

        </Box>
    )
}

