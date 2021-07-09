<template>
    <div class="cus-lab">
        <input
            class="cus-lab-input"
            placeholder=" "
            :type="typeInput"
            :id="randomId"
            :value="value"
        />
        <label class="cus-lab-label" :for="randomId">{{ name }}</label>
    </div>
</template>

<script>
export default {
    name: 'LabelInput',
    props: {
        name: String,
        typeInput: {
            type: String,
            default: 'text'
        },
        value: String
    },
    computed: {
        randomId() {
            const name = this.name;
            return name + Math.floor(Math.random() * 100);
        }
    }
};
</script>

<style lang="scss" scoped>
.cus-lab {
    position: relative;
    &-label {
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        transition: 0.2s ease;
        font-weight: 500;
        color: #999;
    }

    &-input {
        font-size: 0.825rem;
        padding: 0.5rem 0.75rem;
        width: 100%;
        height: 50px;
        border: 1px solid #eee;
        font-size: 14px;
        border-radius: 5px;

        &:not(:placeholder-shown) {
            & + .cus-lab-label {
                outline: 1px solid #4195e8;
                visibility: inherit;
                top: 0px;
                font-size: 12px;
                background: #fff;
                padding: 0px 10px 0 5px;
                border: none;
                outline: none;
                left: 2px;
                color: #605f66;
            }
        }

        &:focus + .cus-lab-label {
            outline: 1px solid #4195e8;
            visibility: inherit;
            top: 0px;
            font-size: 12px;
            background: #fff;
            padding: 0px 10px;
            border: none;
            outline: none;
            left: 2px;
            color: #605f66;
        }

        &:focus {
            outline: 1px solid #eee;
            background: #fff;
        }
    }
}
</style>
