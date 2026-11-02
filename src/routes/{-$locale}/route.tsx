import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}")({
  // Only /fr is a real prefix; anything else (e.g. /xyz) is a 404, not an English page.
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && params.locale !== "fr") throw notFound();
  },
  component: Outlet,
});
