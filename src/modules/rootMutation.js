import { mutations as users } from './users';
import { mutations as auth } from './auth';
import { mutations as file } from './files';

export default {
  ...users,
  ...auth,
  ...file,
};
