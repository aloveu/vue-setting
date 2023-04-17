<template>
    <div>
        브랜드 리스트
        <Accordion>
            <AccordionTab header="Header I"> Content </AccordionTab>
            <AccordionTab header="Header II"> Content </AccordionTab>
            <AccordionTab header="Header III"> Content </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
</script>

<style scoped lang="scss"></style>
