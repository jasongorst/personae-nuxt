<template>
  <CharacterSkeleton
    v-if="status !== 'success'"
  />

  <template v-else>
    <AccountGrid
      :accounts="accounts"
      :account-attributes="accountAttributes"
      :sort="sort"
      @sort="(attribute) => cycleSort(attribute)"
    />

    <AccountToolbar
      :count="accounts.length"
    />
  </template>
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

const { data: accounts, status } = await useApi(
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
