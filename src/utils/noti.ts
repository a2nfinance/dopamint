
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';


export const MESSAGE_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
    OPEN: "open",
    DESTROY: "destroy"
}

/**
 * 
 * @param title 
 * @param description 
 * @param messageType success, error, info, warning, open, destroy
 * @param fn 
 */
export const openNotification = (title: string, description: string, messageType: string, fn?: () => void) => {
    let config: ArgsProps = {
        message: title,
        description: description,
        pauseOnHover: true,
        showProgress: true,
        placement: "bottomRight"
    }

    switch (messageType) {
        case MESSAGE_TYPE.OPEN:
            notification.open(config);
            break;
        case MESSAGE_TYPE.INFO:
            notification.info(config);
            break;
        case MESSAGE_TYPE.SUCCESS:
            notification.success(config);
            break;
        case MESSAGE_TYPE.ERROR:
            notification.error(config);
            break;
        case MESSAGE_TYPE.WARNING:
            notification.warning(config);
            break;
        default:
            notification.open(config);
            break;
    }


};

