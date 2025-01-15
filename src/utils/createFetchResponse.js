function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

export default createFetchResponse;
