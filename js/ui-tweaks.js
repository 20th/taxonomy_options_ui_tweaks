/* This file is part of the taxonomy_options_ui_tweaks module for Drupal 7 */

;(function ($, Drupal, undefined) {
    "use strict";

    var TWEAKED_CLASS = 'taxonomy-options-ui-tweaked';

    Drupal.behaviors.taxonomyOptionsUiTweaks = {
        attach: function (context, settings) {
            var behavior = this,
                selectors = [];

            $(selectors.join(', ')).each(function () {
                var $this = $(this);

                if (!$this.hasClass(TWEAKED_CLASS)) {
                    $this.addClass(TWEAKED_CLASS);
                    behavior.tweakWidget($this);
                }
            });
        },

        tweakWidget: function (elem) {
            var behavior = this,
                selectors = ['.form-type-checkboxes .form-item',
                             '.form-type-radio .form-item'];

            elem.find(selectors.join(', ')).each(function () {
                behavior.tweakFormItem($(this));
            });
        },

        tweakFormItem: function (elem) {
            var label = elem.find('label'),
                labelHtml = label.html();

            if (labelHtml == '') {
                return FALSE;
            }

            for (var i = 0; i < labelHtml.length; i++) {
                if (labelHtml.substr(0, 1) == '-') {
                    elem.prepend('<span class="ui-tweak-padder"></span>');
                    labelHtml = labelHtml.substr(1);
                }
                else {
                    break;
                }
            }

            elem.html(labelHtml);
            this.stylePadders(elem.find('.ui-tweak-padder'));
            return TRUE;
        },

        stylePadders: function (padders) {
            padders.css({ display: 'inline-block', width: '30px' });
        }
    };
})(jQuery, Drupal);
