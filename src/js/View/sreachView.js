class SreachView {
    #parentEl = document.querySelector(".search")
    #inputEl = document.querySelector(".search__field")

    addEventSreach(handler) {
        this.#parentEl.addEventListener("submit", (e) => {
            e.preventDefault()
            handler()
        })
    }

    getValueinputEl() {
        return this.#inputEl.value
    }
}

export default new SreachView()
