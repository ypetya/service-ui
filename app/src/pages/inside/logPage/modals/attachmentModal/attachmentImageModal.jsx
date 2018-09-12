import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import { ModalLayout, withModal } from 'components/main/modal';
import { messages } from './messages';
import rotateImage from './img/rotate-left-icon.svg';
import styles from './attachmentImageModal.scss';

const cx = classNames.bind(styles);
const classes = cx('toleft', null, {});

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
    }).isRequired,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    rotationAmount: 0,
  };

  componentDidMount() {
    this.props.initialize(this.props.data.launch);
  }
  saveLaunchAndCloseModal = (closeModal) => (launch) => {
    this.props.data.onEdit(launch);
    closeModal();
  };

  okButton = (intl, handleSubmit) => ({
    text: intl.formatMessage(messages.close),
    onClick: (closeModal) => {
      handleSubmit(this.saveLaunchAndCloseModal(closeModal))();
    },
  });

  rotateImageHandler = () => {
    const rotationA = this.state.rotationAmount;
    this.setState({
      rotationAmount: rotationA - 90,
    });
  };

  generateRotationCommand = (amount) => `rotate(${amount}deg)`;

  customButton = (intl) => (
    <input
      type="image"
      alt="rotate image"
      className={classes}
      src={rotateImage}
      text={intl.formatMessage(messages.close)}
      onClick={this.rotateImageHandler}
    />
  );

  render = () => {
    const { intl } = this.props;
    const command = this.generateRotationCommand(this.state.rotationAmount);
    const style = { transform: command };

    return (
      <ModalLayout
        title={intl.formatMessage(messages.title)}
        okButton={this.okButton(intl, messages)}
        customButton={this.customButton(intl, messages)}
      >
        <div>
          <img
            style={style}
            id="attachment-image"
            alt="attachment"
            src="https://vignette.wikia.nocookie.net/despicableme/images/c/ca/Bob-from-the-minions-movie.jpg/revision/latest?cb=20151224154354"
          />
        </div>
      </ModalLayout>
    );
  };
}
