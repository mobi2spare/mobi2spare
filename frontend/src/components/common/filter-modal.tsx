import { useState } from "react";
import { Option } from "../../utils/types/dropdown";
import DropdownSelector from "../ui/dropdown";
import Button from "../ui/button";

const FilterModal = () => {
    const companyOptions = [
        { name: 'Select Company', value: 'select-company' },
        { name: 'Newest', value: 'newest' },
        { name: 'Popularity', value: 'popularity' },
    ];
    const modelOptions = [
        { name: 'Select Model', value: 'select-model' },
        { name: 'Newest', value: 'newest' },
        { name: 'Popularity', value: 'popularity' },
        { name: 'Price low high', value: 'low-high' },
        { name: 'Price high low', value: 'high-low' },
    ];

    const categoryOptions = [
        { name: 'Select Category', value: 'select-category' },
        { name: 'Newest', value: 'newest' },
        { name: 'Popularity', value: 'popularity' },
        { name: 'Price low high', value: 'low-high' },
    ];

    const [companyName, setCompanyName] = useState<Option>(companyOptions[0]);
    const [modelName, setModelName] = useState<Option>(modelOptions[0]);
    const [categoryName, setCategoryName] = useState<Option>(categoryOptions[0]);

    return (
        <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
            <div className="text-center mb-6 pt-2.5">
                <h3 className="mt-2 mb-8  font-bold">
                    Add Filter
                </h3>
            </div>
            {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
          noValidate
        >
          <div className="flex flex-col space-y-3.5">
            <Input
              labelKey="forms:label-email"
              type="email"
              variant="solid"
              {...register('email', {
                required: `${t('forms:email-required')}`,
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('forms:email-error'),
                },
              })}
              errorKey={errors.email?.message}
            />
            <PasswordInput
              labelKey="forms:label-password"
              errorKey={errors.password?.message}
              {...register('password', {
                required: `${t('forms:password-required')}`,
              })}
            />
            <div className="flex items-center justify-center">
              <div className="flex items-center flex-shrink-0">
                <label className="relative inline-block w-10 cursor-pointer switch">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-0 h-0 opacity-0"
                    {...register('remember_me')}
                  />
                  <span className="absolute inset-0 transition-all duration-300 ease-in bg-gray-500 slider round"></span>
                </label>
                <label
                  htmlFor="remember"
                  className="flex-shrink-0 text-sm cursor-pointer text-heading ltr:pl-3 rtl:pr-3"
                >
                  {t('forms:label-remember-me')}
                </label>
              </div>
              <div className="flex ltr:ml-auto rtl:mr-auto">
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="text-sm underline ltr:text-right rtl:text-left text-heading ltr:pl-3 rtl:pr-3 hover:no-underline focus:outline-none"
                >
                  {t('common:text-forgot-password')}
                </button>
              </div>
            </div>
            <div className="relative">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-11 md:h-12 w-full mt-1.5"
              >
                {t('common:text-login')}
              </Button>
            </div>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
          <hr className="w-full border-gray-300" />
          <span className="absolute -top-2.5 px-2 bg-white">
            {t('common:text-or')}
          </span>
        </div>
        <Button
          loading={isLoading}
          disabled={isLoading}
          className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
          onClick={handelSocialLogin}
        >
          <ImFacebook2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
          {t('common:text-login-with-facebook')}
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
          onClick={handelSocialLogin}
        >
          <ImGoogle2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
          {t('common:text-login-with-google')}
        </Button>
        <div className="mt-5 mb-1 text-sm text-center sm:text-base text-body">
          {t('common:text-no-account')}{' '}
          <button
            type="button"
            className="text-sm font-bold underline sm:text-base text-heading hover:no-underline focus:outline-none"
            onClick={handleSignUp}
          >
            {t('common:text-register')}
          </button>
        </div> */}
          <div className="flex flex-col space-y-3.5">
            <DropdownSelector
                labelKey='Company Name'
                name='Company Name'
                selectedItem={companyName}
                setSelectedItem={setCompanyName}
                options={companyOptions}
            />
            <DropdownSelector
                labelKey='Model'
                name='Model'
                selectedItem={modelName}
                setSelectedItem={setModelName}
                options={modelOptions}
            />
            <DropdownSelector
                labelKey='Category'
                name='Category'
                selectedItem={categoryName}
                setSelectedItem={setCategoryName}
                options={categoryOptions}
            />
            <div className="relative">
              <Button
                type="submit"
                // loading={isLoading}
                // disabled={isLoading}
                className="h-11 md:h-12 w-full mt-1.5"
              >
                {/* {t('common:text-login')} */}
                Add
              </Button>
            </div>
            </div>
        </div>

    )
}

export default FilterModal;