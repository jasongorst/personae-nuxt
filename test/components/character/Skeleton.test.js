import { mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterSkeleton from "~/components/character/Skeleton.vue"

it("should render", async () => {
  const wrapper = await mountSuspended(CharacterSkeleton)

  expect(wrapper.get("[data-testid='skeleton']").exists()).toBe(true)
})
