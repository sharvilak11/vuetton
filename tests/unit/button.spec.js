import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import Vuetton from '../../src/Vuetton';
import axios from 'axios';

describe('Vuetton.vue', () => {
  let wrapper;
  afterEach(() => {
    wrapper.destroy();
  });
  it('should render the button element with type button and medium sized when no prop is passed', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me'
      }
    });
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').attributes('type')).toBe('button');
    expect(wrapper.find('button').classes()).toContain('vtn-md');
  });

  it('should render the button element with passed text as prop', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me'
      }
    });
    expect(wrapper.find('button').text()).toBe('Click Me');
  });

  it('should render the button element with type submit when its type is explicitly set to submit', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        type: 'submit'
      }
    });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('should render the button with specific size when its size prop is passed', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        size: 'lg'
      }
    });
    expect(wrapper.find('button').classes()).toContain('vtn-lg');
    expect(wrapper.find('button').classes()).not.toContain('vtn-md');
  });

  it('should render the button with a background color when color prop is passed', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        color: '#e26e34'
      }
    });
    expect(wrapper.find('button').element.style.backgroundColor).toBe('rgb(226, 110, 52)');
  });

  it('should disable the button when disabled prop is true', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        disabled: true
      }
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  it('should add the custom class to button when custom-class prop is passed', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        customClass: 'bar'
      }
    });
    expect(wrapper.find('button').classes()).toContain('bar');
  });

  it('should render the slot for icon on left by default if align-icon prop is not passed', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me'
      },
      slots: {
        default: '<i class="material-icons">add</i>'
      }
    });
    Vue.nextTick();
    expect(wrapper.find('.icon-left > .icon > i').exists()).toBe(true);
    expect(wrapper.find('.icon-left > .icon > i').text()).toBe('add');
  });

  it('should render the slot for icon on the right when align-icon prop is set to right', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        alignIcon: 'right'
      },
      slots: {
        default: '<i class="material-icons">add</i>'
      }
    });
    Vue.nextTick();
    expect(wrapper.find('.icon-right > .icon > i').exists()).toBe(true);
    expect(wrapper.find('.icon-right > .icon > i').text()).toBe('add');
  });

  it('should show the ripple effect on clicking the button when ripple prop is set to true', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
      },
      attrs: {
        'ripple': ''
      }
    });
    Vue.nextTick();
    expect(wrapper.find('button').classes()).toContain('ripple');
  });

  it('should set the function to actions.click data variable when passed as action prop', () => {
    wrapper = shallowMount(Vuetton, {
      propsData: {
        text: 'Click Me',
        action: jest.fn()
      },
      attrs: {
        'ripple': ''
      }
    });
    Vue.nextTick();
    expect(wrapper.vm.$props.action).toBeTruthy();
    wrapper.find('button').trigger('click');
    Vue.nextTick();
    expect(wrapper.vm.$props.action).toHaveBeenCalled();
  });

  // TODO : tests for async, loaderText, loaderImage
});
