import React from 'react';

import ChannelStore from './ChannelStore';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withChannel = ({
  EVENT_ID_INIT,
  EVENT_ID_DATA,
  EVENT_ID_BACK,
  initData,
  panel
}) => WrappedComponent =>
  (class extends React.Component {
    // eslint-disable-next-line react/sort-comp
    static displayName = `WithChannel(${getDisplayName(WrappedComponent)})`;

    state = {
      // eslint-disable-next-line react/prop-types
      data: initData || this.props.initData
    };

    store = new ChannelStore({
      EVENT_ID_INIT,
      EVENT_ID_DATA,
      EVENT_ID_BACK,
      // eslint-disable-next-line react/prop-types
      name: this.props.pointName,
      // eslint-disable-next-line react/prop-types
      initData: initData || this.props.initData,
      // eslint-disable-next-line react/prop-types
      isPanel: panel || this.props.panel
    });

    componentDidMount() {
      this.store.onData(this.onData);
      if (this.state.data) {
        this.store.onConnected(() => this.store.send(this.state.data));
      }
      this.store.connect();
    }

    componentWillUnmount() {
      this.store.disconnect();
    }

    onData = data => this.setState({ data });

    render() {
      // eslint-disable-next-line no-shadow,react/prop-types
      const { pointName, initData, active, ...props } = this.props;
      if (active === false) return null;
      return (
        <WrappedComponent
          data={this.state.data}
          sendData={this.store.send}
          store={this.store}
          {...props}
        />
      );
    }
  });

export default withChannel;
