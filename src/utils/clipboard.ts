import Clipboard from 'clipboard';
import { ElMessage } from 'element-plus';

export const clipboardSuccess = () =>
    ElMessage({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
    });

export const clipboardError = () =>
    ElMessage({
        message: 'Copy failed',
        type: 'error'
    });

export const handleClipboard = (text: string, event: MouseEvent) => {
    const clipboard = new Clipboard(event.target as Element, {
        text: () => text
    });
    clipboard.on('success', () => {
        clipboardSuccess();
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        clipboardError();
        clipboard.destroy();
    });
    (clipboard as any).onClick(event);
};
