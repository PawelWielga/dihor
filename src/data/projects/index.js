// ZORTRAX
import zSuite from '../projects/zortrax/zsuite.json';
import inCloud from '../projects/zortrax/incloud.json';
import materialCalibration from '../projects/zortrax/materialcalibration.json';

// MBANK
import mbank from '../projects/mbank/mbank.json';
import mbankcimonitor from '../projects/mbank/mbankcimonitor.json';
import jiraapiintegrationtools from '../projects/mbank/jiraapiintegrationtools.json';

// HOME-MADE
import nieMaNudy from '../projects/home/niemanudy.json';
import showSize from '../projects/home/showsize.json';
import skincrafter from '../projects/home/skincrafter.json';
import hacomponents from '../projects/home/hacomponents.json';

import { projectDetailsMap } from '../../content/index.js';

const rawProjects = [
  // zortrax
  zSuite,
  inCloud,
  materialCalibration,

  // mbank
  mbank,
  mbankcimonitor,
  jiraapiintegrationtools,

  // home-made
  nieMaNudy,
  skincrafter,
  hacomponents,
  showSize,
];

function withDetails(project) {
  return {
    ...project,
    hasDetails: Boolean(project.hasDetails || projectDetailsMap[project.id]),
  };
}

export const projectList = rawProjects.map((project) => withDetails(project));
export const projectMap = Object.fromEntries(projectList.map((project) => [project.id, project]));
export { projectDetailsMap };
