<template>
    <button :type="type" class="vtn" :class="['vtn-'+size, customClass, isLoading ? 'vtn-loader': '', {'ripple': ripple}]"
            :disabled="isLoading || disabled"
            @click="callAction"
            v-on="$listeners"
            :style="backgroundColor"
            ref="button"
    >
        <span v-if="alignIcon == 'left'" class="icon-left">
            <span class="icon" v-if="$slots.default && !isLoading">
                <slot></slot>
            </span>
            <img class="loader" v-show="isLoading" :src="loaderImageUrl" />
            <span v-show="loaderText && isLoading">{{ loaderText }}</span>
        </span>
        <span v-show="!isLoading">
            {{ text }}
        </span>
        <span v-if="alignIcon == 'right'" class="icon-right">
            <span class="icon" v-if="$slots.default && !isLoading">
                <slot></slot>
            </span>
            <span v-show="loaderText && isLoading">{{ loaderText }}</span>
            <img class="loader" v-show="isLoading" :src="loaderImageUrl" />
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
        alignIcon: {
            type: String,
            default: 'left'
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
        stop: {
            type: Boolean,
            default: false
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
        async callAction(event) {
            if (this.stop) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
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
