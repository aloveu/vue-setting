export default {
    mounted: (el) => {
        el.addEventListener('keydown', () => {
            setRemoveEmoji();
        });

        el.addEventListener('input', () => {
            setRemoveEmoji();
        });

        function setRemoveEmoji() {
            const inputEl = el.querySelector('input');
            const value = inputEl.value;
            inputEl.value = value.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        }
    },
};
