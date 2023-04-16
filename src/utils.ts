export type Params = { [key: string]: string | string[] | boolean };

export const getAllUrlParams = (url: string) => {
  // get query string from url (optional) or window
  let queryString = url ? url.split("?")[1] : window.location.search.slice(1);
  const base = url ? url.split("?")[0] : window.location.search.slice(0);

  // we'll store the parameters here
  let obj: Params = {};

  obj["_"] = base;

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    const arr = queryString.split("&");

    for (let i = 0; i < arr.length; i++) {
      // separate the keys and the values
      const a = arr[i].split("=");

      // set parameter name and value (use 'true' if empty)
      let paramName = a[0];
      let paramValue = typeof a[1] === "undefined" ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === "string") {
        paramValue = paramValue.toLowerCase();
      }

      if (!obj[paramName]) {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};

export const getUrlFromParams = (params: Params): string => {
  let url: string = `${params._}`;

  delete params._;
  let queryParams = [];
  for (let key in params) {
    const value = params[key];
    queryParams.push(`${key}=${value}`);
  }
  if (queryParams.length) {
    url = url + "?" + queryParams.join("&");
  }

  return url;
};
