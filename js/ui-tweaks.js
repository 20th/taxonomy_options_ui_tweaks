/* This file is part of the taxonomy_options_ui_tweaks module for Drupal 7 */

;(function ($, Drupal, undefined) {
    "use strict";

    var TWEAKED_CLASS = 'taxonomy-options-ui-tweaked';


    function createPadderElement() {
        return $('<span class="ui-tweak-padder"></span>')
            .css({
                display: 'inline-block',
                width: '30px'
            });
    }


    function Widget() {
        this.init.apply(this, arguments);
    }
    Widget.prototype = {

        style: {
            'max-height': '350px',
            'overflow': 'auto'
        },

        supportedWidgetTypes: [
            '.form-type-checkboxes',
            '.form-type-radios'
        ],

        elem: null,
        formItems: [],
        summary: null,

        init: function (elem) {
            var selectors = this.supportedWidgetTypes.join(', '),
                targets = elem.find(selectors);

            this.elem = elem;
            this.formItems = targets.find('.form-item');
            this.summary = new WidgetSummary();

            targets.find('> div:not(label, .description)').css(this.style);

            this.placeSummary();
            this.insertPadders();
            this.attachEvents();
        },

        placeSummary: function () {
            this.elem.find('> .form-item > label').after(this.summary.view);
            this.summary.updateView();
        },

        insertPadders: function () {
            var this_ = this;
            this.formItems.each(function () {
                var $item = $(this),
                    $label = $item.find('label'),
                    labelHtml = $label.html();

                if (labelHtml != '') {
                    for (var i = 0; i < labelHtml.length; i++) {
                        if (labelHtml.substr(0, 1) == '-') {
                            $item.prepend(createPadderElement());
                            labelHtml = labelHtml.substr(1);
                        }
                        else {
                            break;
                        }
                    }
                    $label.html(labelHtml);
                }
            });
        },

        attachEvents: function () {
            var this_ = this;
            this.formItems.each(function () {
                var $item = $(this),
                    $input = $item.find('input'),
                    $label = $item.find('label');

                $input.change(function () {
                    if ($input.is(':checked')) {
                        this_.summary.add($label.text());
                    } else {
                        this_.summary.remove($label.text());
                    }
                });

                // Add initially cheched.
                if ($input.is(':checked')) {
                    this_.summary.add($label.text());
                }
            });
        }
    };
    Widget.isSupportedType = function (elem) {
        var selectors = Widget.prototype.supportedWidgetTypes.join(', ');
        return elem.find(selectors).length > 0;
    };


    function WidgetSummary() {
        this.init.apply(this, arguments);
    };
    WidgetSummary.prototype = {

        items: [],
        view: null,
        valuesContainer: null,

        init: function () {
            var summary = $('<div class="description ui-tweak-widget-summary"></div>'),
                label = $('<b>Выбрано: </b>'),
                values = $('<span class="values"></span>');

            summary.append(label);
            summary.append(values);

            this.items = [];
            this.view = summary;
            this.valuesContainer = values;
        },

        updateView: function () {
            if (this.items.length) {
                this.valuesContainer.text(this.items.join(', '));
            } else {
                this.valuesContainer.html('<i>- Нет -</i>');
            }
        },

        add: function (item) {
            for (var i in this.items) {
                if (this.items[i] == item) {
                    return true;
                }
            }
            this.items.push(item);
            this.items.sort();
            this.updateView();
            return true;
        },

        remove: function (item) {
            var filtered = [];
            for (var i in this.items) {
                if (this.items[i] != item) {
                    filtered.push(this.items[i]);
                }
            }
            this.items = filtered;
            this.items.sort();
            this.updateView();
            return true;
        }

    };


    Drupal.behaviors.taxonomyOptionsUiTweaks = {

        attach: function (context, settings) {
            var behavior = this,
                selectors = ['.form-field-type-taxonomy-term-reference',
                             '.field-type-taxonomy-term-reference'];

            $(selectors.join(', '), context).each(function () {
                var $this = $(this);

                if (!$this.hasClass(TWEAKED_CLASS)) {
                    $this.addClass(TWEAKED_CLASS);
                    if (Widget.isSupportedType($this)) {
                        new Widget($this);
                    }
                }
            });
        }

    };
})(jQuery, Drupal);
