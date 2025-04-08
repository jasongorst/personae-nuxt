<template>
  <table
    class="w-full table table-pin-rows table-sm xl:table-md table-zebra mb-4"
    data-testid="account-grid"
  >
    <thead>
    <tr class="bg-base-300">
      <th
        v-for="attribute in accountAttributes"
        :key="attribute"
        :data-tip="attributeTooltip(attribute)"
        class="text-secondary select-none font-light table-cell tooltip tooltip-bottom tooltip-primary
          tooltip-late tooltip-bottom-close hover:text-primary"
        @click="cycleSort(attribute)"
      >
        <div class="uppercase font-bold flex flex-row gap-0.25 items-center">
          <div>
            {{ _startCase(attribute) }}
          </div>

          <div class="w-0 overflow-x-visible">
            <Icon
              v-if="sort.attribute === attribute"
              :name="sort.direction === 'asc' ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold'"
              size="1.125rem"
              class="block! text-accent"
            />
          </div>
        </div>
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="account in accounts"
      :key="account.id"
      class="hover"
    >
      <td
        v-for="attribute in accountAttributes"
        :key="attribute"
        class="p-0!"
      >
        <!--suppress HtmlUnknownTarget -->
        <NuxtLink
          :to="`/dashboard/account/edit-${account.id}`"
          class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
        >
          <span v-if="isPresent(account[attribute])">
            {{ account[attribute] }}
          </span>

          <span v-else>
            &nbsp;
          </span>
        </NuxtLink>
      </td>
    </tr>
    </tbody>
  </table>

  <div class="sticky bottom-0 w-full -mt-4 accounts-toolbar">
    <div class="bg-primary text-primary-content p-4 flex flex-row justify-between text-sm">
      <div class="leading-6">
        {{ accounts.length + " account" + (accounts.length > 1 ? "s" : "") }}
      </div>

      <NuxtLink
        to="/dashboard/account/create"
        class="justify-self-end btn btn-xs btn-secondary uppercase"
      >
        Add

        <Icon
          name="ph:plus-bold"
          size="0.85rem"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const alert = useAlert()
const { token } = useAuth()

const accountAttributes = [ "id", "email", "status", "admin" ]

const sort = ref({
  attribute: "id",
  direction: "asc"
})

function cycleSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.direction === "asc") {
      // current sort attribute, descending order
      sort.value.direction = "desc"
    } else {
      // default sort
      sort.value.attribute = "id"
      sort.value.direction = "asc"
    }
  } else {
    // change sort attribute, ascending order
    sort.value.attribute = attribute
    sort.value.direction = "asc"
  }

  sortAccounts()
}

function sortAccounts() {
  if (sort.value.direction === "asc") {
    accounts.value.sort(compareAsc(sort.value.attribute))
  } else {
    accounts.value.sort(compareDesc(sort.value.attribute))
  }
}

function attributeTooltip(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.direction === "asc") {
      return "Click to reverse sort order."
    } else {
      return "Click for default order."
    }
  } else {
    return `Click to sort by ${_startCase(attribute)}.`
  }
}

const { data: accounts } = await useApi(
  "/accounts",
  {
    token: token,

    onRequestError: () => {
      alert.add(
        "Couldn't load accounts. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponseError: () => {
      alert.add(
        "Couldn't load accounts. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .accounts-toolbar {
    @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100 before:to-transparent;
    @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
  }
}
</style>
