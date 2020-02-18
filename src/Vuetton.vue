<template>
    <button :type="type" class="btn" :class="['btn-'+size, customClass, isLoading ? 'btn-loader': '', {'ripple': ripple}]"
            :disabled="isLoading || disabled"
            @click="callAction"
            v-on="$listeners"
            :style="backgroundColor"
            ref="button"
    >
        <span class="icon" v-if="$slots.default && !isLoading">
            <slot></slot>
        </span>
        <img class="loader" v-show="isLoading" :src="loaderImageUrl" />
        <span v-show="loaderText && isLoading">{{ loaderText }}</span>
        <span v-show="!isLoading">
            {{ text }}
        </span>
    </button>
</template>

<script>
export default {
    name: 'Vuetton',
    props: {
        action: {
            type: Function
        },
        async: {
            type: Boolean,
            default: false
        },
        color: {
            type: String
        },
        customClass: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loaderText: {
            type: String
        },
        loaderImage: {
            type: String
        },
        ripple: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            validator: (value) => {
                return ['xs', 'sm', 'md', 'lg'].indexOf(value) > -1 || !value;
            },
            default: 'md'
        },
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    data() {
        return {
            isLoading: false,
            actions: {}
        };
    },
    methods: {
        async callAction() {
            if (!this.action) {
                return false;
            }
            if (this.async) {
                let oldWidth = this.$refs.button.style.width;
                this.$refs.button.style.width = this.$refs.button.offsetWidth + 'px';
                this.isLoading = true;
                try {
                    await this.actions.click();
                    this.isLoading = false;
                } catch(e) {
                    this.isLoading = false;
                }
                if (this.$refs.button)
                    this.$refs.button.style.width = oldWidth;
            } else {
                this.action();
            }
        }
    },
    created() {
        this.$set(this.actions, 'click', () => {
            return new Promise(async (resolve, reject)=> {
                try {
                    await this.action();
                    resolve();
                } catch (err) {
                    return reject(err);
                }
            });
        });
    },
    computed: {
        backgroundColor() {
            if (this.color) {
                return {
                    'background-color': this.color
                };
            }
            return {};
        },
        loaderImageUrl() {
            if (this.loaderImage) {
                return require(this.loaderImage);
            }
            return require('./assets/loader.svg');
        }
    }
};
</script>

<style scoped>
    .btn {
        color: #000;
        padding: 12px 16px;
        border-radius: 4px;
        border: none;
        outline: 0 !important;
        min-width: 80px;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .btn.btn-loader {
        align-items: center;
        padding-top: 0;
        padding-bottom: 0;
    }
    .btn.btn-loader .loader {
        margin: auto 8px auto 0;
        height: 100%;
    }
    .btn .icon {
        margin-right: 8px;
    }
    .btn-xs {
        padding: 4px 8px;
        min-width: 72px;
        font-size: 12px;
        height: 24px;
    }
    .btn-xs .loader {
        width: 12px;
    }
    .btn-sm {
        padding: 8px 12px;
        font-size: 14px;
        height: 32px;
    }
    .btn-sm .loader {
        width: 16px;
    }
    .btn-md {
        font-size: 16px;
        min-width: 100px;
        padding: 8px 24px;
        height: 40px;
    }
    .btn-md .loader {
        width: 20px;
        height: 20px;
    }
    .btn-lg {
        font-size: 18px;
        min-width: 120px;
        padding: 16px 32px;
        height: 54px;
    }
    .btn-lg .loader {
        height: 100%;
        width: 27px;
    }
    .btn:disabled {
        cursor: not-allowed !important;
        opacity: 0.5;
    }
    .ripple {
        background-position: center;
        transition: background 0.8s;
    }
    .ripple:hover {
        background: white radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%) center/15000%;
    }
    .ripple:active {
        opacity: 0.7;
        background-size: 100%;
        transition: background 0s;
    }
</style>
