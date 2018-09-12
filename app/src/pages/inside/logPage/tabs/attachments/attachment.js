
import { getIcon } from 'common/img/launch/attachments';

const attachmentByFileType = (id, fileType, text) => ({
    id,
    fileType,
    src: getIcon(fileType),
    alt: text,
});

const attachmentWithIcon = (props) => {
    if (props.binary_content) {
        const content_type = (props.binary_content.content_type || '').split('/');
        const fileType = [1];
        const src=...
        if(content_type[0] === 'image') {

        }
        return {
            ...props.binary_content,
            src: getIcon(fileType),
            fileType,
            alt: props.message
        }
    }
}

export { attachmentByFileType,
    attachmentWithIcon };