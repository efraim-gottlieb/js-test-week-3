const getJson = (response) => response.json();

async function get(url, returnData = true) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (returnData) return getJson(response);
    return response;
  } catch (err) {
    return err.message;
  }
}

async function post(url, obj, returnData = true, method = "POST") {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (returnData) return getJson(response);
    return response;
  } catch (err) {
    return err.message;
  }
}

export default { get, post };
