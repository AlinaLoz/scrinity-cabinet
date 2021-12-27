import config from '@utils/config';

export class UrlHelper {

  static getImageSrc(filename: string, url = config.APP_STATIC_FILES): string {
    return `${url}/${filename}`;
  }

}
