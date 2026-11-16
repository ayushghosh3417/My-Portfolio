(() => {
    const overlay = document.querySelector('[data-portfolio-preloader]');
    if (!overlay) return;

    const word = overlay.querySelector('[data-preloader-word]');
    const brand = overlay.querySelector('[data-preloader-brand]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const body = document.body;
    const previousOverflow = root.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    const currentBodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const pageElements = Array.from(body.children).filter(element => element !== overlay);
    const previousInertStates = pageElements.map(element => element.inert);
    const previousFocus = document.activeElement;
    let finished = false;

    const wait = duration => new Promise(resolve => window.setTimeout(resolve, duration));

    if (scrollbarWidth > 0) body.style.paddingRight = `${currentBodyPaddingRight + scrollbarWidth}px`;
    root.style.overflow = 'hidden';
    pageElements.forEach(element => { element.inert = true; });
    overlay.focus({ preventScroll: true });

    function finish() {
        if (finished) return;
        finished = true;
        pageElements.forEach((element, index) => {
            element.inert = previousInertStates[index];
        });
        root.style.overflow = previousOverflow;
        body.style.paddingRight = previousBodyPaddingRight;
        overlay.remove();
        if (previousFocus && previousFocus !== body && previousFocus.isConnected) {
            previousFocus.focus({ preventScroll: true });
        }
    }

    async function showBrand() {
        word.classList.remove('is-visible');
        await wait(300);
        brand.classList.add('is-visible');
        await wait(1450);
    }

    async function playIntro() {
        if (reducedMotion) {
            overlay.classList.remove('is-entering');
            brand.classList.add('is-visible');
            await wait(450);
            overlay.classList.add('is-exiting');
            await wait(190);
            finish();
            return;
        }

        await wait(700);
        overlay.classList.remove('is-entering');

        for (const text of ['DESIGN', 'DEVELOP', 'CREATE']) {
            word.textContent = text;
            word.classList.add('is-visible');
            await wait(900);
            word.classList.remove('is-visible');
            await wait(300);
        }

        await showBrand();
        overlay.classList.add('is-exiting');
        await wait(900);
        finish();
    }

    playIntro().catch(finish);
})();
