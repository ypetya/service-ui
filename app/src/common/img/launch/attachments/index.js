import xml from 'common/img/launch/attachments/xml.svg';
import php from 'common/img/launch/attachments/php.svg';
import json from 'common/img/launch/attachments/json.svg';
import js from 'common/img/launch/attachments/js.svg';
import har from 'common/img/launch/attachments/har.svg';
import css from 'common/img/launch/attachments/css.svg';
import csv from 'common/img/launch/attachments/csv.svg';
import html from 'common/img/launch/attachments/html.svg';
import pic from 'common/img/launch/attachments/pic.svg';
import txt from 'common/img/launch/attachments/txt.svg';
import archive from 'common/img/launch/attachments/archive.svg';
import attachment from 'common/img/launch/attachments/attachment.png';

const zip = archive;
const rar = archive;
const tgz = archive;
const tar = archive;
const gzip = archive;

export const EXTENSION_MAP = {
    xml, php, 'x-php': php, json, js, har, css, csv, html, pic, txt, zip, rar,
    tgz, tar, gzip, attachment
};

export function getIcon(extension) {
    return EXTENSION_MAP[extension.toLowerCase()] || attachment;
}