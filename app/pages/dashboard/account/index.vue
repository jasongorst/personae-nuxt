<template>
  <DataTable
    :data="data"
    :fields="fields"
    :defaultSort="{ field: 'id', direction: 'asc' }"
    :row-link = "rowLink"
    name="account"
    create-url="/dashboard/account/create"
  />
</template>

<script setup>
const alert = useAlert()
const { token } = useAuth()
const fields = [ "id", "email", "status", "admin" ]

const template = "/dashboard/account/edit-{{ row?.id }}"
const compiled = _template(template, { interpolate: /{{([\s\S]+?)}}/g })
const rowLink = (row) => compiled({ row: row })

// noinspection JSCheckFunctionSignatures
const { data, status } = await useApi(
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

</style>
