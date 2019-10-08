import { EncodeOptions } from 'node-stego';
import { version as stegoVersion } from 'node-stego/package.json';
import { Image } from 'img-crawler/src/entities/Image';
import { Suite, SuiteStatus } from '../entities/Suite';
import { createImageUrl } from './createImageUrl';
import { createRandomIdentifier } from './createRandomIdentifier';

export function createSuite(image: Image, options: EncodeOptions) {
  const suite = new Suite();

  // apply stego options
  Object.assign(suite, options);

  suite.fbUrl = '';
  suite.vendorUrl = createImageUrl(image);
  suite.text = createRandomIdentifier(50);
  suite.pass = createRandomIdentifier(10);
  suite.version = stegoVersion;
  suite.status = SuiteStatus.NOT_DEPEND;
  return suite;
}
