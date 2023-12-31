/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import droppable from 'components/GalleryItem/droppable';
import Badge from 'components/Badge/Badge';
import i18n from 'i18n';

class BackButton extends Component {
  render() {
    const { isDropping, badge, onClick } = this.props;
    const classList = [
      'btn',
      'btn-secondary',
      'btn--no-text',
      'font-icon-level-up',
      'btn--icon-large',
      'gallery__back',
    ];

    if (isDropping) {
      classList.push('z-depth-1');
      classList.push('gallery__back--droppable-hover');
    }

    const backBadge = badge
      ? (
        <Badge
          className="gallery__back-badge"
          status={badge.status}
          message={badge.message}
        />
      )
      : null;

    const button = (
      <button
        className={classList.join(' ')}
        title={i18n._t('AssetAdmin.BACK_DESCRIPTION', 'Navigate up a level')}
        onClick={onClick}
      >
        {backBadge}
      </button>
    );

    return button;
  }
}

BackButton.propTypes = {
  onClick: PropTypes.func,
  isDropping: PropTypes.bool,
  badge: PropTypes.shape(Badge.propTypes),
};

export { BackButton as Component };

export default droppable('GalleryItem')(BackButton);
