import helloHomeassistant from './hello-homeassistant.json';
import migratingTsql from './migrating-tsql.json';

export const blogPostMap = {
  [helloHomeassistant.id]: helloHomeassistant,
  [migratingTsql.id]: migratingTsql,
};

export const blogPostList = Object.values(blogPostMap);
