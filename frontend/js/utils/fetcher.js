async function fetcher(url) {
  const res = await fetch(url);
  console.log(res);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

export { fetcher };