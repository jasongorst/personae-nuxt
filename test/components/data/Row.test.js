import { mountSuspended } from "@nuxt/test-utils/runtime"
import DataRow from "~/components/data/Row.vue"

const fields = [ "id", "player", "name" ]
const row = { id: 1, player: "one", name: null }

describe("without rowLink prop", async () => {
  let wrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(DataRow, {
      props: {
        row: row,
        fields: fields
      }
    })
  })

  it("should render", async () => {
    expect(wrapper.get("[data-testid='data-row']").exists()).toBe(true)
  })

  it("should render three fields", async () => {
    expect(wrapper.findAll("td")).toHaveLength(3)
  })

  it("should include text for a non-blank field", async () => {
    expect(wrapper.get("td:first-child").text()).toBe("1")
  })

  it("should include &nbsp; for a blank field", async () => {
    expect(wrapper.get("td:last-child").html()).toContain("&nbsp;")
  })
})

describe("with rowLink prop", async () => {
  it("should wrap fields with link if rowLink prop is given", async () => {
    const wrapper = await mountSuspended(DataRow, {
      props: {
        row: row,
        fields: fields,
        rowLink: () => "/"
      }
    })

    expect(wrapper.get("td:first-child a").exists()).toBe(true)
    expect(wrapper.get("td:first-child a").attributes("href")).toBe("/")
  })
})
