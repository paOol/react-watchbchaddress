import React from 'react';
import styled from 'styled-components';
import '@babel/polyfill';

let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
let BITBOX = new BITBOXSDK();

const EventSource = require('eventsource');

//let bchAddress = `1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74`;
let bchAddress = `bitcoincash:qrv8w60f40yjhqzfswyc39n78anxjhcx75ppt2df5c`;
//
//
class WatchAddress extends React.Component {
  state = {
    bchAddress: '',
    UTXOs: '',
    satoshis: '',
    visible: false,
    err: ''
  };

  getUTXOs = output => {
    // let output = [
    //   {
    //     i: 0,
    //     b0: { op: 118 },
    //     b1: { op: 169 },
    //     b2: 'kxno9vsBxx0F3OKZ1HnQEwOQOy8=',
    //     s2: '�\u0019���\u0001�\u001d\u0005���y�\u0013\u0003�;/',
    //     b3: { op: 136 },
    //     b4: { op: 172 },
    //     str:
    //       'OP_DUP OP_HASH160 9319e8f6fb01c71d05dce299d479d01303903b2f OP_EQUALVERIFY OP_CHECKSIG',
    //     e: {
    //       v: 22814382,
    //       i: 0,
    //       a: 'qzf3n68klvquw8g9mn3fn4re6qfs8ypm9uq89uvwpr'
    //     },
    //     h2: '9319e8f6fb01c71d05dce299d479d01303903b2f'
    //   },
    //   {
    //     i: 1,
    //     b0: { op: 118 },
    //     b1: { op: 169 },
    //     b2: '1R9qPZt03a7/oEu/KIeEkNtrqeQ=',
    //     s2: '�\u001fj=�tݮ��K�(����k��',
    //     b3: { op: 136 },
    //     b4: { op: 172 },
    //     str:
    //       'OP_DUP OP_HASH160 d51f6a3d9b74ddaeffa04bbf28878490db6ba9e4 OP_EQUALVERIFY OP_CHECKSIG',
    //     e: {
    //       v: 1051241,
    //       i: 1,
    //       a: 'qr23763and6dmthl5p9m72y8sjgdk6afusp2gqqmfw'
    //     },
    //     h2: 'd51f6a3d9b74ddaeffa04bbf28878490db6ba9e4'
    //   }
    // ];

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

  //positioning css

  // bchaddress sanitize
  sanitizeAddress = async string => {
    let valid, sanitized;
    try {
      valid = await BITBOX.Address.isMainnetAddress(string);
    } catch (e) {
      console.log('failed', e);
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

    console.log('string', string);
    console.log('valid', valid);
  };

  // display smart value

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.routes !== prevProps.routes) {
  reveal = async () => {
    return this.setState({
      satoshis: 600,
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
      console.log('state changed  ', this.state.UTXOs);
      let UTXOs = this.getUTXOs(this.state.UTXOs);
      this.toggle();
    }
  };

  componentDidMount = async () => {
    await this.sanitizeAddress(bchAddress);
    var query = { v: 3, q: { find: {} } };
    // var query = { v: 3, q: { find: { 'out.e.a': this.state.bchAddress } } };
    query = btoa(JSON.stringify(query));
    let bitsocket = new EventSource(`https://bitsocket.org/s/${query}`);

    bitsocket.onmessage = e => {
      let resp = JSON.parse(e.data);
      if (resp.data.length >= 1) {
        console.log('resp', resp);

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

  render() {
    return (
      <div>
        {this.state.err ? this.state.err : ''}
        <PopupDiv className={this.state.visible ? 'on' : 'off'}>
          <div>
            asdf
            {this.state.satoshis && (
              <div>
                {' '}
                {this.state.satoshis}
                &nbsp; satoshis deposited{' '}
              </div>
            )}
          </div>
        </PopupDiv>
        <button onClick={this.toggle}>click me</button>
      </div>
    );
  }
}
const PopupDiv = styled.div`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
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
  z-index: 1;
  left: 50%;
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
