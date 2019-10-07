import { getConnectionOptions, createConnection } from 'typeorm';
import { Image } from '../entities/Image';
import { Vendor } from '../entities/Vendor';
import { Suite } from '../entities/Suite';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        entities: [Image, Vendor, Suite],
        name: 'default',
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' });
};
