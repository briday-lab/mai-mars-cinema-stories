import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    ["/", "/{-$locale}/", undefined],
    ["/slate", "/{-$locale}/slate", undefined],
    ["/about", "/{-$locale}/about", undefined],
    ["/fr", "/{-$locale}/", "fr"],
    ["/fr/slate", "/{-$locale}/slate", "fr"],
    ["/fr/about", "/{-$locale}/about", "fr"],
    ["/contact", "/{-$locale}/contact", undefined],
    ["/fr/contact", "/{-$locale}/contact", "fr"],
  ])("matches %s to the right page and language", (path, routeId, locale) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const leaf = router.matchRoutes(path).at(-1);

    expect(leaf?.routeId).toBe(routeId);
    expect((leaf?.params as { locale?: string }).locale).toBe(locale);
  });
});
