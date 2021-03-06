import { EncodeOptions } from '../modules/node-stego';
import { version as stegoVersion } from '../modules/node-stego/package.json';
import { Image } from '../modules/img-crawler/src/entities/Image';
import { Suite, SuiteStatus } from '../entities/Suite';
import { createImageUrl } from './createImageUrl';
import { createRandomIdentifier } from './createRandomIdentifier';
import { Options } from '../flag';

export function createSuite(
  image: Image,
  { media }: Options,
  stegoOptions: EncodeOptions
) {
  const suite = new Suite();

  // apply stego options
  Object.assign(suite, stegoOptions);

  suite.media = media;
  suite.mediaUrl = '';
  suite.vendorUrl = createImageUrl(image);
  suite.text = createRandomIdentifier(50);
  suite.pass = createRandomIdentifier(10);
  suite.version = stegoVersion;
  suite.status = SuiteStatus.NOT_DEPEND;
  return suite;
}
