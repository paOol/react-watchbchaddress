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
    address="bch:asdf"
    callbackPath=""
  />
```

### Notes

It's possible to watch several addresses by passing in an array, but that is not the purpose of this component. It's use case is when a user of your app is signed in and deposits and you want to display the live event to them.
