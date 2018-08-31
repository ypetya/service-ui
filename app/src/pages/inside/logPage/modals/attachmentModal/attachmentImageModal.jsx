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

@withModal('attachmentImageModal')
@injectIntl
@reduxForm({
  form: 'attachmentImageForm',
})
export class AttachmentImageModal extends Component {
  static propTypes = {
    data: PropTypes.shape({
      launch: PropTypes.object,
      onEdit: PropTypes.func,
      language: PropTypes.string,
      content: PropTypes.string,
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
    const {
      intl,
      handleSubmit,
      data: { language, content },
    } = this.props;

    const okButton = {
      text: intl.formatMessage(messages.close),
      onClick: (closeModal) => {
        handleSubmit(this.saveLaunchAndCloseModal(closeModal))();
      },
    };

    const customButton = (
      <input
        type="image"
        className="toleft"
        src={require('./img/rotate-left-icon.svg')}
        text={intl.formatMessage(messages.close)}
        onClick={() => {
          handleSubmit(this.saveLaunchAndCloseModal(closeModal))();
        }}
      />
    );

    return (
      <ModalLayout
        title={intl.formatMessage(messages.title)}
        okButton={okButton}
        customButton={customButton}
      >
        <div>
          <img src="https://vignette.wikia.nocookie.net/despicableme/images/c/ca/Bob-from-the-minions-movie.jpg/revision/latest?cb=20151224154354" />
        </div>
      </ModalLayout>
    );
  }
}
