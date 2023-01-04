import {toast, ToastOptions} from 'react-toastify';

const options: ToastOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};

export const showSuccess = (text, additionalOptions = {}) => {
    toast.success(text, {...options, ...additionalOptions});
};

export const showError = (text, additionalOptions = {}) => {
    toast.error(text, {...options, ...additionalOptions});
};

export const showWarning = (text, additionalOptions = {}) => {
    toast.warning(text, {...options, ...additionalOptions});
};
