import createApp from './app';
import config from './config';

const app = createApp();

app.listen(config.port || 8081, () => {
  // eslint-disable-next-line no-console
  console.log('Running on port 8081');
});
