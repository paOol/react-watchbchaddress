# react-watchbchaddress

## React component for watching transactions to a specified address

<!-- ![badgercashid](https://user-images.githubusercontent.com/5941389/47131161-0a7e4a00-d252-11e8-979c-3f10ac90a809.gif)
 -->

## Installation

grab from NPM

```
npm i react-watchbchaddress
```

## Usage

```
  import WatchAddress from 'react-watchbchaddress';

  <WatchAddress
    address="bitcoincash:qrv8w60f40yjhqzfswyc39n78anxjhcx75ppt2df5c"
    text="You have deposited"
  />
```

### Notes

It's possible to watch several addresses by passing in an array, but that is not the purpose of this component.

You can contribute if you'd like. Having more customizable props such as the position of the notification, styling, etc would make this component much more useful.