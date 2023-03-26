const validateRequestData = (req) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    console.error(`[SERVER] Couldn't obtain proper authentication data`);

    return;
  }

  return { email, password, displayName };
};

export { validateRequestData };
