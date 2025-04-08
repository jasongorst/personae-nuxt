import { expect, test } from "@nuxt/test-utils/playwright"

test("renders", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" })
  await expect(page.getByTestId("title")).toHaveText("Dramatis Personae")
})
