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
            var behavior = this;
        }
    };
})(jQuery, Drupal);
