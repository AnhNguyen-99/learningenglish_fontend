<template>
    <div class="sign">
        <div class="sign__image">
            <img src="@/assets/images/common/bg-login-01.jpg" alt="" />
        </div>

        <div class="sign__form">
            <div>
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" tab="Đăng nhập">
                        <form autocomplete="off" class="sign__form--signin">
                            <a-alert
                                v-if="isError"
                                message="Lỗi"
                                description="Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại !"
                                type="error"
                                show-icon
                            />
                            <div class="cus-lab">
                                <input
                                    type="text"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signin_username"
                                    v-model.lazy="signin_username"
                                    required
                                />
                                <label
                                    class="cus-lab-label"
                                    for="#signin_username"
                                    >Tên người dùng</label
                                >
                            </div>

                            <div class="cus-lab">
                                <input
                                    type="password"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signin_password"
                                    v-model.lazy="signin_password"
                                    autocomplete="off"
                                    required
                                />
                                <label
                                    class="cus-lab-label"
                                    for="#signin_password"
                                    >Mật khẩu</label
                                >
                            </div>
                            <a-button
                                type="primary"
                                block
                                size="large"
                                class="space-mt-1"
                                @click="signIn()"
                                :loading="isSign"
                                >Đăng nhập
                            </a-button>

                            <a-space class="sign__options">
                                <a-checkbox style="margin-top: 0.5rem">
                                    Ghi nhớ tôi
                                </a-checkbox>
                                <a href="#">Quên mật khẩu?</a>
                            </a-space>
                            <div class="sign__social">
                                <span>Đăng nhập bằng</span>
                                <div class="sign__icons">
                                    <a href="#">
                                        <fa
                                            :icon="['fab', 'facebook']"
                                            style="color: blue"
                                        />
                                    </a>
                                    <a href="">
                                        <fa
                                            :icon="['fab', 'github']"
                                            style="color: black"
                                        />
                                    </a>
                                    <a href="">
                                        <fa
                                            :icon="['fab', 'google']"
                                            style="color: gray"
                                        />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Đăng ký" force-render>
                        <form autocomplete="off" class="sign__form--signup">
                            <div class="cus-lab">
                                <input
                                    type="text"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signup_username"
                                    v-model="signup_username"
                                />
                                <label
                                    class="cus-lab-label"
                                    for="#signup_username"
                                    >Tên người dùng</label
                                >
                            </div>
                            <div class="cus-lab">
                                <input
                                    type="email"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signup_email"
                                    v-model.lazy="signup_email"
                                />
                                <label class="cus-lab-label" for="#signup_email"
                                    >Địa chỉ email</label
                                >
                            </div>
                            <div class="cus-lab">
                                <input
                                    type="password"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signup_password"
                                    v-model.lazy="signup_password"
                                    autocomplete="off"
                                />
                                <label
                                    class="cus-lab-label"
                                    for="#signup_password"
                                    >Mật khẩu</label
                                >
                            </div>
                            <div class="cus-lab">
                                <input
                                    type="password"
                                    class="cus-lab-input"
                                    placeholder=" "
                                    id="#signup_repassword"
                                    v-model.lazy="signup_repassword"
                                    autocomplete="off"
                                />
                                <label
                                    class="cus-lab-label"
                                    for="#signup_repassword"
                                >
                                    Nhập lại mật khẩu
                                </label>
                            </div>
                            <a-button
                                type="dash"
                                block
                                size="large"
                                class="space-mt-1"
                                >Tạo tài khoản</a-button
                            >
                        </form>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../../configs/axios';

export default {
    name: 'SignPage',
    data() {
        return {
            signin_username: '',
            signin_password: '',
            signup_username: '',
            signup_password: '',
            signup_email: '',
            signup_repassword: '',
            isError: false,
            isSign: false
        };
    },
    methods: {
        async signIn() {
            try {
                this.isSign = true;
                const username = this.signin_username;
                const password = this.signin_password;
                const result = await axios.post('api/auth/login', {
                    username,
                    password
                });
                const user = result.data;
                this.$cookies.set('token', user.token);
                this.$cookies.set('email', user.email);
                this.$cookies.set('username', user.username);
                this.$cookies.set('roles', user.roles);
                this.$cookies.set('type', user.type);
                this.$cookies.set('isLogin', true);
                this.$router.push({ name: 'HomePage' });
                this.isSign = false;
            } catch (error) {
                this.isSign = false;
                this.isError = true;
                setTimeout(() => {
                    this.isError = false;
                }, 3000);
            }
        }
    },
    created() {
        const isLogin = this.$cookies.get('isLogin', true);
        if (isLogin) {
            this.$router.push({ name: 'HomePage' });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/_mixin.scss';

.sign {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    overflow: hidden;

    &__icons {
        padding-top: 1rem;

        > a > svg {
            font-size: 1.5rem;
            margin: 0 3px;
        }
    }

    &__social {
        margin-top: 2rem;
        text-align: center;
        > span {
            font-size: 14px;
            color: rgb(156, 153, 153);
        }
    }

    &__options {
        display: flex;
        justify-content: space-between;

        & span {
            color: red;
        }

        & a {
            display: block;
            padding-top: 5px;
            text-decoration: none;
            font-size: 14px;
            color: rgb(47, 133, 204);
        }
    }

    &__image {
        width: 700px;
        height: calc(100vh - 3rem);
        border-radius: 5px 0px 0px 5px;
        overflow: hidden;
        transition: 0.3s ease-in-out;

        @include show-up(900px) {
            display: none;
        }

        & > img {
            width: 100%;
        }
    }

    &__form {
        width: calc(100% - 700px);
        margin: 0rem 1rem 0 1rem;
        transition: 0.3s ease-in-out;

        @include show-up(1200px) {
            width: calc(100% - 500px);
        }

        @include show-up(900px) {
            width: 100%;
            margin: 0;
        }

        &__title {
            font-size: 2rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        &--signin {
            margin-top: 2rem;
        }

        &--signup {
            margin-top: 2rem;
        }
    }
}

.cus-lab {
    position: relative;
    margin-bottom: 1rem;
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
