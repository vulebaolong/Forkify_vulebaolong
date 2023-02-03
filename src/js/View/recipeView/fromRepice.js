import View from "../View.js"

class fromRepice extends View {
    overlayEl = document.querySelector(".overlay")
    addRecipeWindowEl = document.querySelector(".add-recipe-window ")
    btnAddRecipeEl = document.querySelector(".nav__btn--add-recipe")
    btnCloseModalEl = document.querySelector(".btn--close-modal")
    uploadlEl = document.querySelector(".upload")

    constructor() {
        super()
        this.addEventListWindow()
    }

    toggleWindow() {
        this.overlayEl.classList.toggle("hidden")
        this.addRecipeWindowEl.classList.toggle("hidden")
    }

    addEventListWindow() {
        ;[this.overlayEl, this.btnAddRecipeEl, this.btnCloseModalEl].forEach(
            (e) => {
                e.addEventListener("click", this.toggleWindow.bind(this))
            }
        )
    }

    addEventListUpLoad(handler) {
        this.uploadlEl.addEventListener("submit", function (e) {
            e.preventDefault()
            //lấy data đã nhập trong from và chuyển thành mảng
            const dataArr = [...new FormData(this)]
            //chuyển đổi array thành object
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }
}

export default new fromRepice()
