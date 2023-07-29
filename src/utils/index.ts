/**
 * Query String을 문자열로 변환하는 함수
 *
 * @param {string | string[] | undefined} qs
*/
// eslint-disable-next-line import/prefer-default-export
export const getQueryStringAsString = (qs: string | string[] | undefined): string => {
  if (typeof qs === 'string') {
    return qs;
  }

  if (Array.isArray(qs)) {
    return qs[0];
  }

  return '';
};
