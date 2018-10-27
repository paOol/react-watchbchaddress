import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '@babel/polyfill';

let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
let BITBOX = new BITBOXSDK();

const EventSource = require('eventsource');
var bitsocket;

class WatchAddress extends React.Component {
  state = {
    bchAddress: '',
    UTXOs: '',
    satoshis: '',
    amount: '',
    visible: false,
    err: ''
  };

  getUTXOs = async output => {
    const result = output.find(x => x.e.a === this.state.bchAddress);

    if (result && result.e) {
      let satoshis = result.e.v;

      this.setState({
        satoshis: satoshis
      });
    }
    return;
  };

  sanitizeAddress = async string => {
    let valid, sanitized;
    try {
      valid = await BITBOX.Address.isMainnetAddress(string);
    } catch (e) {
      this.setState({
        err: 'Not a valid Bitcoin Cash address.'
      });
    }

    if (valid) {
      sanitized = await BITBOX.Address.toCashAddress(string, false);
      this.setState({
        bchAddress: sanitized
      });
    }
  };

  reveal = () => {
    return this.setState({
      visible: true
    });
  };
  hide = () => {
    return setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 3500);
  };

  toggle = async () => {
    await this.reveal();
    await this.hide();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.UTXOs !== this.state.UTXOs) {
      let UTXOs = await this.getUTXOs(this.state.UTXOs);
      if (this.state.satoshis) {
        this.getValue(this.state.satoshis);
      }
      this.toggle();
    }
  };

  componentDidMount = async () => {
    await this.sanitizeAddress(this.props.address);
    let query = { v: 3, q: { find: { 'out.e.a': this.state.bchAddress } } };
    // let query = { v: 3, q: { find: {} } };
    query = btoa(JSON.stringify(query));
    bitsocket = new EventSource(`https://bitsocket.org/s/${query}`);

    bitsocket.onmessage = e => {
      let resp = JSON.parse(e.data);
      if (resp.data.length >= 1) {
        if (resp.type == 'mempool') {
          if (this.props.callbackPath) {
            this.callBack(this.props.callbackPath, resp.data);
          }
          this.setState({ UTXOs: resp.data[0].out });
        }
        // resp.type == block for confirmed txs
      }
    };
  };

  componentWillUnmount() {
    console.log('component will unmount');
    bitsocket.close();
  }

  getValue = async satoshis => {
    let val;
    if (satoshis >= 1000000) {
      val = await BITBOX.BitcoinCash.toBitcoinCash(satoshis);
      val = `${val} BCH`;
    } else {
      satoshis = satoshis.toLocaleString();
      val = `${satoshis} satoshis`;
    }

    this.setState({
      amount: val
    });
    // let price = await BITBOX.Price.current('usd');
    // console.log('price here', price);
  };

  callBack = (path, data) => {
    return axios
      .post(path, data)
      .then(x => {
        console.log('callback response', x);
      })
      .catch(e => {
        console.log('err', e);
        this.setState({
          visible: true,
          err: `Error with callback: ${e.response.status} ${
            e.response.statusText
          }`
        });

        bitsocket.close();
      });
  };

  render() {
    let { err, visible, satoshis, amount } = this.state;
    return (
      <div>
        {err ? err : ''}
        <PopupDiv className={visible ? 'on' : 'off'}>
          {amount && <Message amount={amount} text={this.props.text} />}
        </PopupDiv>
      </div>
    );
  }
}

const Message = props => (
  <Msg>
    <p>
      {props.text} <span>{props.amount}</span>
    </p>
  </Msg>
);

const Msg = styled.div`
  p {
    word-break: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }
  span {
    font-weight: 700;
  }
`;
const PopupDiv = styled.div`
  visibility: hidden;
  min-width: 250px;
  margin-left: 0;
  box-sizing: border-box;
  font-weight: 400;
  border-radius: 6px;
  -webkit-box-shadow: 2px 2px 10px 2px hsla(0, 0%, 60%, 0.2);
  box-shadow: 2px 2px 10px 2px hsla(0, 0%, 60%, 0.2);
  background-color: #fff;
  color: #808080;
  text-align: center;
  padding: 0.8rem 0.7rem;
  position: fixed;
  z-index: 1111;
  top: 2rem;
  font-size: 1rem;

  &.on {
    visibility: visible;
    -webkit-animation: fadein 0.4s, fadeout 0.5s 3s;
    animation: fadein 0.4s, fadeout 0.5s 3s;
  }

  @-webkit-keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 2rem;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 2rem;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      top: 2rem;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      top: 2rem;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }
`;
export default WatchAddress;
