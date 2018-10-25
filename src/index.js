import React from 'react';
import styled from 'styled-components';
import '@babel/polyfill';

let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
let BITBOX = new BITBOXSDK();

const EventSource = require('eventsource');

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
    console.log('in get utxos outputs', output);

    const result = output.find(x => x.e.a === this.state.bchAddress);

    console.log('results', result, typeof result);
    if (result && result.e) {
      let satoshis = result.e.v;
      this.setState({
        visible: true,
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

  reveal = async () => {
    return this.setState({
      visible: true
    });
  };
  hide = () => {
    return setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 3000);
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
    //var query = { v: 3, q: { find: {} } };
    var query = { v: 3, q: { find: { 'out.e.a': this.state.bchAddress } } };
    query = btoa(JSON.stringify(query));
    let bitsocket = new EventSource(`https://bitsocket.org/s/${query}`);

    bitsocket.onmessage = e => {
      let resp = JSON.parse(e.data);
      if (resp.data.length >= 1) {
        if (resp.type == 'mempool') {
          this.setState({ UTXOs: resp.data[0].out });
        }
        // resp.type == block for confirmed txs
      }
    };
  };

  componentWillUnmount() {
    bitsocket.close();
  }
  getValue = async satoshis => {
    let val;

    if (satoshis >= 1000000) {
      val = await BITBOX.BitcoinCash.toBitcoinCash(satoshis);
      console.log('in val', val, typeof val);
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
  <Msg className="features">
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
  padding: 1rem 0.3rem;
  position: fixed;
  z-index: 1111;
  top: 2rem;
  font-size: 1rem;

  &.on {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
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
