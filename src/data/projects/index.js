import zSuite from './z-suite.json';
import inCloud from './incloud.json';
import mbank from './mbank.json';
import nieMaNudy from './nie-ma-nudy.json';
import showSize from './showsize.json';
import materialCalibration from './material-calibration.json';

export const projectMap = {
  'z-suite': zSuite,
  incloud: inCloud,
  mbank,
  'nie-ma-nudy': nieMaNudy,
  showsize: showSize,
  'material-calibration': materialCalibration,
};

export const projectList = Object.values(projectMap);
