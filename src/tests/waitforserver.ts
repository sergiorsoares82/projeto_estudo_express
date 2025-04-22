const waitForServer = async (url: string, retries = 10) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      await new Promise((res) => setTimeout(res, 300)); // espera 300ms
    }
  }
  throw new Error("Servidor não respondeu a tempo.");
};

export default waitForServer;
