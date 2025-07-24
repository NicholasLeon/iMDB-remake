export async function GET() {
  const res = await fetch(
    "https://www.omdbapi.com/?i=tt3896198&apikey=5ce81b0"
  );
  const data = await res.json();
  return Response.json(data);
}
