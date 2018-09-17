import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import { withReadme } from 'storybook-readme';
import Attachments from './attachments';
import { attachmentByFileType, attachmentWithIcon } from './attachment';
import {
  generateFakeAttachments,
  generateFakeAttachmentContent
} from './test-data';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { WithState } from 'storybook-decorators/withState';
import README from './README.md';


const state = {
  user: {
    activeProject: 'amsterget_personal',
  },
  notifications: [],
  location: {
    payload: {
      projectId: 'amsterget_personal',
      filterId: 'all',
      testItemIds: '5b75a36397a1c00001ea3d4f',
    },
  },
  log: {
    historyEntries: [],
    activeItemId: '5b75a36397a1c00001ea3d4f',
  },
};

const fileTypes = "invalid,xml,XML,php,json,js,har,css,csv,html,pic,txt,zip,rar,tgz,tar,gzip".split(',');

import { URLS } from 'common/urls';
const mock = new MockAdapter(axios);
const API_REQUEST = URLS.logItems('activeProject', 'itemId', 'level');
mock.onGet(API_REQUEST).reply(200, ['demo', 'desktop']);

const attachmentService = {
  all: {
    fetchAttachments: () => Promise.resolve(fileTypes.map((fileType, id) =>
      attachmentByFileType(id, fileType, 'This is an icon'))),
  },
  withData: {
    fetchAttachments: ({ activeProject, itemId, level }) =>
      fetch(logItems(activeProject, itemId, level)),
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
  .add('With all icon types', () =>
    <WithState state={state}>
      <Attachments
        attachmentService={attachmentService.all} />
    </WithState>)
  .add('With mock data', () =>
    <WithState state={state}>
      <Attachments
        attachmentService={attachmentService.withData} />
    </WithState>);
