import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { KYC_VERIFY_STEP_2, KYC_VERIFY_STEP_3, ROOT_PATH } from '../../../router/router-path';
import http from '../../../utils/http';
import { TOKEN } from '../../constants/constants';

export type KYC_VERIFY_TYPE = {
  doc: FormData | File | null;
};

const getLocalStorageValues = () => {
  const localStorageValue = localStorage.getItem(TOKEN);
  const parsedValue = localStorageValue && JSON.parse(localStorageValue);
  return parsedValue;
}

const kycVerifyApi = (id: string) => {
  const api = `/api/users/${id}/kyc-document`
  return api;
}

const stockVerifyApi = (id: string) => {
  const api = `/api/users/${id}/kyc-self`
  return api;
}

const shopVerifyApi = (id: string) => {
  const api = `/api/users/${id}/kyc-store`
  return api;
}


async function verifyKyc(input: KYC_VERIFY_TYPE) {
  const localStorageValues = getLocalStorageValues()
  return http.post(kycVerifyApi(localStorageValues.id), input, {
    headers: {
      Authorization: `Bearer ${localStorageValues.token}`,
    },
  });
}

export const useKycVerificationMutation = () => {
  const navigate = useNavigate();
  return useMutation((input: KYC_VERIFY_TYPE) => verifyKyc(input), {
    onSuccess: (data: any) => {
      toast.success(data.data.message);
      navigate(ROOT_PATH);
    },
    onError: (e) => {
      console.log('e: ', e);
    },
  });
};

async function verifyStock(input: KYC_VERIFY_TYPE) {
  const localStorageValues = getLocalStorageValues()
  return http.post(stockVerifyApi(localStorageValues.id), input, {
    headers: {
      Authorization: `Bearer ${localStorageValues.token}`,
    },
  })
}

export const useStockVerificationMutation = () => {
  const navigate = useNavigate();
  return useMutation((input: KYC_VERIFY_TYPE) => verifyStock(input), {
    onSuccess: (data: any) => {
      toast.success(data.data.message);
      navigate(KYC_VERIFY_STEP_2);
    },
    onError: () => {
      console.log('error')
    }
  })
}

async function verifyShop(input: KYC_VERIFY_TYPE) {
  const localStorageValues = getLocalStorageValues()
  return http.post(shopVerifyApi(localStorageValues.id), input, {
    headers: {
      Authorization: `Bearer ${localStorageValues.token}`,
    },
  })
}

export const useShopVerificationMutation = () => {
  const navigate = useNavigate();
  return useMutation((input: KYC_VERIFY_TYPE) => verifyShop(input), {
    onSuccess: (data: any) => {
      toast.success(data.data.message);
      navigate(KYC_VERIFY_STEP_3);
    },
    onError: () => {
      console.log('error')
    }
  })
}