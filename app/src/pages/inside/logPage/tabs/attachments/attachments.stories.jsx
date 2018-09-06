/*
 * Copyright 2017 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/reportportal/service-ui
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */

import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import { withReadme } from 'storybook-readme';
import {
  xml,
  php,
  json,
  js,
  har,
  css,
  csv,
  html,
  pic,
  txt,
  zip,
  rar,
  tgz,
  tar,
  gzip,
} from 'common/img/launch/attachments';
import Attachments from './attachments';
import README from './README.md';

const fileTypes = { xml, php, json, js, har, css, csv, html, pic, txt, zip, rar, tgz, tar, gzip };
const attachment = (id, fileType, text) => ({
  id,
  fileType,
  src: fileTypes[fileType],
  alt: text,
});
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomAttachment = (id) => {
  const fileType = pickRandom(Object.keys(fileTypes));
  return attachment(id, fileType, 'This is an icon');
};

const attachmentService = {
  fetchAttachments: () => Promise.resolve([...Array(20)].map((d, id) => randomAttachment(id))),
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
  .add('default state', () => <Attachments attachmentService={attachmentService} />);
