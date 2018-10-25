import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EventSource = require('eventsource');
let bchAddress = `qrv8w60f40yjhqzfswyc39n78anxjhcx75ppt2df5c`;
//"out.e.a": bchAddress
class WatchAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bchAddress: '', UTXOs: '' };
  }

  getTransaction() {
    alert('asdf');
  }

  getUTXOs(output) {
    let outputs = [];
    console.log('in get utxos outputs', output);
    // resp.data[0].out;
    // console.log('satoshis', amount);
  }

  //positioning css

  // bchaddress sanitize

  // display smart value
  componentWillUpdate() {
    console.log('state changed  ', this.state.UTXOs);
  }
  componentDidMount() {
    var query = { v: 3, q: { find: {} } };
    query = btoa(JSON.stringify(query));
    let bitsocket = new EventSource(`https://bitsocket.org/s/${query}`);

    bitsocket.onmessage = e => {
      console.log('e', e);
      let resp = JSON.parse(e.data);
      console.log('resp', resp);
      if (resp.data.length >= 1) {
        this.setState({ UTXOs: resp.data[0].out });
      }
    };
  }

  componentWillUnmount() {
    bitsocket.close();
  }
  render() {
    return (
      <PopupDiv>
        <div onClick={this.getTransaction}>asdf</div>
      </PopupDiv>
    );
  }
}
const PopupDiv = styled.div`
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  right: 0;
  background: #fde073;
  text-align: center;
  line-height: 2.5;
  overflow: hidden;
  -webkit-box-shadow: 0 0 5px black;
  -moz-box-shadow: 0 0 5px black;
  box-shadow: 0 0 5px black;

  -webkit-transform: translateY(-50px);
  -webkit-animation: slideDown 2.5s 1s 1 ease forwards;
  -moz-transform: translateY(-50px);
  -moz-animation: slideDown 2.5s 1s 1 ease forwards;

  @-webkit-keyframes slideDown {
    0%,
    100% {
      -webkit-transform: translateY(-50px);
    }
    10%,
    90% {
      -webkit-transform: translateY(0px);
    }
  }
  @-moz-keyframes slideDown {
    0%,
    100% {
      -moz-transform: translateY(-50px);
    }
    10%,
    90% {
      -moz-transform: translateY(0px);
    }
  }
  &.isOpen {
  }
`;
export default WatchAddress;
