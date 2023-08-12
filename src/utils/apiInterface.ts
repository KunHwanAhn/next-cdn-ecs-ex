import axios from 'axios';
import logger from '@/logger';

const baseInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

baseInstance.interceptors.response.use(null, (error) => {
  logger.error({ error }, `error message: ${error.message}`);

  if (error.response) {
    logger.error({ error }, `error status: ${error.response.status}`);
  }

  return Promise.reject(error);
});

export default baseInstance;
