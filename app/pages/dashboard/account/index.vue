<template>
  <div>
    <table class="w-full table table-pin-rows table-sm xl:table-md table-zebra mb-4">
      <thead>
      <tr class="bg-base-300">
        <th
          v-for="attribute of accountAttributes"
          :key="attribute"
          :data-tip="attributeTooltip(attribute)"
          class="text-secondary select-none tooltip tooltip-bottom tooltip-near tooltip-late tooltip-primary font-light hover:text-primary table-cell"
          @click="updateSort(attribute)"
        >
          <span class="uppercase font-bold">
            {{ _startCase(attribute) }}
          </span>

          <span class="inline-block w-0 overflow-x-visible text-accent">
            <Icon
              v-if="sort.attribute === attribute"
              :name="sort.sortDirection === 'asc' ? 'fa6-solid:arrow-down-a-z' : 'fa6-solid:arrow-down-z-a'"
              class="w-[1.25em] h-[1em] -mt-[0.1667em]"
            />
          </span>
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
          v-for="attribute of accountAttributes"
          :key="attribute"
          class="!p-0"
        >
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
  </div>

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
        <Icon name="fa6-solid:plus" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const alertStore = useAlertStore()
const accountAttributes = ["id", "email", "status", "admin"]

const sort = ref({
  attribute: "id",
  sortDirection: "asc",
})

function updateSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.sortDirection === "asc") {
      sort.value.sortDirection = "desc"
    } else {
      sort.value.attribute = "id"
      sort.value.sortDirection = "asc"
    }
  } else {
    sort.value.attribute = attribute
    sort.value.sortDirection = "asc"
  }

  sortAccounts()
}

function sortAccounts() {
  if (sort.value.sortDirection === "asc") {
    accounts.value.sort(compareAsc(sort.value.attribute))
  } else {
    accounts.value.sort(compareDesc(sort.value.attribute))
  }
}

function attributeTooltip(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.sortDirection === "asc") {
      return "Click to reverse sort order."
    } else {
      return "Click for default order."
    }
  } else {
    return `Click to sort by ${_startCase(attribute)}.`
  }
}

const { data: accounts } = await useApiCall(
  "http://localhost:3000/accounts",
  {
    apiErrorCb: () => {
      alertStore.addMessage(
        "Couldn't load accounts. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "Couldn't load accounts. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style scoped>
.tooltip-near {
  --tooltip-offset: calc(100% + 1px - 0.4125rem + var(--tooltip-tail, 0px));
  --tooltip-tail: 0.1875rem;
  --tooltip-tail-offset: calc(100% + 0.0625rem - 0.4125rem - var(--tooltip-tail));
}

.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}

.accounts-toolbar {
  @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100 before:to-transparent;

  @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
}
</style>
