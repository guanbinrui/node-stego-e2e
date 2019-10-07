import { Suite, SuiteStatus } from '../entities/Suite';
import { version as stegoVersion } from 'node-stego/package.json';
import { createRandomIdentifier } from './createRandomIdentifier';
import { Image } from '../entities/Image';
import { createImageUrl } from './createImageUrl';
import { EncodeOptions } from 'node-stego';

export function createSuiteFFT1D(image: Image, options: EncodeOptions) {
  const suite = new Suite();

  // apply stego options
  Object.assign(suite, options);

  suite.fbUrl = '';
  suite.vendorUrl = createImageUrl(image);
  suite.text = createRandomIdentifier(50);
  suite.pass = createRandomIdentifier(10);
  suite.version = stegoVersion;
  suite.status = SuiteStatus.NOT_DEPEND;
  suite.image = image;
  return suite;
}
