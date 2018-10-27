# react-watchbchaddress

## React component for watching transactions to a specified address

![watchbchaddress](https://user-images.githubusercontent.com/5941389/47537254-86434c80-d879-11e8-9682-20365e3521ae.gif)

## Installation

grab from NPM

```
npm i react-watchbchaddress
```

## Usage

You can set the address to watch and the message. One case can be when a user deposits bch to their account on your web app.

```
  import WatchAddress from 'react-watchbchaddress';

  <WatchAddress
    address="bitcoincash:qrv8w60f40yjhqzfswyc39n78anxjhcx75ppt2df5c"
    text="You have deposited"
    callbackPath="api/test"
  />
```

the callback will POST the transaction object to the endpoint specified.
An example body would look like

```
[ {
    tx:
     {
      h: '1237cc09307fc8b4073942884c1f7047f23676497834c4846c25a14cd2fe986'
     },
    in: [ [Object] ],
    out: [ [Object], [Object] ],
    _id: '12d3b329223c3f002edcc881'
  }
]

```


The value will display as satoshis if the value is "low". Otherwise, it will display as BCH.

![satoshis](https://user-images.githubusercontent.com/5941389/47537241-70ce2280-d879-11e8-9400-27eae7f0cd45.gif)

### Development

```
git clone https://github.com/paOol/react-watchbchaddress
cd react-watchbchaddress
npm i
npm run start
```

then browse to http://localhost:3001

### Notes

It's possible to watch several addresses by passing in an array, but that is not the purpose of this component.

You can contribute if you'd like. Having more customizable props such as the position of the notification, styling, etc would make this component much more useful.
