import type { ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext) => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error(
      'GOOGLE_MAPS_API_KEY is missing from the .env.local file.'
    );
  }

  return {
    ...config,
    android: {
      ...config.android,
      package: 'com.brksbkr.communityissuereporter',
    },
    plugins: [
      ...(config.plugins ?? []),
      [
        'react-native-maps',
        {
          androidGoogleMapsApiKey: googleMapsApiKey,
        },
      ],
    ],
  };
};