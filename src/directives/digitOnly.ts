/**
 * digit directive
 * int는 그냥 v-digit-only 적용
 * 첫번째 숫자0 허용은 v-digit-only.allowFirstZero
 * 소수점허용은 v-digit-only.decimal
 */

let isDecimal = false;
let isAllowFirstZero = true;
let decimalCounter = 0;
const decimalSeparator = '.';
const navigationKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'];

export default {
    mounted: (el, binding) => {
        el.addEventListener('keydown', (event: KeyboardEvent) => {
            isDecimal = binding.modifiers.decimal;
            isAllowFirstZero = binding.modifiers.allowFirstZero;
            if (isDecimal) {
                const inputValue = el.value;
                const decimalInfo = inputValue.split(decimalSeparator);

                decimalCounter = decimalInfo.length - 1;

                if (inputValue.indexOf('.') > -1 && event.key === decimalSeparator) {
                    event.preventDefault();
                }
            }

            if (
                navigationKeys.indexOf(event.key) > -1 ||
                ('a' === event.key && true === event.ctrlKey) || // Allow: Ctrl+A
                ('c' === event.key && true === event.ctrlKey) || // Allow: Ctrl+C
                ('v' === event.key && true === event.ctrlKey) || // Allow: Ctrl+V
                ('x' === event.key && true === event.ctrlKey) || // Allow: Ctrl+X
                ('a' === event.key && true === event.metaKey) || // Allow: Cmd+A (Mac)
                ('c' === event.key && true === event.metaKey) || // Allow: Cmd+C (Mac)
                ('v' === event.key && true === event.metaKey) || // Allow: Cmd+V (Mac)
                ('x' === event.key && true === event.metaKey) || // Allow: Cmd+X (Mac)
                (isDecimal && event.key === decimalSeparator && decimalCounter < 1)
            ) {
                return;
            }

            // Ensure that it is a number and stop the keypress
            if (' ' === event.key || Number.isNaN(Number(event.key))) {
                event.preventDefault();
            }
        }); // end addEventListener

        el.addEventListener('input', () => {
            const value = el.value;

            if ('number' === typeof value || !value) {
                return value;
            }

            let result = '';
            if (isDecimal) {
                const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
                result = value.replace(regex, '');
            } else {
                result = value.replace(/[^0-9]/g, '');
            }

            if (isAllowFirstZero) {
                result = result.replace(/^[.]/g, '0.');
            } else {
                result = result.replace(/^(0([0-9]+))/g, '$2');
            }

            const maxLength = el.maxLength;
            if (maxLength && !Number.isNaN(maxLength) && 0 < maxLength) {
                result = result.substring(0, maxLength);
            }

            el.value = result;
        });
    },
};
