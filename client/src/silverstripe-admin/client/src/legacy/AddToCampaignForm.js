/* global window */
import i18n from 'i18n';
import jQuery from 'jquery';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadComponent } from 'lib/Injector';

const FormBuilderModal = loadComponent('FormBuilderModal');

jQuery.entwine('ss', ($) => {
  /**
   * Kick off an "add to campaign" dialog from the CMS actions.
   */
  $(
    '.cms-content-actions .add-to-campaign-action,' +
    '#add-to-campaign__action'
  ).entwine({
    onclick() {
      let dialog = $('#add-to-campaign__dialog-wrapper');

      if (!dialog.length) {
        dialog = $('<div id="add-to-campaign__dialog-wrapper" />');
        $('body').append(dialog);
      }

      dialog.open();

      return false;
    },
  });

  // This is required because the React version of e.preventDefault() doesn't work
  // this is to prevent PJAX request to occur when clicking a link the modal
  $('.add-to-campaign-modal .add-to-campaign-modal__nav-link').entwine({
    onclick: (e) => {
      e.preventDefault();
      const $link = $(e.target);
      window.location = $link.attr('href');
    },
  });

  /**
   * Uses reactstrap in order to replicate the bootstrap styling and JavaScript behaviour.
   * The "add to campaign" dialog is used in a similar fashion in AssetAdmin.
   */
  $('#add-to-campaign__dialog-wrapper').entwine({
    ReactRoot: null,

    onunmatch() {
      // solves errors given by ReactDOM "no matched root found" error.
      this._clearModal();
    },

    open() {
      this._renderModal(true);
    },

    close() {
      this._renderModal(false);
    },

    _renderModal(isOpen) {
      const handleHide = () => this.close();
      const handleSubmit = (...args) => this._handleSubmitModal(...args);
      const id = $('form.cms-edit-form :input[name=ID]').val();
      const sectionConfigKey = 'SilverStripe\\CMS\\Controllers\\CMSPageEditController';
      const store = window.ss.store;
      const sectionConfig = store.getState().config.sections
        .find((section) => section.name === sectionConfigKey);
      const modalSchemaUrl = `${sectionConfig.form.AddToCampaignForm.schemaUrl}/${id}`;
      const title = i18n._t('Admin.ADD_TO_CAMPAIGN', 'Add to campaign');

      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
      }
      root.render(
        <FormBuilderModal
          title={title}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          onClosed={handleHide}
          schemaUrl={modalSchemaUrl}
          bodyClassName="modal__dialog"
          className="add-to-campaign-modal"
          responseClassBad="modal__response modal__response--error"
          responseClassGood="modal__response modal__response--good"
          identifier="Admin.AddToCampaign"
        />
      );
      this.setReactRoot(root);
    },

    _clearModal() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
      // this.empty();
    },

    _handleSubmitModal(data, action, submitFn) {
      return submitFn();
    },

  });
});
