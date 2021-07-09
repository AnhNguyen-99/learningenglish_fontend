<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
    created() {
        const currentPath = this.$router.currentRoute._value.fullPath;
        if (currentPath !== '/') {
            const isLogin = this.$cookies.get('isLogin');
            if (!isLogin) {
                this.$router.push({ name: 'SignPage' });
            }
        }
    }
};
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>
