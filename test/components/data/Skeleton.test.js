import { mountSuspended } from "@nuxt/test-utils/runtime"
import DataSkeleton from "~/components/data/Skeleton.vue"

it("should render", async () => {
  const wrapper = await mountSuspended(DataSkeleton)

  expect(wrapper.get("[data-testid='data-skeleton']").exists()).toBe(true)
})
