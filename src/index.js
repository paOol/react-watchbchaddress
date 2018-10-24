import React from 'react';

import styled from 'styled-components';

class WatchAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bchAddress: '' };
  }
  componentDidMount() {}

  render() {
    return (
      <PopupDiv>
        <div>asdf</div>
      </PopupDiv>
    );
  }
}
const PopupDiv = styled.div`
  display: fixed;

  }
`;
export default WatchAddress;
