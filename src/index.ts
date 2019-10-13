import { In } from 'typeorm';
import { EncodeOptions, decode, encode } from './modules/node-stego/src';
import { downloadImage } from './modules/img-poster/src/helpers/downloadImage';
import { getUserInfo, uploadImage } from './modules/img-poster/src';
import { Image } from './modules/img-crawler/src/entities/Image';
import { Suite, SuiteStatus } from './entities/Suite';
import { createSuite } from './helpers/createSuite';
import { createTypeormConn } from './helpers/createTypeormConn';
import { createImageUrl } from './helpers/createImageUrl';
import { Options } from './flag';

export async function generateSuite(
  { name, pass, media }: Options,
  stegoOptions: EncodeOptions
) {
  await createTypeormConn();

  const images = await Image.find({ relations: ['vendor'] });
  const payload = await getUserInfo(media, name, pass);

  for (const image of images) {
    const {
      clip,
      copies,
      size,
      tolerance,
      grayscaleAlgorithm,
      transformAlgorithm,
    } = stegoOptions;
    const suite =
      (await Suite.findOne({
        clip,
        copies,
        size,
        tolerance,
        grayscaleAlgorithm,
        transformAlgorithm,
        vendorUrl: createImageUrl(image),
      })) || createSuite(image, stegoOptions);

    if (suite.id) {
      process.stderr.write('suite has been created:\n');
      process.stderr.write(`${JSON.stringify(suite)}\n`);
      continue;
    }

    // prevent from duplication
    try {
      await suite.save();
    } catch (err) {
      process.stderr.write(`${suite.vendorUrl}: ${err.message}\n`);
    }
    try {
      const vendorImgBuf = await downloadImage(suite.vendorUrl);
      const stegoImgBuf = await encode(vendorImgBuf, suite);

      suite.fbUrl = await uploadImage(media, stegoImgBuf, payload);
      await suite.save();
    } catch (err) {
      await suite.remove();
      process.stderr.write(`${suite.vendorUrl}: ${err}\n`);
    }
  }
}

export async function censorSuite() {
  await createTypeormConn();

  const suites = await Suite.find({
    status: SuiteStatus.NOT_DEPEND,
  });

  for (const suite of suites) {
    const vendorImgBuf = await downloadImage(suite.vendorUrl);
    const stegoImgBuf = await encode(vendorImgBuf, suite);

    suite.status =
      (await decode(stegoImgBuf, suite)) === suite.text
        ? SuiteStatus.QUALIFIED
        : SuiteStatus.MALFORMED;
    await suite.save();
  }
}

export async function validateSuite() {
  await createTypeormConn();

  const suites = await Suite.find({
    status: In([SuiteStatus.NOT_DEPEND, SuiteStatus.QUALIFIED]),
  });

  for (const suite of suites) {
    if (!suite.fbUrl) {
      continue;
    }

    const stegoImgBuf = await downloadImage(suite.fbUrl);
    const text = await decode(stegoImgBuf, suite);

    suite.status = text === suite.text ? SuiteStatus.SUCCESS : SuiteStatus.FAIL;
    await suite.save();
  }
}
