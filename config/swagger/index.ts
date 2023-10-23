const {
  SWAGGER_TITLE,
  SWAGGER_DESCRIPTION,
  SWAGGER_VERSION,
  SWAGGER_API_PREFIX,
  SWAGGER_AUTH_TYPE,
  SWAGGER_AUTH_SCHEMA,
  SWAGGER_AUTH_NAME,
  SWAGGER_AUTH_DESCRIPTION,
  SWAGGER_AUTH_BEARER_FORMAT,
} = process.env;
export const swaggerConfig = {
  title: SWAGGER_TITLE || 'AD INSIGHTS',
  description: SWAGGER_DESCRIPTION || 'Ad insights  API List',
  version: SWAGGER_VERSION || '1.0',
  auth: {
    type: SWAGGER_AUTH_TYPE || 'http',
    schema: SWAGGER_AUTH_SCHEMA || 'bearer',
    name: SWAGGER_AUTH_NAME || 'Authorization',
    description: SWAGGER_AUTH_DESCRIPTION || 'JWT Token',
    bearer_format: SWAGGER_AUTH_BEARER_FORMAT || 'JWT',
  },
  apiPrefix: SWAGGER_API_PREFIX || 'api',
};
