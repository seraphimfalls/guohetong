<template>
  <div>
      111
  </div>
</template>

<script>
import * as userApi from "../../axios/user"
export default {
    data(){

    },
    async created () {
        const res = await userApi.login()
        console.log(res)
    }
}
</script>

<style>

</style>