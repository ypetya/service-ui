import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import { ModalLayout, withModal } from 'components/main/modal';
import { messages } from './messages';
import { WithZipJs } from './har/WithZipJs';
import { PerfCascade } from './har/PerfCascade';
import './attachmentModal.scss';

@withModal('attachmentHarFileModal')
@injectIntl
@reduxForm({
  form: 'attachmentHarFileForm',
})
export class AttachmentHarFileModal extends Component {
  static propTypes = {
    data: PropTypes.shape({
      launch: PropTypes.object,
      onEdit: PropTypes.func,
      harData: PropTypes.object,
    }).isRequired,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  saveLaunchAndCloseModal = (closeModal) => (launch) => {
    this.props.data.onEdit(launch);
    closeModal();
  };

  okButton = (intl) => ({
    text: intl.formatMessage(messages.close),
    onClick: (closeModal) => {
      this.props.handleSubmit(this.saveLaunchAndCloseModal(closeModal))();
    },
  });

  render = () => {
    const {
      intl,
      data: { harData },
    } = this.props;
    return (
      <ModalLayout title={intl.formatMessage(messages.title)} okButton={this.okButton(intl)}>
        <form>
          <WithZipJs>
            <PerfCascade harData={harData} />
          </WithZipJs>
        </form>
      </ModalLayout>
    );
  };
}
