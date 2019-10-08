import { Image } from 'img-crawler/src/entities/Image';
import { VendorType } from 'img-crawler/src/entities/Vendor';

export function createImageUrl(image: Image) {
  const { vid, vendor } = image;

  switch (vendor.name) {
    case VendorType.PEXELS:
      return `https://images.pexels.com/photos/${vid}/pexels-photo-${vid}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;
    case VendorType.UNSPLASH:
      return `https://images.unsplash.com/photo-${vid}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80`;
    case VendorType.INS:
      break;
    default:
      throw new Error('unknown vendor type');
  }
}
