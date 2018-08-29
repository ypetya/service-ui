import { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import { reduxForm } from 'redux-form';
import { ModalLayout, withModal } from 'components/main/modal';
import './attachmentModal.scss';

const messages = defineMessages({
  title: {
    id: 'AttachmentDialog.title',
    defaultMessage: 'Attachment',
  },
  close: {
    id: 'AttachmentDialog.close',
    defaultMessage: 'Close',
  },
  descriptionPlaceholder: {
    id: 'AttachmentDialog.editor',
    defaultMessage: 'Editor',
  },
});

@withModal('launchAttachmentModal')
@injectIntl
@reduxForm({
  form: 'launchAttachmentForm',
})
export class AttachmentModal extends Component {
  static propTypes = {
    data: PropTypes.shape({
      launch: PropTypes.object,
      onEdit: PropTypes.func,
    }).isRequired,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };
  componentDidMount() {
    this.props.initialize(this.props.data.launch);
  }
  saveLaunchAndCloseModal = (closeModal) => (launch) => {
    this.props.data.onEdit(launch);
    closeModal();
  };

  render() {
    const { intl, handleSubmit } = this.props;
    const okButton = {
      text: intl.formatMessage(messages.close),
      onClick: (closeModal) => {
        handleSubmit(this.saveLaunchAndCloseModal(closeModal))();
      },
    };

    return (
      <ModalLayout title={intl.formatMessage(messages.title)} okButton={okButton}>
        <form />
      </ModalLayout>
    );
  }
}
