import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export type Area = {
  id: string;
  name: string;
  description: string;
  image?: {
    url: string;
  };
  latitude: string;
  longtude: string;
};