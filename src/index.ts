import { createTypeormConn } from './helpers/createTypeormConn';
import { Image } from './entities/Image';
import { constructImageUrl } from './helpers/constructImageUrl';

async function start() {
  await createTypeormConn();

  const urls = (await Image.find({ relations: ['vendor'] })).map(
    constructImageUrl
  );
}

start();
