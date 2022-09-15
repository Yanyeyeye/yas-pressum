<script lang="ts" setup>
const router = useRouter()
const go = () => {
  router.push('/HelloWord')
}
</script>

<template>
  <h1>Hello World</h1>
  <button btn m-3 @click="go">
    Go
  </button>
</template>
