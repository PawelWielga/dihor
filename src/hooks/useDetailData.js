import { useMemo } from 'react';

export function useDetailData(dataMap, id) {
  const data = useMemo(() => {
    if (!dataMap || typeof dataMap !== 'object') {
      return null;
    }
    return dataMap[id] || null;
  }, [dataMap, id]);

  const exists = data !== null;

  return { data, exists, id };
}

export default useDetailData;
