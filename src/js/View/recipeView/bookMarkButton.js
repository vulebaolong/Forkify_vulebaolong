import View from "../View.js"
import icons from "url:../../../img/icons.svg" //pacel 2

class BookMarkButton extends View {
    _parentEl = ".btn--bookmark"

    addEventListen(handler) {
        this.getParentEl().addEventListener("click", (e) => {
            const btn = e.target.closest(".btn--bookmark")
            if (!btn) return
            handler(btn)
        })
    }

    _createHtml(recipe) {
        return `
        <svg class="">
              <use href="${icons}#icon-bookmark${
            recipe.bookmarked ? "-fill" : ""
        }"></use>
            </svg>
        `
    }
}

export default new BookMarkButton()
