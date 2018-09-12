// TODO:
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import { withReadme } from 'storybook-readme';
import Attachments from './attachments';
import { attachmentByFileType, attachmentWithIcon } from './attachment';
import {
  fetchAttachments,
  fetchAttachmentContent
} from './test-data';
import README from './README.md';

const fileTypes = "invalid,xml,XML,php,json,js,har,css,csv,html,pic,txt,zip,rar,tgz,tar,gzip".split(',');

const attachmentService = {
  all: {
    fetchAttachments: () => Promise.resolve(fileTypes.map((fileType, id) =>
      attachmentByFileType(id, fileType, 'This is an icon'))),
  },
  withData: {
    fetchAttachments: () => fetchAttachments(1, 10).then(
      promises => Promise.resolve(promises.map(attachment =>
        attachmentWithIcon(attachment)
      ))
    )
  }
};

storiesOf('Pages/inside/logPage/Attachment', module)
  .addDecorator(
    host({
      title: 'Log Attachment',
      align: 'center middle',
      backdrop: 'rgba(70, 69, 71, 0.2)',
      background: '#f5f5f5',
      height: 'auto',
      // width: '70%',
    }),
  )
  .addDecorator(withReadme(README))
  .add('With all types', () => <Attachments
    attachmentService={attachmentService.all} />)
  .add('With mock data', () => <Attachments
    attachmentService={attachmentService.withData} />);
