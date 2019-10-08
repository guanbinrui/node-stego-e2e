import { createTypeormConn } from './helpers/createTypeormConn';
import { Image } from './entities/Image';
import { createSuite } from './helpers/createSuite';
import { encode, decode, EncodeOptions } from 'node-stego/lib';
import { uploadImage } from 'img-poster/lib/fb/uploadImage';
import { getRequestPayload } from 'img-poster/lib/fb/getUserInfo';
import { downloadImage } from 'img-poster/lib/helpers/downloadImage';
import { Suite, SuiteStatus } from './entities/Suite';

export interface Options {
  name: string;
  pass: string;
  generate: boolean;
  validate: boolean;
}

export async function generateSuite(
  { name, pass }: Options,
  stegoOptions: EncodeOptions
) {
  await createTypeormConn();

  const images = await Image.find({ relations: ['vendor'] });
  const payload = await getRequestPayload(name, pass);

  for (let image of images) {
    const suite = createSuite(image, stegoOptions);
    const vendorImgBuf = await downloadImage(suite.vendorUrl);
    const stegoImgBuf = await encode(vendorImgBuf, suite);

    suite.fbUrl = await uploadImage(stegoImgBuf, payload);
    await suite.save();
  }
}

export async function validateSuite(stegoOptions: EncodeOptions) {
  await createTypeormConn();

  const suites = await Suite.find({
    status: SuiteStatus.NOT_DEPEND,
  });

  for (let suite of suites) {
    const stegoImgBuf = await downloadImage(suite.fbUrl);
    const text = await decode(stegoImgBuf, suite);

    suite.status = text === suite.text ? SuiteStatus.SUCCESS : SuiteStatus.FAIL;
    await suite.save();
  }
}
