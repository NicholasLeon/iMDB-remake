import { notFound } from "next/navigation";
import { MovieDetail } from "../../../../types/movie";

export default async function MovieDetailPage(props: {
  params: Promise<{ imdbID: string }>;
}) {
  const { imdbID } = await props.params;

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=5ce81b0&i=${imdbID}&plot=full`
  );
  const data: MovieDetail = await res.json();

  if (!data || data.Response === "False") return notFound();

  return (
    <section className="p-6 md:p-10 max-w-5xl mx-auto md:mt-24">
      <div className="flex justify-center items-center flex-col md:flex-row gap-6">
        <img
          src={data.Poster}
          alt={data.Title}
          className="w-full top-10 md:w-64 rounded shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2x1 md:text-3xl font-bold">{data.Title}</h1>
          <p className="text-gray-500 mb-4">
            {data.Year} • {data.Runtime} • {data.Genre}
          </p>

          <p className="mb-4 text-lg leading-relaxed">{data.Plot}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <p>
              <span className="font-semibold">Director:</span> {data.Director}
            </p>
            <p>
              <span className="font-semibold">Writer:</span> {data.Writer}
            </p>
            <p>
              <span className="font-semibold">Actors:</span> {data.Actors}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {data.Language}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {data.Country}
            </p>
            <p>
              <span className="font-semibold">Awards:</span> {data.Awards}
            </p>
            <p>
              <span className="font-semibold">Released:</span> {data.Released}
            </p>
            <p>
              <span className="font-semibold">Box Office:</span>{" "}
              {data.BoxOffice}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Ratings</h2>
            <ul className="space-y-1">
              {data.Ratings.map((rating, idx) => (
                <li key={idx} className="text-sm">
                  <span className="font-medium">{rating.Source}</span>:{" "}
                  {rating.Value}
                </li>
              ))}
              <li className="text-sm">
                <span className="font-medium">IMDb Rating</span>:{" "}
                {data.imdbRating} ({data.imdbVotes} votes)
              </li>
            </ul>
          </div>

          <a
            href={`https://www.imdb.com/title/${data.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-blue-600 hover:underline text-sm"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </section>
  );
}
