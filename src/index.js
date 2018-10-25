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
      visible: true
    });
  };
  hide = () => {
    return setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 4000);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.UTXOs !== this.state.UTXOs) {
      console.log('state changed  ', this.state.UTXOs);
      let UTXOs = this.getUTXOs(this.state.UTXOs);
      await this.reveal();
      await this.hide();
    }
  };

  componentDidMount = async () => {
    await this.sanitizeAddress(bchAddress);
    //var query = { v: 3, q: { find: {} } };
    var query = { v: 3, q: { find: { 'out.e.a': this.state.bchAddress } } };
    query = btoa(JSON.stringify(query));
    let bitsocket = new EventSource(`https://bitsocket.org/s/${query}`);

    bitsocket.onmessage = e => {
      let resp = JSON.parse(e.data);
      if (resp.data.length >= 1) {
        console.log('resp', resp);

        if (resp.type == 'mempool') {
          this.setState({ UTXOs: resp.data[0].out });
        }
        // type == block for confirmed txs
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
        <PopupDiv>
          <div className={this.state.visible ? 'on' : 'off'}>
            asdf
            {this.state.satoshis && (
              <div>
                {' '}
                {this.state.satoshis}
                satoshis: deposited{' '}
              </div>
            )}
          </div>
        </PopupDiv>
      </div>
    );
  }
}
const PopupDiv = styled.div`
  //position: absolute;
  z-index: 101;
  color: red;
  // top: 0;
  // left: 0;
  // right: 0;
  background: #fde073;
  // text-align: center;
  // line-height: 2.5;
  // overflow: hidden;
  // -webkit-box-shadow: 0 0 5px black;
  // -moz-box-shadow: 0 0 5px black;
  // box-shadow: 0 0 5px black;

  // -webkit-transform: translateY(-50px);
  // -webkit-animation: slideDown 2.5s 1s 1 ease forwards;
  // -moz-transform: translateY(-50px);
  // -moz-animation: slideDown 2.5s 1s 1 ease forwards;

  // @-webkit-keyframes slideDown {
  //   0%,
  //   100% {
  //     -webkit-transform: translateY(-50px);
  //   }
  //   10%,
  //   90% {
  //     -webkit-transform: translateY(0px);
  //   }
  // }
  // @-moz-keyframes slideDown {
  //   0%,
  //   100% {
  //     -moz-transform: translateY(-50px);
  //   }
  //   10%,
  //   90% {
  //     -moz-transform: translateY(0px);
  //   }
  // }
  .off {
    background: green;
  }
  .on {
    background: blue;
  }
`;
export default WatchAddress;
