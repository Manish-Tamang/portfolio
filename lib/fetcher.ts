export default async function fetcher(url: string, method: string = "GET") {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
}
