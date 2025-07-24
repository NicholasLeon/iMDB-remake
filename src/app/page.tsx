import { Suspense } from "react";
import MovieSearch from "./components/MovieSearch";

export default function MainPage() {
  return (
    <main>
      <Suspense>
        <MovieSearch />
      </Suspense>
    </main>
  );
}
