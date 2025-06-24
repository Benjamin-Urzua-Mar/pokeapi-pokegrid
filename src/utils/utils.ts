import { Slide, toast, type ToastOptions } from 'react-toastify';

const configDefault: ToastOptions = {
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide
}

const toastifyWarn = (msg: string, additionalConfig: ToastOptions) => {
    const config = { ...configDefault, ...additionalConfig };
    toast.warn(msg, config);
};
const toastifyError = (msg: string, additionalConfig: ToastOptions) => {
    const config = { ...configDefault, ...additionalConfig };
    toast.error(msg, config);
};

export {
    toastifyWarn,
    toastifyError
}