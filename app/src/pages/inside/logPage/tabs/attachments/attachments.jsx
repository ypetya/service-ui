// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.css';
import styles from './attachments.scss';

const cx = classNames.bind(styles);

export default class Attachments extends React.Component {
  static propTypes = {
    attachmentService: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      mainAreaVisible: false,
    };
  }

  async componentWillMount() {
    const attachments = await this.props.attachmentService.fetchAttachments();
    this.setState({ attachments });
  }

  // onChange() {}

  // onClickItem() {}

  onClickThumb() {
    if (!this.state.mainAreaVisible) {
      this.setState({ mainAreaVisible: true });
    }
  }

  render() {
    return (
      <div className={cx({ logAttachments: true, hideMainArea: !this.state.mainAreaVisible })}>
        <Carousel
          width={'630px'}
          emulateTouch
          showStatus={false}
          showIndicators={false}
          showArrows
          // onChange={this.onChange}
          // onClickItem={this.onClickItem}
          onClickThumb={() => {
            this.onClickThumb();
          }}
        >
          {this.state.attachments.map((attachment) => (
            <div key={attachment.id}>
              <img src={attachment.src} alt={attachment.alt} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
