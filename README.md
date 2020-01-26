# Vuetton

Vuetton is a simple library which lets you configure your button in the most feasible way. It supports click events, asynchronous operations, icons, loaders, custom classes etc.

[https://www.npmjs.com/package/vuetton](https://www.npmjs.com/package/vuetton)

![](./src/assets/sample.gif)

## Installation via npm

```bash
npm install --save vuetton
```

## Options
Below are the options which can be used in order to customise the button as per your needs.

| Property | Type | Description |
|---------|--------|-------------|
|action | `Function` | This is a required property which accepts the reference of a function.|
|async | `Boolean` | When ```async``` is true, the button will be disabled while still showing the loading icon until promise wrapped around the action is resolved. 
|color | `String` | This property determines the ```background-color``` of button.|
|custom-class | `String` | This property assigns additional custom class to the button component.|
|disabled | `Boolean` | If this property is true, then the particular button will be disabled.| 
|loader-text|`String`| This property accepts text which will be loaded during an asynchronous call.|
|loader-image|`String`| This property accepts path of an image which will be loaded during an asynchronous call.|
|size|`String`| This property determines the size of a button; possible values taken are ```lg```,```md```, ```sm``` and ```xs```. If not provided, default size i.e medium is rendered.|
|text|`String`| This is a required property which defines a value.|  
|type|`String`| This property determines the usage of button; possible values used are ```submit```,```button``` ```reset```.|


## Usage

* Import the Vuetton component from node_modules.

```js
import Vuetton from 'vuetton';
```
* Use in your template
```vue
<Vuetton size="lg" type="button" text="lg" :action="fetchTasks">Fetch</Vuetton>
```

### Size variations

`lg` - Large
`md` - Medium (default)
`sm` - Small
`xs` - Extra small

### Customization via CSS

Any custom class can be attached to the button through `custom-class` prop

```vue
<Vuetton size="lg" type="button" text="lg" :action="fetchTasks" custom-class="bg--red text--white"Fetch></Vuetton>
```

### Asynchronous support

Component supports asynchronous methods during which button would remain disabled till the function completes its execution.

Keeping the prop `async="true"` will make sure button remains disabled during the function provided in onclick listener.

To add the text during async call, pass the prop `loader-text`.

To change the default loader image, pass the prop `loader-image` which must be an image path.

```vue
<Vuetton size="md" text="Fetch" :async="true" :action="fetchTasks" loader-text="Loading..."></Vuetton>
```

### Type

You can specify the type of button via type prop be it, `button`, `reset`, `submit`. `type="button"` will be the default behaviour if not provided.

* More Features are coming soon
* Documentation link is coming soon 
