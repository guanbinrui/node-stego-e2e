import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { Image } from '../modules/img-crawler/src/entities/Image';
import { Vendor } from '../modules/img-crawler/src/entities/Vendor';
import { Suite } from '../entities/Suite';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return createConnection({
    ...connectionOptions,
    entities: [Image, Vendor, Suite],
    name: 'default',
  }) as Promise<Connection>;
};
