import React from 'react';

import { IFile } from '@interfaces/chats.interfaces';
import { UrlHelper } from '@helpers/url.helper';
import config from '@utils/config';
import styles from './chat-images.module.scss';

interface IProps {
  files: IFile[];
}

export const ChatImages: React.FC<IProps> = ({ files }) => (
  <>
    <span className={styles.mediaPreview}>
      {files.slice(0, 4).map((file) => (
        <img key={file.filename} src={UrlHelper.getImageSrc(file.filename, config.FEEDBACK_STATIC_FILES)} alt={file.filename} />
      ))}
      <span>Фото</span>
    </span>
  </>
);
