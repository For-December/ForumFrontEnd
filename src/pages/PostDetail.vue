<script setup lang="ts">

import {useRoute} from "vue-router";

const route = useRoute()
const a = route.query.id;

</script>

<template>
{{a}}
</template>

<style scoped>

</style>