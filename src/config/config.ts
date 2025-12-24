const config = {
  CloudFrontUrl: import.meta.env.VITE_CLOUDFRONT,
};

const _config = Object.freeze(config);

export default _config;

export type Config = typeof _config;