import {useCallback} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export const useMessage = () => {
    const notify = (messageText) => toast.error(messageText);
    return useCallback( text => {
        notify(text);
    }, [])
}