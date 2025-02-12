<template>
    <div class="floating-label-input">
        <input :id="id" :type="type" :value="modelValue"
            @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)" :placeholder="placeholder"
            :required="required" />
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    type: string;
    modelValue: string | number | Date | null;
    label: string;
    placeholder?: string;
    required?: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.floating-label-input {
    position: relative;
    margin-bottom: 1rem;

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid $border-color;
        border-radius: 4px;
        outline: none;
        font-weight: normal;


        &:focus {
            border-color: $primary-color;
        }

        &:focus+label,
        &:not(:placeholder-shown)+label {
            top: -10px;
            left: 10px;
            font-size: 12px;
            background-color: white;
            padding: 0 5px;
        }
    }

    label {
        position: absolute;
        top: 10px;
        left: 10px;
        color: #696969;
        transition: all 0.2s ease;
        pointer-events: none;
    }
}
</style>