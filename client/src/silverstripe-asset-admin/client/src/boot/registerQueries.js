import Injector from 'lib/Injector';
import { fileInterface, file } from 'lib/fileFragments';
import readFilesQuery from 'state/files/readFilesQuery';
import readOneFileQuery from 'state/files/readOneFileQuery';
import readFilesQueryLegacy from 'state/files/_legacy/readFilesQuery';
import readDescendantFileCountsQuery from 'state/files/readDescendantFileCountsQuery';
import readOneFileQueryLegacy from 'state/files/_legacy/readOneFileQuery';
import readFileUsageQuery from 'state/files/readFileUsageQuery';

// Backward compatibility hack. Remove when GraphQL 4 is in core
const isLegacy = !!document.body.getAttribute('data-graphql-legacy');

const registerQueries = () => {
  Injector.query.registerFragment('FileInterfaceFields', fileInterface);
  Injector.query.registerFragment('FileFields', file);
  Injector.query.register('ReadFilesQuery', isLegacy ? readFilesQueryLegacy : readFilesQuery);
  Injector.query.register('readDescendantFileCountsQuery', readDescendantFileCountsQuery);
  Injector.query.register('ReadOneFileQuery', isLegacy ? readOneFileQueryLegacy : readOneFileQuery);
  Injector.query.register('readFileUsageQuery', readFileUsageQuery);
};
export default registerQueries;
