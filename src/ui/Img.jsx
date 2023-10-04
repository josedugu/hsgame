import React from 'react';

class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: props.src,
    };
  }

  handleImageError = () => {
    this.setState({
      imageSrc: this.props.fallbackSrc,
    });
  };

  render() {
    return (
      <img
        width={this.props.width||200}
        src={this.state.imageSrc}
        onError={this.handleImageError}
        alt={this.props.alt}
      />
    );
  }
}

export default Img;
