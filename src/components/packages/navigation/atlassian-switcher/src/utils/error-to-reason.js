
export function errorToReason(error) {
  const { name = 'Unknown', status = undefined } = error || {};

  return {
    name,
    status,
  };
}
