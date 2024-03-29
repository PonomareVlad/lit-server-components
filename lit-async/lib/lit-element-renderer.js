/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {ElementRenderer} from './element-renderer.js';
import {ReactiveElement} from 'lit';
import {_$LE} from 'lit-element/private-ssr-support.js';
import {ariaMixinAttributes, HYDRATE_INTERNALS_ATTR_PREFIX,} from '@lit-labs/ssr-dom-shim';
import {renderValue} from './render-value.js';

const {attributeToProperty, changedProperties} = _$LE;

/**
 * ElementRenderer implementation for LitElements
 */
export class LitElementRenderer extends ElementRenderer {
    constructor(tagName) {
        super(tagName);
        this.element = new (customElements.get(this.tagName))();
        // Reflect internals AOM attributes back to the DOM prior to hydration to
        // ensure search bots can accurately parse element semantics prior to
        // hydration. This is called whenever an instance of ElementInternals is
        // created on an element to wire up the getters/setters for the ARIAMixin
        // properties.
        const internals = this.element.__internals;
        if (internals) {
            for (const [ariaProp, ariaAttribute] of Object.entries(ariaMixinAttributes)) {
                const value = internals[ariaProp];
                if (value && !this.element.hasAttribute(ariaAttribute)) {
                    this.element.setAttribute(ariaAttribute, value);
                    this.element.setAttribute(`${HYDRATE_INTERNALS_ATTR_PREFIX}${ariaAttribute}`, value);
                }
            }
        }
    }

    get shadowRootOptions() {
        return (this.element.constructor.shadowRootOptions ??
            super.shadowRootOptions);
    }

    static matchesClass(ctor) {
        // This property needs to remain unminified.
        return ctor['_$litElement$'];
    }

    connectedCallback() {
        // Call LitElement's `willUpdate` method.
        // Note, this method is required not to use DOM APIs.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element?.willUpdate(changedProperties(this.element));
        // Reflect properties to attributes by calling into ReactiveElement's
        // update, which _only_ reflects attributes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ReactiveElement.prototype.update.call(this.element);
    }

    attributeChangedCallback(name, _old, value) {
        attributeToProperty(this.element, name, value);
    }

    * renderShadow(renderInfo) {
        // Render styles.
        const styles = this.element.constructor
            .elementStyles;
        if (styles !== undefined && styles.length > 0) {
            yield '<style>';
            for (const style of styles) {
                yield style.cssText;
            }
            yield '</style>';
        }
        // Render template
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yield* renderValue(this.element.render(), renderInfo);
    }

    * renderLight(renderInfo) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = this.element?.renderLight();
        if (value) {
            yield* renderValue(value, renderInfo);
        } else {
            yield '';
        }
    }
}
